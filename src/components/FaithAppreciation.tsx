
import { motion } from 'framer-motion';

export function FaithAppreciation() {
  return (
    <section className="py-40 px-6 lg:px-20 bg-cool-900 dark:bg-zinc-950 text-cool-50 transition-colors duration-500 relative overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cool-700 dark:bg-amber-900/20 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cool-800 dark:bg-coral-500/10 rounded-full mix-blend-screen filter blur-[100px] opacity-50"></div>

      <motion.div 
        className="max-w-4xl mx-auto relative z-10 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <span className="text-coral-400 dark:text-amber-500 mb-8 block font-serif italic text-xl">The Spirit</span>
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif leading-loose font-light">
          "Beyond the jokes and the events, I admire your spirit. You are a truly God-spirited person, and the way you love Christ is inspiring. Thank you for constantly encouraging me to be better in my own faith."
        </h3>
        
        <div className="w-16 h-px bg-cool-500 dark:bg-zinc-700 mx-auto my-12"></div>
        
        <p className="text-lg md:text-xl font-sans text-cool-200 dark:text-cool-400 leading-relaxed max-w-2xl mx-auto font-light">
          My prayer for you today is that God continues to shine His light on your path, grants your heart's desires, and keeps that beautiful, genuine care for others alive in you forever.
        </p>
      </motion.div>
    </section>
  );
}
