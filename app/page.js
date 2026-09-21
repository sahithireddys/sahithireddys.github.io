import BlobStageClient from '../components/BlobStageClient'
import Hero from '../components/Hero'
import About from '../components/About'
import Experience from '../components/Experience'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import Publications from '../components/Publications'
import Contact from '../components/Contact'
import Interactions from '../components/Interactions'

export default function Home() {
  return (
    <main>
      <BlobStageClient />
      <Interactions />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Publications />
      <Contact />
    </main>
  )
}
