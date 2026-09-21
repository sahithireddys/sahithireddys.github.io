'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { contact } from '../lib/data'

// Messages go to Sahithi's inbox through Formspree (the endpoint is public by design). If the endpoint is ever
// emptied, the form falls back to opening the visitor's email app. NEXT_PUBLIC_FORM_ENDPOINT overrides it at build time.
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || 'https://formspree.io/f/xqeynryv'

export default function Contact() {
  const root = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | sent | mailto | error

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from('.contact-top > :not(.contact-blob)', {
        y: 50, opacity: 0, duration: 1, stagger: 0.14, ease: 'power3.out', clearProps: 'transform,opacity',
        scrollTrigger: { trigger: '.contact-top', start: 'top 70%' },
      })
      gsap.from('.cf', {
        y: 60, opacity: 0, duration: 1, ease: 'power3.out', clearProps: 'transform,opacity',
        scrollTrigger: { trigger: '.contact-grid', start: 'top 88%' },
      })
      gsap.from('.cl a', {
        y: 24, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', clearProps: 'transform,opacity',
        scrollTrigger: { trigger: '.cl', start: 'top 95%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  async function onSubmit(e) {
    e.preventDefault()
    const f = e.currentTarget
    const name = f.elements.name.value.trim()
    const email = f.elements.email.value.trim()
    const message = f.elements.message.value.trim()
    if (!name || !email || !message) return

    if (ENDPOINT) {
      setStatus('sending')
      try {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ name, email, message }),
        })
        if (!res.ok) throw new Error('bad response')
        setStatus('sent')
        f.reset()
      } catch {
        setStatus('error')
      }
    } else {
      const subject = encodeURIComponent(`Portfolio message from ${name}`)
      const body = encodeURIComponent(`${message}\n\n${name}\n${email}`)
      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`
      setStatus('mailto')
    }
  }

  return (
    <section className="contact" id="contact" ref={root}>
      <div className="contact-top">
        {/* empty on purpose: the page-wide blob (BlobStage) settles here, big, behind the headline */}
        <div className="contact-blob" />
        <p className="tag">Connect</p>
        <h2>Let&apos;s build something that lasts.</h2>
        <p className="sub">{contact.place}</p>
      </div>

      <div className="contact-grid">
        <form className="cf" onSubmit={onSubmit}>
          <label>
            <span>Name</span>
            <input name="name" type="text" autoComplete="name" required placeholder="Your name" />
          </label>
          <label>
            <span>Email</span>
            <input name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
          </label>
          <label>
            <span>Message</span>
            <textarea name="message" rows={2} required placeholder="What would you like to talk about?" />
          </label>
          <div className="cf-foot">
            <button className="cf-send" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send message'} <i />
            </button>
            <p className={`cf-note ${status}`} role="status">
              {status === 'sent' && "Thanks, I'm excited to read this. I'll get back to you soon."}
              {status === 'mailto' && 'Opening your email app with the message filled in.'}
              {status === 'error' && `Something went wrong. Please email ${contact.email} directly.`}
            </p>
          </div>
        </form>
      </div>

      <div className="cl">
        <a href={`mailto:${contact.email}`}><b>Email</b><em>{contact.email} ↗</em></a>
        <a href={contact.linkedin} target="_blank" rel="noreferrer"><b>LinkedIn</b><em>Connect ↗</em></a>
        <a href={contact.github} target="_blank" rel="noreferrer"><b>GitHub</b><em>View source ↗</em></a>
      </div>

      <p className="foot">© 2026 Sahithi Reddy Senagapally</p>
    </section>
  )
}
