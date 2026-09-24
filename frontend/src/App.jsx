import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import InnovationOffice from './components/InnovationOffice.jsx'
import ServiceRegistration from './components/ServiceRegistration.jsx'
import EGovServices from './components/EGovServices.jsx'
import StartupGuidance from './components/StartupGuidance.jsx'
import Chatbot from './components/Chatbot.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <InnovationOffice />
        <ServiceRegistration />
        <EGovServices />
        <StartupGuidance />
      </main>
      <Footer />
      <Chatbot />
    </>
  )
}
