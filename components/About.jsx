'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { about } from '../lib/data'

const fmt = (n, comma) => (comma ? Math.round(n).toLocaleString('en-US') : String(Math.round(n)))

export default function About() {
  const root = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduce) return

      // reveal blocks
      gsap.utils.toArray('.about .rv').forEach((el) => {
        gsap.from(el, {
          y: 36, opacity: 0, duration: 0.9, ease: 'power3.out', clearProps: 'transform,opacity',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })

      // counters
      gsap.utils.toArray('.about .count').forEach((el) => {
        const to = Number(el.dataset.to)
        const comma = el.dataset.comma === '1'
        const o = { v: 0 }
        gsap.to(o, {
          v: to, duration: 1.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          onUpdate: () => { el.textContent = fmt(o.v, comma) },
        })
      })

      // staggered entrances for the interactive blocks (clearProps hands the transform back to the hover effects)
      gsap.from('.counter', {
        y: 40, scale: 0.92, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'back.out(1.4)', clearProps: 'transform,opacity',
        scrollTrigger: { trigger: '.counters', start: 'top 88%' },
      })
      gsap.from('.strengths li', {
        scale: 0.6, opacity: 0, duration: 0.6, stagger: 0.07, ease: 'back.out(2)', clearProps: 'transform,opacity',
        scrollTrigger: { trigger: '.strengths', start: 'top 90%' },
      })
      gsap.from('.edu-item', {
        x: 60, opacity: 0, duration: 0.9, stagger: 0.18, ease: 'power3.out', clearProps: 'transform,opacity',
        scrollTrigger: { trigger: '.edu', start: 'top 85%' },
      })
      gsap.from('.edu-dot', {
        scale: 0, duration: 0.6, stagger: 0.18, ease: 'back.out(3)', clearProps: 'transform',
        scrollTrigger: { trigger: '.edu', start: 'top 85%' },
      })

      // education log: line draws down, entries pop in
      gsap.from('.edu-line', {
        scaleY: 0, transformOrigin: 'top', ease: 'none',
        scrollTrigger: { trigger: '.edu', start: 'top 80%', end: 'bottom 70%', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const words = about.statement.split(' ')

  return (
    <section className="about" id="about" ref={root}>
      <div className="about-grid">
        <div className="about-left">
          <div className="about-sticky">
            {/* empty on purpose: the single page-wide blob (BlobStage) lands here */}
            <div className="about-blob" />
          </div>
        </div>

        <div className="about-right">
          <p className="tag rv">About</p>

          <h2 className="about-statement">
            {words.map((w, i) => (
              <span key={i} className="w">{w}{' '}</span>
            ))}
          </h2>

          <div className="about-copy">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="rv">{p}</p>
            ))}
          </div>

          <div className="counters rv">
            {about.counters.map((c) => (
              <div key={c.label} className="counter glow">
                <div className="num">
                  <span className="count" data-to={c.to} data-comma={c.comma ? 1 : 0}>0</span>
                  <span className="suf">{c.suffix}</span>
                </div>
                <div className="lab">{c.label}</div>
              </div>
            ))}
          </div>

          <div className="strengths rv">
            <p className="mini">What I am good at</p>
            <ul>
              {about.strengths.map((s) => (
                <li key={s} className="glow">{s}</li>
              ))}
            </ul>
          </div>

          <div className="edu rv">
            <p className="mini">Education</p>
            <div className="edu-track">
              <span className="edu-line" />
              {about.education.map((e) => (
                <article
                  key={e.school}
                  className="edu-item glow"
                  tabIndex={0}
                  aria-label={`${e.degree}, ${e.school}. Press to show coursework`}
                  onClick={(ev) => ev.currentTarget.classList.toggle('open')}
                  onKeyDown={(ev) => {
                    if (ev.key === 'Enter' || ev.key === ' ') {
                      ev.preventDefault()
                      ev.currentTarget.classList.toggle('open')
                    }
                  }}
                >
                  <span className="edu-dot" />
                  <div className="edu-head">
                    <h3>{e.degree}</h3>
                    <span className="gpa">GPA {e.gpa}</span>
                  </div>
                  <p className="school">{e.school}</p>
                  <p className="dates">{e.dates}</p>
                  <span className="edu-more" aria-hidden="true">Coursework<i /></span>
                  <div className="courses-wrap">
                    <p className="courses">
                      <b>Coursework:</b> {e.courses.split(' TA: ')[0]}
                      {e.courses.includes(' TA: ') && <><br /><b>TA:</b> {e.courses.split(' TA: ')[1]}</>}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="where rv glow">
            <span className="where-pin" aria-hidden="true" />
            <div>
              <p className="where-place">{about.location.place}</p>
              <p className="where-open"><i className="pulse" aria-hidden="true" />{about.location.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
