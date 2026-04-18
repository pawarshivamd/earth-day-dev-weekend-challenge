import { motion } from 'framer-motion'
import { Leaf, RefreshCcw, Activity } from 'lucide-react'

export default function DecisionPanel({ earthReply, onDecision }) {
  const choices = [
    {
      id: 'bad',
      title: "Continue the same lifestyle",
      desc: "Ignore the warnings. Maintain the status quo.",
      icon: RefreshCcw,
      hoverClass: "group-hover:border-red-500/50 group-hover:bg-red-500/10 group-hover:text-red-400"
    },
    {
      id: 'mid',
      title: "Make small changes",
      desc: "Adapt slowly. Do what is convenient.",
      icon: Activity,
      hoverClass: "group-hover:border-amber-500/50 group-hover:bg-amber-500/10 group-hover:text-amber-400"
    },
    {
      id: 'good',
      title: "Commit to protecting Earth",
      desc: "Demand change. Transform the way we live.",
      icon: Leaf,
      hoverClass: "group-hover:border-green-500/50 group-hover:bg-green-500/10 group-hover:text-green-400"
    }
  ]

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-transparent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)", transition: { duration: 1.5 } }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay"></div>

      <div className="z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        <motion.h2 
          className="text-3xl md:text-5xl font-light mb-16 tracking-wide text-white/90 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          What will you do next?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {choices.map((choice, index) => {
            const Icon = choice.icon
            return (
              <motion.button
                key={choice.id}
                onClick={() => onDecision(choice.id)}
                className={`group flex flex-col items-center text-center p-8 rounded-2xl glass-panel border border-white/10 transition-all duration-500 hover:-translate-y-2 ${choice.hoverClass}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 + index * 0.2 }}
              >
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 transition-colors duration-500 group-hover:bg-transparent">
                  <Icon className="w-8 h-8 text-white/60 transition-colors duration-500 inherit-text" />
                </div>
                <h3 className="text-xl font-medium mb-3 text-white/90 group-hover:text-current transition-colors duration-500">
                  {choice.title}
                </h3>
                <p className="text-sm font-light text-white/50 group-hover:text-white/70 transition-colors duration-500">
                  {choice.desc}
                </p>
              </motion.button>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
