import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import DestinationsGrid from '../components/DestinationsGrid'
import ChatWidget from '../components/ChatWidget'
import Footer from '../components/Footer'
import PersonalityQuiz from '../components/PersonalityQuiz'

export default function Home() {
  return (
    <>
      <div id="top" />
      <Navbar />
      <main>
        <Hero />
        <section id="destinations" style={{
          padding: 'var(--space-24) var(--space-6)',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <DestinationsGrid />
        </section>
      </main>
      <section
  id="quiz"
  style={{
    padding: 'var(--space-24) var(--space-6)',
    maxWidth: '1200px',
    margin: '0 auto',
  }}
>
  <PersonalityQuiz />
</section>
      <ChatWidget />
      <Footer />
    </>
  )
}
