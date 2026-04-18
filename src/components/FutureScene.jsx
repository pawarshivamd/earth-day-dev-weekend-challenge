import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FutureScene({ decision, onNext }) {
  const [showText, setShowText] = useState(false)

  const scenes = {
    bad: {
      bg: "from-orange-950 via-red-950/80 to-black",
      image: "url('https://images.unsplash.com/photo-1621317646503-68d712437616?auto=format&fit=crop&q=80&w=2000')",
      text: "The air is heavy. The forests are silent. Our vibrant shores have turned to dust, and the sky bleeds an unending warmth.",
      particleColor: "bg-orange-500/20",
      overlay: "blur(0px) contrast(120%) brightness(50%)",
      shake: true
    },
    mid: {
      bg: "from-slate-900 via-gray-800 to-black",
      image: "url('https://images.unsplash.com/photo-1464639351491-a172c2aa2911?auto=format&fit=crop&q=80&w=2000')",
      text: "There is still hope... but time runs perilously thin. Familiar landscapes wither as we fight to preserve what is left.",
      particleColor: "bg-gray-400/20",
      overlay: "blur(0px) contrast(100%) brightness(70%)",
      shake: false
    },
    good: {
      bg: "from-emerald-950 via-teal-900/40 to-black",
      image: "url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=2000')",
      text: "You chose to act. And Earth breathes again. Life reclaims the ruins, restoring a vibrant, shared sanctuary for all.",
      particleColor: "bg-emerald-400/40",
      overlay: "blur(1px) contrast(110%) brightness(90%)",
      shake: false
    }
  }

  const currentScene = scenes[decision]

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 2 } }}
      transition={{ duration: 3 }}
    >
      {/* Immersive Environment Background */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className={`absolute inset-0 bg-cover bg-center transition-all duration-1000`}
          style={{ backgroundImage: currentScene.image, filter: currentScene.overlay }}
          animate={{ 
            scale: currentScene.shake ? [1.05, 1.1, 1.05] : [1, 1.1, 1],
            x: currentScene.shake ? [0, -4, 4, -2, 2, 0] : 0, 
            y: currentScene.shake ? [0, 2, -2, 4, -4, 0] : 0 
          }}
          transition={{ 
            duration: currentScene.shake ? 15 : 30, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div 
          className={`absolute inset-0 bg-gradient-to-t ${currentScene.bg} mix-blend-multiply opacity-80`}
        />

        {/* Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${currentScene.particleColor}`}
              style={{
                width: Math.random() * 8 + 2 + 'px',
                height: Math.random() * 8 + 2 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                filter: 'blur(2px)'
              }}
              animate={{
                y: [0, -(Math.random() * 200 + 100)],
                x: [0, (Math.random() - 0.5) * 100],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 10 + 5,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </div>

      <div className="z-10 text-center max-w-4xl px-6 flex flex-col items-center">
        <AnimatePresence>
          {showText && (
            <motion.h2 
              className="text-3xl md:text-5xl lg:text-5xl font-light text-white tracking-wide leading-relaxed drop-shadow-2xl"
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 2, ease: "easeOut" }}
            >
              {currentScene.text}
            </motion.h2>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showText && (
            <motion.div
              className="mt-16 flex flex-col items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 3 }}
            >
              <button
                onClick={onNext}
                className="px-8 py-3 rounded-full bg-white text-black hover:bg-gray-200 transition-colors text-sm font-semibold tracking-widest uppercase mt-4 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              >
                Advance time
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
