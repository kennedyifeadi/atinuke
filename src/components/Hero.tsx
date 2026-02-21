
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative min-h-[110vh] flex flex-col items-center justify-center overflow-hidden px-6 lg:px-20 py-20">
      <div className="absolute inset-0 z-0 bg-cool-50 dark:bg-zinc-950 transition-colors duration-500">
        {/* Subtle background decoration */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cool-200/30 dark:bg-cool-900/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-warm-sand/30 dark:bg-amber-900/10 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Text Content */}
        <motion.div 
          className="flex-1 text-center lg:text-left pt-20 lg:pt-0 flex flex-col justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.p 
            className="text-sm md:text-base text-cool-600 dark:text-cool-300 font-serif italic mb-6 tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1.5 }}
          >
            A celebration of grace, wit, and kindness.
          </motion.p>
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-cool-900 dark:text-cool-50 leading-[1.2] mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1.5 }}
          >
            To the girl who always knows the right questions to ask.
          </motion.h1>
          <motion.p 
            className="text-3xl md:text-5xl font-serif text-coral-500 dark:text-coral-400 font-medium tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1.5 }}
          >
            Happy Birthday, Atinuke.
          </motion.p>
        </motion.div>

        {/* Image Collage */}
        <div className="flex-1 w-full relative h-[60vh] lg:h-[80vh] flex items-center justify-center">
          <div className="relative w-full max-w-md aspect-[3/4]">
            {/* Desktop Collage / Mobile Overlapping Cards */}
            <motion.div 
              className="absolute top-10 left-0 w-48 h-64 md:w-64 md:h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-800 z-10"
              initial={{ opacity: 0, x: -50, rotate: -5 }}
              animate={{ opacity: 1, x: 0, rotate: -6 }}
              transition={{ delay: 0.5, duration: 1 }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 40 }}
            >
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop" alt="TK Portrait 1" className="w-full h-full object-cover" />
            </motion.div>

            <motion.div 
              className="absolute top-32 right-0 w-56 h-72 md:w-72 md:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-800 z-20"
              initial={{ opacity: 0, x: 50, rotate: 5 }}
              animate={{ opacity: 1, x: 0, rotate: 4 }}
              transition={{ delay: 0.8, duration: 1 }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 40 }}
            >
              <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop" alt="TK Portrait 2" className="w-full h-full object-cover" />
            </motion.div>

            <motion.div 
              className="absolute -bottom-10 left-10 w-40 h-56 md:w-56 md:h-72 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-800 z-30 hidden md:block"
              initial={{ opacity: 0, y: 50, rotate: -10 }}
              animate={{ opacity: 1, y: 0, rotate: -8 }}
              transition={{ delay: 1.1, duration: 1 }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 40 }}
            >
              <img src="https://images.unsplash.com/photo-1510520434124-5bc7e642b61d?q=80&w=600&auto=format&fit=crop" alt="TK Portrait 3" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>

      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-sm uppercase tracking-widest text-cool-600 dark:text-cool-400">Scroll to discover</span>
        <motion.div 
          className="w-[1px] h-16 bg-cool-400 dark:bg-cool-600"
          animate={{ scaleY: [0, 1, 0], originY: [0, 0, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
