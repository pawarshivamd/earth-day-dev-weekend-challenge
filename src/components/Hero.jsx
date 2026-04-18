import { motion } from 'framer-motion'

export default function Hero({ onStart }) {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, transition: { duration: 1.5 } }}
      transition={{ duration: 2 }}
    >
      {/* Immersive Cinematic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4" type="video/mp4" />
        </video>
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      <div className="z-10 text-center max-w-3xl mx-auto flex flex-col items-center">
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        >
          What if <span className="text-blue-200">Earth</span> could reply to you?
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl text-gray-400 font-light mb-12 tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
        >
          Would you still say the same things?
        </motion.p>

        <motion.button
          onClick={onStart}
          className="group relative px-8 py-4 rounded-full overflow-hidden border border-white/20 glass-panel hover:bg-white/10 transition-all duration-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="relative z-10 text-lg font-medium tracking-wide">Start the conversation</span>
        </motion.button>
      </div>
    </motion.div>
  )
}
