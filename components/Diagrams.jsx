'use client'

import { useState } from 'react'

// Architecture diagrams for the two flagship projects. Every box and arrow comes from the project READMEs
// (and Sahithi's own notes on Redis); nothing here is invented. Text is plain SVG so it scales with the card.

function Node({ id, x, y, w, h, title, sub = [], hl, cls = '' }) {
  const total = 24 + sub.length * 15
  const top = y + (h - total) / 2
  return (
    <g className={`dg-n ${cls} ${hl.includes(id) ? 'on' : ''}`}>
      <rect x={x} y={y} width={w} height={h} rx="14" />
      <text className="dg-t" x={x + 14} y={top + 14}>{title}</text>
      {sub.map((s, i) => (
        <text key={i} className="dg-s" x={x + 14} y={top + 36 + i * 15}>{s}</text>
      ))}
    </g>
  )
}

function Edge({ d, dash }) {
  return <path d={d} className={`dg-e ${dash ? 'dash' : ''}`} markerEnd={dash ? undefined : 'url(#dg-arr)'} />
}

// a small packet that travels along path d during the slice [a,b] of a T-second loop
function Dot({ d, a, b, T }) {
  return (
    <circle r="4.5" className="dg-pk" opacity="0">
      <animateMotion dur={`${T}s`} repeatCount="indefinite" path={d} keyPoints="0;0;1;1" keyTimes={`0;${a};${b};1`} calcMode="linear" />
      <animate attributeName="opacity" dur={`${T}s`} repeatCount="indefinite" values="0;1;0" keyTimes={`0;${a};${b}`} calcMode="discrete" />
    </circle>
  )
}

function Defs() {
  return (
    <defs>
      <marker id="dg-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" className="dg-ah" />
      </marker>
    </defs>
  )
}

function Ledger({ hl }) {
  const T = 7
  const ret = 'M902,60 V32 H310 V120'
  return (
    <svg className={`dg ${hl.length ? 'hl' : ''}`} viewBox="0 0 1000 400" role="img"
      aria-label="Payment ledger architecture: REST API, PostgreSQL with outbox, outbox publisher, Kafka, ledger and notification consumers, and Redis on the side.">
      <Defs />

      {/* edges */}
      <Edge d="M170,185 H215" />
      <Edge d="M405,185 H445" />
      <Edge d="M595,185 H630" />
      <Edge d="M770,175 C795,175 795,110 815,110" />
      <Edge d="M770,195 C795,195 795,270 815,270" />
      <path d={ret} className="dg-e dash" markerEnd="url(#dg-arr)" />
      <text className="dg-l" x="330" y="24">debit, credit + 2 ledger entries, in one transaction</text>
      <Edge d="M95,230 V300" dash />
      <text className="dg-l" x="106" y="270">off the money path</text>

      {/* nodes */}
      <Node id="api" x={20} y={140} w={150} h={90} title="REST API" sub={['POST /payments', 'returns 202 Accepted']} hl={hl} />
      <Node id="pg" x={215} y={120} w={190} h={130} title="PostgreSQL" sub={['PENDING payment +', 'outbox row, written in', 'one local transaction']} hl={hl} />
      <Node id="pub" x={445} y={140} w={150} h={90} title="Outbox publisher" sub={['polls unpublished', 'rows']} hl={hl} />
      <Node id="kafka" x={630} y={140} w={140} h={90} title="Kafka" sub={['payments.submitted', 'keyed by account']} hl={hl} />
      <Node id="led" x={815} y={60} w={175} h={100} title="ledger-processor" sub={['locks both accounts', 'in order, debits and', 'credits, marks result']} hl={hl} />
      <Node id="notif" x={815} y={230} w={175} h={80} title="notification-service" sub={['reads completion', 'events independently']} hl={hl} />
      <Node id="redis" x={20} y={300} w={440} h={80} title="Redis" hl={hl}
        sub={['Idempotency keys: a retried request gets the same response (24h)', 'Balance cache: cache-aside, 30s TTL, cleared when a payment settles']} />
      <text className="dg-l" x="560" y="372">solid: the money path · dashed: supporting</text>

      {/* packets */}
      <Dot d="M170,185 H215" a={0.02} b={0.10} T={T} />
      <Dot d="M405,185 H445" a={0.10} b={0.22} T={T} />
      <Dot d="M595,185 H630" a={0.22} b={0.34} T={T} />
      <Dot d="M770,175 C795,175 795,110 815,110" a={0.34} b={0.46} T={T} />
      <Dot d="M770,195 C795,195 795,270 815,270" a={0.34} b={0.46} T={T} />
      <Dot d={ret} a={0.46} b={0.82} T={T} />
    </svg>
  )
}

