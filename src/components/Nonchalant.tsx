
import { motion } from 'framer-motion';

export function Nonchalant() {
  const sentence = "Because. Every. Sentence. Needs. A. Full. Stop.".split(" ");
  
  return (
    <section className="py-32 px-6 lg:px-20 bg-warm-sand dark:bg-zinc-900 transition-colors duration-500 relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-2xl md:text-3xl text-cool-800 dark:text-cool-200 font-serif leading-relaxed max-w-3xl">
            Who knew that our little conversation would lead to a 5-hour phone call that kept my roommates awake because I couldn't stop laughing? Or you roasting my "nonchalant" texting style.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-6 mt-10">
          {sentence.map((word, idx) => (
            <motion.span
              key={idx}
              className="text-4xl md:text-6xl lg:text-7xl font-sans font-black tracking-tight text-cool-900 dark:text-coral-500 bg-white dark:bg-zinc-800 px-6 py-4 rounded-2xl shadow-xl"
              initial={{ opacity: 0, y: 50, rotate: (Math.random() - 0.5) * 20 }}
              whileInView={{ opacity: 1, y: 0, rotate: (Math.random() - 0.5) * 10 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.15, type: "spring", stiffness: 100, damping: 12 }}
              whileHover={{ scale: 1.1, rotate: 0, transition: { duration: 0.2 } }}
            >
              {word}
            </motion.span>
          ))}
        </div>
      </div>
      
    </section>
  );
}
