import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Dices } from 'lucide-react'
import { SUGGESTIONS } from '../data/prompts'

export default function InputPanel({ onSubmit }) {
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!message.trim()) return
    
    setIsSubmitting(true)
    // Small delay for cinematic effect
    setTimeout(() => {
      onSubmit(message)
    }, 1500)
  }

  const handleSuggest = () => {
    const prompt = SUGGESTIONS[Math.floor(Math.random() * SUGGESTIONS.length)]
    setMessage(prompt)
  }

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center p-6 bg-transparent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 1.5 } }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none"></div>

      <motion.form 
        onSubmit={handleSubmit}
        className="w-full max-w-2xl z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
      >
        <div className="glass-panel p-8 relative overflow-hidden transition-all duration-700">
          {isSubmitting && (
            <motion.div 
              className="absolute inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4" />
                <p className="text-sm font-light tracking-widest text-blue-200">TRANSMITTING...</p>
              </div>
            </motion.div>
          )}

          <div className="flex justify-between items-center mb-6">
            <label htmlFor="message" className="text-2xl font-light text-white/90 tracking-wide">
              Speak to the Earth
            </label>
            <button
              type="button"
              onClick={handleSuggest}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-all text-sm font-light text-white/80 group"
              title="Give me an idea"
            >
              <Dices className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span>Suggest Ideas</span>
            </button>
          </div>
          
          <div className="relative">
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell Earth how you feel... or roll the dice for an idea."
              className="w-full bg-black/40 border border-white/20 rounded-xl p-6 text-xl text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 resize-none transition-all"
              rows={4}
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={!message.trim() || isSubmitting}
              className="absolute bottom-4 right-4 p-3 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:hover:bg-white/10 rounded-full transition-colors backdrop-blur-sm"
              aria-label="Send message"
            >
              <Send className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </motion.form>
    </motion.div>
  )
}