function Agent({ hl }) {
  const T = 6
  const outs = ['M770,150 C800,150 800,48 830,48', 'M770,150 H830', 'M770,150 C800,150 800,252 830,252']
  return (
    <svg className={`dg ${hl.length ? 'hl' : ''}`} viewBox="0 0 1000 410" role="img"
      aria-label="AI agent architecture: a discovery agent drives a legacy UI and produces a draft capability artifact, a human approves it, and the replay engine runs it without an LLM and ends in a business outcome, a handled error, or human escalation.">
      <Defs />

      <Edge d="M185,150 H225" />
      <Edge d="M400,150 H445" />
      <Edge d="M585,150 H630" />
      {outs.map((d) => <Edge key={d} d={d} />)}
      <Edge d="M102,200 V310" dash />
      <text className="dg-l" x="114" y="262">explores</text>
      <Edge d="M700,200 V310" dash />
      <text className="dg-l" x="712" y="262">replays</text>

      <Node id="disc" x={20} y={100} w={165} h={100} title="Discovery agent" sub={['LLM + Playwright,', '~12s per run']} hl={hl} />
      <Node id="art" x={225} y={100} w={175} h={100} title="Capability artifact" sub={['Pydantic-validated,', 'status: draft']} hl={hl} />
      <Node id="rev" x={445} y={100} w={140} h={100} title="Human review" sub={['draft to approved', 'before production']} hl={hl} />
      <Node id="rep" x={630} y={100} w={140} h={100} title="Replay engine" sub={['0 LLM calls,', 'under 4s']} hl={hl} />
      <Node id="out" x={830} y={20} w={160} h={56} title="Business outcome" sub={['e.g. member not found']} hl={hl} cls="out" />
      <Node id="out" x={830} y={122} w={160} h={56} title="Recoverable error" sub={['handled by the taxonomy']} hl={hl} cls="out" />
      <Node id="out" x={830} y={224} w={160} h={56} title="Human escalation" sub={['operator resumes the run']} hl={hl} cls="out" />
      <Node id="ui" x={20} y={310} w={750} h={56} title="Legacy back-office UI" sub={['a real browser, driven through Playwright']} hl={hl} />
      <Node id="guard" x={830} y={292} w={160} h={48} title="Guardrails" sub={['allowlist, risk gating']} hl={hl} />
      <Node id="evid" x={830} y={350} w={160} h={48} title="Evidence logs" sub={['events, screenshots']} hl={hl} />

      <Dot d="M185,150 H225" a={0.02} b={0.14} T={T} />
      <Dot d="M400,150 H445" a={0.14} b={0.26} T={T} />
      <Dot d="M585,150 H630" a={0.26} b={0.38} T={T} />
      {outs.map((d) => <Dot key={d} d={d} a={0.38} b={0.54} T={T} />)}
    </svg>
  )
}

export default function Diagram({ kind, note, why }) {
  const [hl, setHl] = useState([])
  const D = kind === 'ledger' ? Ledger : Agent
  return (
    <div className="dgw">
      <p className="pf-note">{note}</p>
      <div className="dg-scroll">
        <D hl={hl} />
      </div>
      <p className="pf-note dg-why-h">Why it is built this way</p>
      <div className="why">
        {why.map((w, i) => (
          <div
            key={i}
            className="why-c"
            tabIndex={0}
            onMouseEnter={() => setHl(w.nodes)}
            onMouseLeave={() => setHl([])}
            onFocus={() => setHl(w.nodes)}
            onBlur={() => setHl([])}
          >
            <span className="why-n">{i + 1}</span>
            <strong>{w.t}</strong>
            <p>{w.d}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
