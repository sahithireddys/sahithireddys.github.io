'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { work } from '../lib/data'
import Diagram from './Diagrams'

const fmt = (n, s) => {
  const v = Number(n.toFixed(s.decimals || 0))
  return (s.comma ? v.toLocaleString('en-US', { minimumFractionDigits: s.decimals || 0 }) : v.toFixed(s.decimals || 0))
}

function Stats({ items, count }) {
  return (
    <div className="ps">
      {items.map((s, i) => (
        <div key={i} className="ps-tile glow">
          <div className="ps-val">
            {s.to !== undefined ? (
              <>
                <span className="ps-count" data-i={i}>{count ? fmt(0, s) : fmt(s.to, s)}</span>
                <span className="ps-suf">{s.suffix}</span>
              </>
            ) : (
              s.text || s.value
            )}
          </div>
          <div className="ps-lab">{s.label}</div>
        </div>
      ))}
    </div>
  )
}

function Tags({ list }) {
  return (
    <div className="stack">
      {list.map((t) => (
        <span key={t} className="glow">{t}</span>
      ))}
    </div>
  )
}

function Flagship({ p, n }) {
  return (
    <article className="flag glow-soft">
      <div className="flag-top">
        <div className="flag-copy">
          <p className="flag-kind">{p.kind} · {p.when}</p>
          <h3>{p.name}</h3>
          <p className="flag-sum">{p.summary}</p>
          <ul>
            {p.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
          <Tags list={p.stack} />
          <a className="pd-link" href={p.link} target="_blank" rel="noreferrer">View on GitHub <i /></a>
        </div>
        <Stats items={p.stats} count={p.stats.some((s) => s.to !== undefined)} />
      </div>
      <Diagram kind={p.diagram} note={p.flowNote} why={p.why} />
    </article>
  )
}

export default function Projects() {
  const root = useRef(null)
  const [open, setOpen] = useState('')

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const ctx = gsap.context(() => {
      gsap.from('.proj-head > *', {
        y: 40, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out', clearProps: 'transform,opacity',
        scrollTrigger: { trigger: '.proj-head', start: 'top 85%' },
      })
      gsap.utils.toArray('.flag').forEach((el, k) => {
        gsap.from(el, {
          y: 60, opacity: 0, duration: 1, ease: 'power3.out', clearProps: 'transform,opacity',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
        gsap.from(el.querySelectorAll('.ps-tile'), {
          y: 30, scale: 0.94, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'back.out(1.5)', clearProps: 'transform,opacity',
          scrollTrigger: { trigger: el, start: 'top 75%' },
        })
        gsap.from(el.querySelectorAll('.dg-scroll, .why-c'), {
          y: 24, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out', clearProps: 'transform,opacity',
          scrollTrigger: { trigger: el.querySelector('.dgw'), start: 'top 92%' },
        })
        const spec = work.filter((w) => w.flagship)[k]
        el.querySelectorAll('.ps-count').forEach((c) => {
          const s = spec.stats[Number(c.dataset.i)]
          const o = { v: 0 }
          gsap.to(o, {
            v: s.to, duration: 1.8, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 75%', once: true },
            onUpdate: () => { c.textContent = fmt(o.v, s) },
          })
        })
      })
      gsap.from('.more-row', {
        x: -50, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', clearProps: 'transform,opacity',
        scrollTrigger: { trigger: '.more-list', start: 'top 88%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  // opening a row changes page height: keep ScrollTrigger measurements fresh while it animates
  useEffect(() => {
    let raf
    const end = performance.now() + 700
    const tick = () => {
      ScrollTrigger.refresh()
      if (performance.now() < end) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [open])

  const flagships = work.filter((w) => w.flagship)
  const rest = work.filter((w) => !w.flagship)

  return (
    <section className="proj" id="projects" ref={root}>
      <div className="proj-head">
        <p className="tag">Projects</p>
        <h2>Things I built to see how far they go.</h2>
        {/* empty on purpose: the page-wide blob (BlobStage) settles here, then drifts down the right edge */}
        <div className="proj-blob" />
      </div>

      <div className="flags">
        {flagships.map((p, i) => (
          <Flagship key={p.id} p={p} n={i + 1} />
        ))}
      </div>

      <div className="more-wrap">
        <p className="mini">More projects</p>
        <ul className="more-list">
          {rest.map((p) => {
            const isOpen = open === p.id
            return (
              <li key={p.id} className={`more-row glow ${isOpen ? 'open' : ''}`}>
                <button
                  className="more-top"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? '' : p.id)}
                >
                  <span className="mr-name">{p.name}</span>
                  <span className="mr-kind">{p.kind}</span>
                  <span className="chev" aria-hidden="true" />
                </button>
                <div className="more-body">
                  <div className="more-body-in">
                    <p className="mr-sum">{p.summary}</p>
                    <Stats items={p.stats} count={false} />
                    {p.bullets.length > 0 && (
                      <ul className="mr-list">
                        {p.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    )}
                    <Tags list={p.stack} />
                    <a className="pd-link" href={p.link} target="_blank" rel="noreferrer">View on GitHub <i /></a>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
