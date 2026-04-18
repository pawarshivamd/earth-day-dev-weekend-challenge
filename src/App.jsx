import { useState, useRef, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Intro from './components/Intro'
import Hero from './components/Hero'
import InputPanel from './components/InputPanel'
import EarthResponse from './components/EarthResponse'
import DecisionPanel from './components/DecisionPanel'
import FutureScene from './components/FutureScene'
import FinalMessage from './components/FinalMessage'
import audioAsset from './assets/samuelfjohanns-weird-drones-12540.mp3'
import videoAsset from './assets/19289-300877402.mp4'

function App() {
  const [currentSection, setCurrentSection] = useState('intro')
  const [userMessage, setUserMessage] = useState('')
  const [earthReply, setEarthReply] = useState('')
  const [decision, setDecision] = useState(null) // 'bad', 'mid', 'good'
  const audioRef = useRef(null)
  const videoRef = useRef(null)

  // Pause media when switching tabs
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (videoRef.current) videoRef.current.pause();
        if (audioRef.current) audioRef.current.pause();
      } else {
        if (videoRef.current) videoRef.current.play().catch(() => {});
        // Only resume audio if the experience had actively started
        if (audioRef.current && currentSection !== 'intro' && currentSection !== 'hero') {
          audioRef.current.play().catch(() => {});
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [currentSection]);

  const navigateTo = (section) => setCurrentSection(section)

  const handleStartExperience = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // subtle ambient volume
      audioRef.current.play().catch(e => console.log("Audio playback blocked", e));
    }
    navigateTo('input')
  }

  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setUserMessage('')
    setEarthReply('')
    setDecision(null)
    setCurrentSection('intro')
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white">
      {/* Global Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
        >
          <source src={videoAsset} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80" />
      </div>

      {/* Cinematic Background Music */}
      <audio ref={audioRef} src={audioAsset} loop />

      <div className="relative z-10 w-full h-full">
        <AnimatePresence mode="wait">
          {currentSection === 'intro' && (
            <Intro key="intro" onComplete={() => navigateTo('hero')} />
          )}
          {currentSection === 'hero' && (
            <Hero key="hero" onStart={handleStartExperience} />
          )}
          {currentSection === 'input' && (
            <InputPanel 
              key="input" 
              onSubmit={(msg) => {
                setUserMessage(msg)
                navigateTo('response')
              }} 
            />
          )}
          {currentSection === 'response' && (
            <EarthResponse 
              key="response" 
              userMessage={userMessage}
              onComplete={(reply) => {
                setEarthReply(reply)
                navigateTo('decision')
              }} 
            />
          )}
          {currentSection === 'decision' && (
            <DecisionPanel 
              key="decision" 
              earthReply={earthReply}
              onDecision={(choice) => {
                setDecision(choice)
                navigateTo('future')
              }} 
            />
          )}
          {currentSection === 'future' && (
            <FutureScene 
              key="future" 
              decision={decision}
              onNext={() => navigateTo('final')} 
            />
          )}
          {currentSection === 'final' && (
            <FinalMessage key="final" onRestart={handleRestart} />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
