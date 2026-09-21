'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { hero, links } from '../lib/data'
import { store } from '../lib/store'

const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function Hero() {
  const root = useRef(null)
  const nav = useRef(null)
  const [seen, setSeen] = useState(false)
  const [menu, setMenu] = useState(false) // phone menu panel

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (!reduce) {
        gsap.from('.hero .reveal', { y: 44, opacity: 0, duration: 1.1, stagger: 0.12, ease: 'power3.out', delay: 0.15 })
        gsap.from(nav.current.querySelector('.navin'), { y: -30, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.3 })

        // hero copy drifts up and fades as the blob leaves for About
        gsap.to('.hero-copy', {
          y: -70, opacity: 0, ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: '70% top', scrub: true },
        })
        gsap.to('.scrollhint', {
          opacity: 0, ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: '+=180', scrub: true },
        })
      }
    }, root)

    const onMove = (e) => {
      store.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      store.mouse.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    const onOver = (e) => {
      if (e.target.closest?.('.lbl')) setSeen(true)
    }
    const onScroll = () => nav.current?.classList.toggle('pill', window.scrollY > 80)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerover', onOver)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    const onKey = (e) => e.key === 'Escape' && setMenu(false)
    const onDown = (e) => {
      if (!nav.current?.contains(e.target)) setMenu(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onDown)

    return () => {
      ctx.revert()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [])

  return (
    <>
      <nav className={`nav ${menu ? 'menu-open' : ''}`} ref={nav}>
        <div className="navin">
          <button className="brand" onClick={() => { setMenu(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>Sahithi Reddy</button>
          <button onClick={() => go('about')}>About</button>
          <button className="nx" onClick={() => go('experience')}>Experience</button>
          <button onClick={() => go('projects')}>Projects</button>
          <button className="nx" onClick={() => go('skills')}>Skills</button>
          <button className="nx" onClick={() => go('publications')}>Publications</button>
          <button onClick={() => go('contact')}>Connect</button>
          {/* phones only: one button that opens the full list of links */}
          <button className="navtoggle" aria-label="Menu" aria-expanded={menu} aria-controls="navpanel" onClick={() => setMenu((m) => !m)}>
            <i /><i />
          </button>
        </div>
        <div className="navpanel" id="navpanel" aria-hidden={!menu}>
          {[['about', 'About'], ['experience', 'Experience'], ['projects', 'Projects'], ['skills', 'Skills'], ['publications', 'Publications'], ['contact', 'Connect']].map(([id, label]) => (
            <button key={id} tabIndex={menu ? 0 : -1} onClick={() => { setMenu(false); go(id) }}>{label}</button>
          ))}
        </div>
      </nav>

      <section className="hero" id="home" ref={root}>
        <div className="hero-copy">
          <div className="status reveal"><i aria-hidden="true" />Available to start immediately, and open to relocating</div>
          <div className="tag reveal">{hero.tag}</div>
          <h1 className="reveal">Sahithi<br />Reddy</h1>
          <p className="reveal">{hero.body}</p>
          <div className="cta reveal">
            <button className="btn primary glow" onClick={() => go('experience')}><span>Explore my work</span></button>
            <a className="btn ghost glow" href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
          <div className="cta cta2 reveal">
            <a className="btn ghost glow" href="/Sahithi_Reddy_Resume.pdf" target="_blank" rel="noreferrer">Resume</a>
            <a className="btn primary glow" href={links.github} target="_blank" rel="noreferrer"><span>GitHub</span></a>
          </div>
        </div>
        <p className={`orbhint ${seen ? 'seen' : ''}`}>
          <i aria-hidden="true" />
          Hover the orbs to explore
        </p>
        <div className="scrollhint">Scroll</div>
      </section>
    </>
  )
}
