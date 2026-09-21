'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skillGroups } from '../lib/data'

export default function Skills() {
  const root = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from('.skills-head > *', {
        y: 40, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out', clearProps: 'transform,opacity',
        scrollTrigger: { trigger: '.skills-head', start: 'top 85%' },
      })
      gsap.utils.toArray('.sg').forEach((card) => {
        gsap.from(card, {
          y: 50, opacity: 0, duration: 0.9, ease: 'power3.out', clearProps: 'transform,opacity',
          scrollTrigger: { trigger: card, start: 'top 90%' },
        })
        gsap.from(card.querySelectorAll('.sg-chips span'), {
          scale: 0.6, opacity: 0, duration: 0.5, stagger: 0.04, ease: 'back.out(2)', clearProps: 'transform,opacity',
          scrollTrigger: { trigger: card, start: 'top 82%' },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="skills" id="skills" ref={root}>
      <div className="skills-grid">
        <div className="skills-left">
          <div className="skills-sticky">
            {/* empty on purpose: the page-wide blob (BlobStage) glides here from the Projects section */}
            <div className="skills-blob" />
          </div>
        </div>

        <div className="skills-right">
          <div className="skills-head">
            <p className="tag">Skills</p>
            <h2>The toolbox.</h2>
            <p className="sub">The technologies behind every system I&apos;ve shipped.</p>
          </div>

          <div className="sg-grid">
            {skillGroups.map((g, i) => (
              <article key={g.name} className={`sg glow ${i === 0 ? 'wide' : ''}`}>
                <div className="sg-top">
                  <h3>{g.name}</h3>
                </div>
                <div className="sg-chips">
                  {g.items.map((it) => (
                    <span key={it} className="glow">{it}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
