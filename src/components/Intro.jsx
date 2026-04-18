import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Intro({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 5000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center bg-black z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle moving particle mask or glow */}
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <motion.h1 
        className="text-2xl md:text-4xl font-light text-white tracking-[0.2em] opacity-0"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 1 }}
      >
        Earth has been listening...
      </motion.h1>
    </motion.div>
  )
}
