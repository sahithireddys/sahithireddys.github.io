'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experience } from '../lib/data'

export default function Experience() {
  const root = useRef(null)
  const [open, setOpen] = useState(experience.map((j) => j.id))

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      const fill = root.current.querySelector('.rail-fill')
      const bead = root.current.querySelector('.bead')
      const rail = root.current.querySelector('.rail')

      // the line fills and the chrome bead rides it as you scroll
      ScrollTrigger.create({
        trigger: rail,
        start: 'top 55%',
        end: 'bottom 55%',
        scrub: true,
        onUpdate: (self) => {
          fill.style.transform = `scaleY(${self.progress})`
          bead.style.top = `${self.progress * 100}%`
        },
      })

      const nodes = gsap.utils.toArray('.node')
      nodes.forEach((node, i) => {
        // node lights up as the bead reaches it
        ScrollTrigger.create({
          trigger: node,
          start: 'top 58%',
          onEnter: () => node.classList.add('lit'),
          onLeaveBack: () => node.classList.remove('lit'),
        })
        if (!reduce) {
          gsap.from(node.querySelector('.card'), {
            y: 50, opacity: 0, duration: 0.9, ease: 'power3.out', clearProps: 'transform,opacity',
            scrollTrigger: { trigger: node, start: 'top 85%' },
          })
        }
        // big metric counts up once
        const m = node.querySelector('.metric-val')
        if (m && !reduce) {
          const raw = m.dataset.value // e.g. "~99%"
          const prefix = raw.startsWith('~') ? '~' : ''
          const num = parseFloat(raw.replace(/[^0-9.]/g, ''))
          const suffix = raw.replace(/[0-9.~]/g, '')
          const o = { v: 0 }
          gsap.to(o, {
            v: num, duration: 1.4, ease: 'power2.out',
            scrollTrigger: { trigger: node, start: 'top 80%', once: true },
            onUpdate: () => { m.textContent = prefix + Math.round(o.v) + suffix },
          })
        }
      })

      gsap.from('.exp-head > *', {
        y: 40, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.exp-head', start: 'top 85%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  // opening or closing a card changes page height, so ScrollTrigger must re-measure
  useEffect(() => {
    // keep the pipeline, bead and blob glued to the layout while the card animates open or closed
    let raf
    const end = performance.now() + 700
    const tick = () => {
      ScrollTrigger.refresh()
      if (performance.now() < end) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [open])

  return (
    <section className="exp" id="experience" ref={root}>
      <div className="exp-head">
        <p className="tag">Experience</p>
        <h2>The pipeline so far.</h2>
        <p className="sub">Where the work went live.</p>
      </div>

      <div className="rail">
        <div className="rail-line" />
        <div className="rail-fill" />
        {/* the page-wide blob (BlobStage) becomes this dot; this element is its landing spot */}
        <div className="bead" aria-hidden="true" />

        {experience.map((job, i) => {
          const isOpen = open.includes(job.id)
          return (
            <div key={job.id} className={`node ${i % 2 ? 'r' : 'l'}`}>
              <span className="node-dot" aria-hidden="true" />
              <article className={`card glow ${isOpen ? 'open' : ''}`}>
                <button
                  className="card-top"
                  aria-expanded={isOpen}
                  onClick={() => setOpen((o) => (o.includes(job.id) ? o.filter((x) => x !== job.id) : [...o, job.id]))}
                >
                  <div className="who">
                    <p className="dates">{job.dates}<br />{job.place}</p>
                    <h3>{job.company}</h3>
                    <p className="role">{job.role}</p>
                  </div>
                  <div className="metric">
                    <div className="metric-val" data-value={job.metric.value}>{job.metric.value}</div>
                    <div className="metric-lab">{job.metric.label}</div>
                  </div>
                  <span className="chev" aria-hidden="true" />
                </button>

                <p className="summary">{job.summary}</p>

                <div className="more">
                  <div className="more-in">
                    <ul>
                      {job.bullets.map((b, k) => (
                        <li key={k} style={{ '--i': k }}>{b}</li>
                      ))}
                    </ul>
                    <div className="stack">
                      {job.stack.map((s) => (
                        <span key={s} className="glow">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </div>
          )
        })}
      </div>
    </section>
  )
}
