import { motion } from 'framer-motion'

export default function FinalMessage({ onRestart }) {
  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
    >
      <div className="z-10 max-w-3xl text-center flex flex-col items-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 2, delay: 0.5 }}
        >
          <p className="text-2xl md:text-4xl font-light text-white/90 leading-relaxed tracking-wide mb-4">
            The future was never written.
          </p>
          <p className="text-2xl md:text-4xl font-light text-white/90 leading-relaxed tracking-wide mb-16 text-blue-100/80">
            It was always yours to choose.
          </p>
        </motion.div>

        <motion.button
          onClick={onRestart}
          className="px-8 py-3 rounded-full border border-white/30 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 text-sm font-medium tracking-widest uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Restart Experience
        </motion.button>
      </div>
    </motion.div>
  )
}
