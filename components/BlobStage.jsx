'use client'

/**
 * One persistent blob that travels down the whole page.
 *
 *   hero (right)  ->  about (left, smaller)  ->  experience pipeline (becomes the bead)
 *
 * A single fixed, full-screen canvas. Every frame we read the scroll position and the live
 * on-screen rectangles of three DOM anchors and place the blob between them:
 *   - hero position: fixed spot on the right of the first screen
 *   - #about .about-blob   (empty placeholder box, sticky on the left)
 *   - .bead                (the dot that rides the pipeline in Experience)
 * Because the anchors are read live, the blob stays glued to them whatever the layout does.
 */

import * as THREE from 'three'
import { Component, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { VERT, FRAG } from '../lib/shaders'
import { skills, projects } from '../lib/data'
import { store } from '../lib/store'

const BLOB_R = 1.5 // geometry radius in world units
const clamp01 = (v) => Math.min(1, Math.max(0, v))
const smooth = (t) => t * t * (3 - 2 * t)
const smoother = (t) => t * t * t * (t * (t * 6 - 15) + 10)
const lerp = (a, b, t) => a + (b - a) * t

function orbit(mesh, t) {
  const u = mesh.userData
  const a = u.a + t * u.sp
  const x = Math.cos(a) * u.r
  const z = Math.sin(a) * u.r
  mesh.position.set(x, Math.sin(a) * u.r * Math.sin(u.inc), z * Math.cos(u.inc))
}

const tmp = new THREE.Vector3()
function placeLabel(id, mesh, camera, size, vis) {
  const el = store.labels[id]
  if (!el || !mesh) return
  if (vis < 0.02) {
    el.style.display = 'none'
    return
  }
  el.style.display = 'block'
  mesh.getWorldPosition(tmp)
  tmp.project(camera)
  const x = (tmp.x * 0.5 + 0.5) * size.width
  const y = (-tmp.y * 0.5 + 0.5) * size.height
  el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -50%)`
  el.style.opacity = (Math.max(0.35, Math.min(1, 1.4 - tmp.z * 1.2)) * vis).toFixed(3)
}

function Scene() {
  const root = useRef() // moves + scales the whole blob
  const blob = useRef()
  const nodes = useRef() // skill nodes + project satellites (hero only)
  const skillRefs = useRef([])
  const projRefs = useRef([])
  const mouse = useRef({ x: 0, y: 0 })
  const dom = useRef({})

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: 0.16 },
      uSplit: { value: 0 },
      uPullAmt: { value: 0.35 },
      uPull: { value: new THREE.Vector3(0, 0, 3) },
    }),
    []
  )
  const chromeMat = useMemo(
    () => new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms }),
    [uniforms]
  )
  const solidMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        uniforms: {
          uTime: uniforms.uTime,
          uAmp: { value: 0 },
          uSplit: { value: 0 },
          uPullAmt: { value: 0 },
          uPull: uniforms.uPull,
        },
      }),
    [uniforms]
  )

  const lines = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const attr = new THREE.BufferAttribute(new Float32Array(skills.length * 4 * 3), 3)
    attr.setUsage(THREE.DynamicDrawUsage)
    geo.setAttribute('position', attr)
    const l = new THREE.LineSegments(
      geo,
      new THREE.LineBasicMaterial({ color: 0x46292b, transparent: true, opacity: 0.35 })
    )
    l.frustumCulled = false
    return l
  }, [])

  const skillData = useMemo(
    () =>
      skills.map((s, i) => ({
        a: (i / skills.length) * Math.PI * 2,
        inc: ((i % 3) - 1) * 0.55,
        r: 2.5 + (i % 2) * 0.25,
        sp: 0.25 + (i % 3) * 0.05,
      })),
    []
  )
  const projData = useMemo(
    () =>
      projects.map((p, i) => ({
        a: (i / projects.length) * Math.PI * 2 + 0.5,
        inc: (i - 1) * 0.35,
        r: 3.05,
        sp: 0.16,
      })),
    []
  )

  // tell the page the blob is live, so the plain CSS bead in Experience hides itself
  useEffect(() => {
    document.documentElement.classList.add('blob-live')
    return () => document.documentElement.classList.remove('blob-live')
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    uniforms.uTime.value = t
    const { camera, size, viewport } = state
    const W = size.width
    const H = size.height
    const narrow = W < 800
    const sy = window.scrollY

    // anchors (looked up lazily; they may mount after the canvas)
    const d = dom.current
    if (!d.about || !d.about.isConnected) d.about = document.getElementById('about')
    if (!d.anchor || !d.anchor.isConnected) d.anchor = document.querySelector('.about-blob')
    if (!d.rail || !d.rail.isConnected) d.rail = document.querySelector('.rail')
    if (!d.bead || !d.bead.isConnected) d.bead = document.querySelector('.bead')
    if (!d.proj || !d.proj.isConnected) d.proj = document.querySelector('.proj-blob')
    if (!d.projSec || !d.projSec.isConnected) d.projSec = document.getElementById('projects')

    // ---- 1. hero pose (fixed on screen)
    const heroX = narrow ? W * 0.5 : W * 0.74
    const heroY = narrow ? H * 0.76 : H * 0.5
    const heroR = narrow ? W * 0.3 : Math.min(W * 0.14, H * 0.26)

    let x = heroX
    let y = heroY
    let r = heroR
    let amp = 0.16
    let pull = 0.35
    let spin = 1
    let p1 = 0
    let p2 = 0
    let p3 = 0
    let sxk = 1
    let syk = 1

    if (d.about && d.anchor) {
      // live rects of the anchors
      const aboutRect = d.about.getBoundingClientRect()
      const aRect = d.anchor.getBoundingClientRect()
      const aboutTopDoc = aboutRect.top + sy
      const aboutBottomDoc = aboutRect.bottom + sy
      let ax = aRect.left + aRect.width / 2
      let ay = aRect.top + aRect.height / 2
      let aR = aRect.width * 0.33

      // bead (the dot on the Experience pipeline)
      let bead = null
      if (d.rail && d.bead) {
        const bRect = d.bead.getBoundingClientRect()
        bead = {
          x: bRect.left + bRect.width / 2,
          y: bRect.top + bRect.height / 2,
          r: bRect.width / 2,
          railTopDoc: d.rail.getBoundingClientRect().top + sy,
        }
      }

      // On phones the About anchor scrolls off the top of the screen, so instead of chasing it the blob
      // shrinks away and later re-forms as the bead. `f` is 1 while the anchor is visible, 0 once it has left.
      if (narrow) {
        const f = clamp01(aRect.bottom / (H * 0.3))
        if (bead) {
          ax = lerp(bead.x, ax, f)
          ay = lerp(bead.y, ay, f)
        }
        aR *= f
      }

      // ---- 2. hero -> about
      p1 = clamp01(sy / Math.max(1, aboutTopDoc - H * 0.12))
      const e1 = smoother(p1)
      x = lerp(heroX, ax, e1)
      y = lerp(heroY, ay, e1)
      r = lerp(heroR, aR, e1)
      amp = lerp(0.16, 0.2, e1)

      // ---- 3. about -> bead
      if (bead) {
        const s2a = aboutBottomDoc - H * 1.0
        const s2b = bead.railTopDoc - H * 0.55 // the moment the bead starts riding the line
        p2 = clamp01((sy - s2a) / Math.max(1, s2b - s2a))
        const e2 = smoother(p2)
        // shrink a little ahead of the travel so it never crowds the section title
        const eShrink = 1 - Math.pow(1 - p2, 2.2)
        x = lerp(x, bead.x, e2)
        y = lerp(y, bead.y, e2)
        r = lerp(r, bead.r, eShrink)
        amp = lerp(amp, 0.015, eShrink)
        pull = lerp(0.35, 0, eShrink)
        spin = 1 - eShrink

        // ---- 4. bead -> beside the Projects title -> small blob drifting down the right edge of the section
        if (d.projSec && d.rail) {
          const railBottomDoc = d.rail.getBoundingClientRect().bottom + sy
          const s3a = railBottomDoc - H * 0.55 // the bead has reached the end of the line
          const pr = d.projSec.getBoundingClientRect()
          const projTopDoc = pr.top + sy
          const projBottomDoc = pr.bottom + sy
          const s3b = projTopDoc + H * 0.05
          const e3 = smoother(clamp01((sy - s3a) / Math.max(1, s3b - s3a)))

          // the right-hand lane: a small blob that slides down as you read through the section
          const p4 = clamp01((sy - projTopDoc) / Math.max(1, projBottomDoc - H - projTopDoc))
          // a big blob drifting down the right edge, behind the project tiles (they sit above the canvas)
          const laneR = narrow ? 34 : Math.min(130, W * 0.1)
          const laneX = W - laneR * (narrow ? 0.9 : 1.0)
          const laneY = lerp(H * 0.28, H * 0.74, p4)

          // the title anchor (hidden on phones, where the blob goes straight to the lane)
          const ar = d.proj ? d.proj.getBoundingClientRect() : null
          const hasAnchor = ar && ar.width > 0
          let tx = laneX
          let ty = laneY
          let tr = laneR
          if (hasAnchor) {
            const ax2 = ar.left + ar.width / 2
            const ay2 = ar.top + ar.height / 2
            // as the title scrolls up, the blob lets go of it and joins the lane
            const e4 = smoother(clamp01((H * 0.55 - ay2) / (H * 0.35)))
            tx = lerp(ax2, laneX, e4)
            ty = lerp(ay2, laneY, e4)
            tr = lerp(ar.width * 0.42, laneR, e4)
            ty += Math.sin(t * 1.3) * 6 * e4
          } else {
            ty += Math.sin(t * 1.3) * 5
          }
          x = lerp(x, tx, e3)
          y = lerp(y, ty, e3)
          r = lerp(r, tr, e3)
          amp = lerp(amp, 0.16, e3)
          pull = lerp(pull, 0.25, e3)
          spin = lerp(spin, 1, e3)
        }

        // ---- 5. Skills: the blob glides from the right-hand lane over to the left column
        // ---- 6. Publications: and back across to the right column
        // (on phones those anchors are hidden, so the blob just stays in its small lane)
        if (!d.sk || !d.sk.isConnected) d.sk = document.querySelector('.skills-blob')
        if (!d.pb || !d.pb.isConnected) d.pb = document.querySelector('.pub-blob')
        if (!d.skSec || !d.skSec.isConnected) d.skSec = document.getElementById('skills')
        if (!d.pbSec || !d.pbSec.isConnected) d.pbSec = document.getElementById('publications')
        const glide = (anchor, sec, k = 0.36) => {
          if (!anchor || !sec) return
          const rc = anchor.getBoundingClientRect()
          if (rc.width <= 0) return
          const topDoc = sec.getBoundingClientRect().top + sy
          const e = smoother(clamp01((sy - (topDoc - H * 0.95)) / (H * 0.8)))
          x = lerp(x, rc.left + rc.width / 2, e)
          y = lerp(y, rc.top + rc.height / 2, e)
          r = lerp(r, rc.width * k, e)
        }
        glide(d.sk, d.skSec)
        glide(d.pb, d.pbSec, 0.38) // medium one on the right
        // ---- 7. Contact: big and centred, behind the headline
        if (!d.ct || !d.ct.isConnected) d.ct = document.querySelector('.contact-blob')
        if (!d.ctSec || !d.ctSec.isConnected) d.ctSec = document.getElementById('contact')
        glide(d.ct, d.ctSec, 0.5)
      }
    }

    // ---- apply pose (screen px -> world units at z = 0)
    const worldPerPx = viewport.height / H
    root.current.position.set((x - W / 2) * worldPerPx, -(y - H / 2) * worldPerPx, 0)
    const sc = Math.max(0.0001, (r * worldPerPx) / BLOB_R)
    root.current.scale.set(sc * sxk, sc * syk, sc)

    mouse.current.x = THREE.MathUtils.damp(mouse.current.x, store.mouse.x, 4, 0.016)
    mouse.current.y = THREE.MathUtils.damp(mouse.current.y, store.mouse.y, 4, 0.016)
    const m = mouse.current
    blob.current.rotation.y = t * 0.2 + m.x * 0.5 * spin + sy * 0.0015
    blob.current.rotation.x = m.y * 0.3 * spin
    uniforms.uAmp.value = amp
    uniforms.uPullAmt.value = pull
    uniforms.uPull.value.set(m.x * 1.8, m.y * 1.8, 1.4)

    // ---- satellites + skill nodes belong to the hero only: they fade and shrink away as the blob leaves
    const vis = 1 - smooth(clamp01(p1 * 2.2))
    nodes.current.visible = vis > 0.01
    nodes.current.scale.setScalar(Math.max(0.0001, vis))
    if (nodes.current.visible) {
      skillRefs.current.forEach((mesh) => mesh && orbit(mesh, t))
      projRefs.current.forEach((mesh) => mesh && orbit(mesh, t))
      const pos = lines.geometry.attributes.position
      let k = 0
      const sm = skillRefs.current
      sm.forEach((n, i) => {
        if (!n) return
        const nx = sm[(i + 1) % sm.length]
        pos.setXYZ(k++, 0, 0, 0)
        pos.setXYZ(k++, n.position.x, n.position.y, n.position.z)
        pos.setXYZ(k++, n.position.x, n.position.y, n.position.z)
        pos.setXYZ(k++, nx.position.x, nx.position.y, nx.position.z)
      })
      pos.needsUpdate = true
    }
    root.current.updateMatrixWorld(true)
    skills.forEach((s, i) => placeLabel(s.id, skillRefs.current[i], camera, size, narrow ? 0 : vis))
    projects.forEach((p, i) => placeLabel(p.id, projRefs.current[i], camera, size, narrow ? 0 : vis))
  })

  return (
    <group ref={root}>
      <mesh ref={blob} material={chromeMat}>
        <icosahedronGeometry args={[BLOB_R, 48]} />
      </mesh>
      <group ref={nodes}>
        <primitive object={lines} />
        {skills.map((s, i) => (
          <mesh
            key={s.id}
            ref={(el) => {
              if (el) {
                el.userData = skillData[i]
                skillRefs.current[i] = el
              }
            }}
            material={solidMat}
          >
            <icosahedronGeometry args={[0.09, 12]} />
          </mesh>
        ))}
        {projects.map((p, i) => (
          <mesh
            key={p.id}
            ref={(el) => {
              if (el) {
                el.userData = projData[i]
                projRefs.current[i] = el
              }
            }}
            material={solidMat}
          >
            <icosahedronGeometry args={[0.3, 24]} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

class Boundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

export default function BlobStage() {
  return (
    <Boundary>
      <div className="blob-stage" aria-hidden="true">
        <Canvas
          dpr={[1, 2]}
          camera={{ fov: 40, position: [0, 0, 8] }}
          gl={{ alpha: true, antialias: true }}
          onCreated={({ gl }) => {
            // if the browser drops the WebGL context (many hot reloads, GPU pressure), let it come back
            gl.domElement.addEventListener('webglcontextlost', (e) => e.preventDefault())
          }}
        >
          <Scene />
        </Canvas>
      </div>
      <div className="blob-labels" aria-hidden="true">
        {skills.map((s) => (
          <div key={s.id} className="lbl" ref={(el) => { store.labels[s.id] = el }}>
            {s.name}<div className="d">{s.detail}</div>
          </div>
        ))}
        {projects.map((p) => (
          <div key={p.id} className="lbl lbl-proj" ref={(el) => { store.labels[p.id] = el }}>
            {p.name}<div className="d">{p.detail}</div>
          </div>
        ))}
      </div>
    </Boundary>
  )
}
