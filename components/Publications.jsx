'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { papers } from '../lib/data'

export default function Publications() {
  const root = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from('.pub-head > *', {
        y: 40, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out', clearProps: 'transform,opacity',
        scrollTrigger: { trigger: '.pub-head', start: 'top 85%' },
      })
      gsap.utils.toArray('.paper').forEach((el) => {
        gsap.from(el, {
          x: -60, opacity: 0, duration: 0.9, ease: 'power3.out', clearProps: 'transform,opacity',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="pub" id="publications" ref={root}>
      <div className="pub-grid">
        <div className="pub-main">
          <div className="pub-head">
            <p className="tag">Publications</p>
            <h2>Published work.</h2>
          </div>

          <div className="pub-list">
            {papers.map((p, i) => (
              <article key={i} className="paper glow">
                <p className="paper-meta">{p.kind} · {p.venue} · {p.year}</p>
                <h3>{p.title}</h3>
                <p className="paper-abs">{p.abstract}</p>
                <a className="pd-link" href={p.link} target="_blank" rel="noreferrer">{p.linkLabel} <i /></a>
              </article>
            ))}
          </div>
        </div>

        <div className="pub-right">
          <div className="pub-sticky">
            {/* empty on purpose: the page-wide blob (BlobStage) glides here from the Skills section */}
            <div className="pub-blob" />
          </div>
        </div>
      </div>
    </section>
  )
}
