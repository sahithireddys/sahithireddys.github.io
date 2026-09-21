'use client'

import { useEffect } from 'react'

/**
 * Page-wide hover behaviour for every element with the `glow` class:
 *  - a soft spotlight follows the cursor inside the block (CSS vars --mx / --my)
 *  - the block leans a few degrees toward the cursor (CSS vars --rx / --ry)
 * The visuals themselves (glow, lift) live in globals.css under "interactive glow".
 * Skipped on touch screens and when the visitor prefers reduced motion (tilt only).
 */
export default function Interactions() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let active = null

    const reset = (el) => {
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
    }

    const onMove = (e) => {
      const el = e.target instanceof Element ? e.target.closest('.glow') : null
      if (active && active !== el) reset(active)
      active = el
      if (!el) return
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      el.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`)
      el.style.setProperty('--my', `${(py * 100).toFixed(1)}%`)
      if (!reduce) {
        const amt = r.width > 500 ? 1.4 : r.width > 200 ? 3.5 : 6
        el.style.setProperty('--rx', `${((0.5 - py) * amt * 2).toFixed(2)}deg`)
        el.style.setProperty('--ry', `${((px - 0.5) * amt * 2).toFixed(2)}deg`)
      }
    }
    const onLeave = () => {
      if (active) reset(active)
      active = null
    }

    document.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      document.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return null
}
