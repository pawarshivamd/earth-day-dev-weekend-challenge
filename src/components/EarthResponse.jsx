import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX, ArrowRight } from 'lucide-react'
import { useSpeech } from '../hooks/useSpeech'
import { AI_PROMPT, FALLBACK_REPLIES } from '../data/prompts'

export default function EarthResponse({ userMessage, onComplete }) {
  const [replyText, setReplyText] = useState('')
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const { speak, stop, isPlaying, isSupported } = useSpeech()
  const hasFetched = useRef(false)

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchGeminiResponse = async () => {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!apiKey) {
        console.warn("No Gemini API key found. Using fallback.");
        useFallback();
        return;
      }

      try {
        const promptText = AI_PROMPT.replace("{{message}}", userMessage);
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }]
          })
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error("Gemini API Error: " + JSON.stringify(errorData));
        }

        const data = await res.json();
        const generatedText = data.candidates[0].content.parts[0].text;
        
        setReplyText(generatedText);
        speak(generatedText);
      } catch (err) {
        console.warn("Falling back to pre-written response due to Gemini error:", err.message);
        useFallback();
      }
    };

    const useFallback = () => {
      const reply = FALLBACK_REPLIES[Math.floor(Math.random() * FALLBACK_REPLIES.length)];
      setReplyText(reply);
      speak(reply);
    };

    fetchGeminiResponse();
  }, [userMessage, speak]);

  // Typewriter effect
  useEffect(() => {
    if (!replyText) return

    let i = 0;
    setIsTyping(true)
    const interval = setInterval(() => {
      setDisplayedText(replyText.slice(0, i + 1))
      i++
      if (i >= replyText.length) {
        clearInterval(interval)
        setIsTyping(false)
      }
    }, 50) // Typing speed

    return () => clearInterval(interval)
  }, [replyText])

  const handleToggleSpeech = () => {
    if (isPlaying) {
      stop()
    } else {
      speak(replyText)
    }
  }

  // Cleanup speech on unmount
  useEffect(() => {
    return () => stop()
  }, [stop])

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-transparent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
      transition={{ duration: 2 }}
    >
      {/* Soft glowing environment */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-900/40 via-brand-dark to-brand-dark"
          animate={{ opacity: [0.6, 0.9, 0.6], scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-blue/20 to-transparent mix-blend-overlay" />
      </div>

      <div className="z-10 max-w-4xl w-full mx-auto flex flex-col items-center">
        <motion.div 
          className="min-h-[300px] w-full flex items-center justify-center text-center p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {!replyText ? (
            <div className="flex space-x-2">
              <motion.div className="w-3 h-3 bg-white/50 rounded-full" animate={{ y: [0, -10, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} />
              <motion.div className="w-3 h-3 bg-white/50 rounded-full" animate={{ y: [0, -10, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} />
              <motion.div className="w-3 h-3 bg-white/50 rounded-full" animate={{ y: [0, -10, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} />
            </div>
          ) : (
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-light leading-relaxed tracking-wide text-white/90 whitespace-pre-line drop-shadow-lg">
              {displayedText}
              {isTyping && <motion.span animate={{ opacity: [0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}>|</motion.span>}
            </h2>
          )}
        </motion.div>

        {replyText && (
          <motion.div 
            className="mt-16 flex flex-col sm:flex-row gap-6 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {isSupported && (
              <button 
                onClick={handleToggleSpeech}
                className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-sm group"
              >
                {isPlaying ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 group-hover:text-amber-200 transition-colors" />}
                <span className="text-sm tracking-widest uppercase">{isPlaying ? 'Stop' : 'Replay Voice'}</span>
              </button>
            )}

            <button 
              onClick={() => {
                stop(); 
                onComplete(replyText);
              }}
              className="flex items-center gap-3 px-8 py-3 rounded-full bg-white text-black hover:bg-gray-200 transition-colors group"
            >
              <span className="text-sm font-semibold tracking-widest uppercase">Continue</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
