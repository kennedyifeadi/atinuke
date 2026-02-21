
import { motion } from 'framer-motion';

export function OriginStory() {
  return (
    <section className="py-32 px-6 lg:px-20 bg-cool-50 dark:bg-zinc-950 transition-colors duration-500 relative flex items-center justify-center min-h-[80vh]">
      <motion.div 
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-left max-w-3xl mx-auto"
        >
          <span className="text-sm font-sans tracking-widest uppercase text-cool-500 dark:text-cool-400 mb-8 block ml-6 md:ml-8">The Origin</span>
          
          <div className="pl-6 md:pl-8 border-l-[3px] border-[#9fbca0] dark:border-[#5c835d] relative">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-cool-900 dark:text-coral-400 leading-[1.6] md:leading-[1.7] mb-12">
              "Before we actually met, I just knew you as the academically smart, well-trained, serious girl who was a level ahead of me."
            </h2>
            
            <p className="text-xl md:text-2xl text-cool-700 dark:text-cool-200 font-sans font-light leading-[1.8] md:leading-[2] max-w-2xl">
              Then came that volunteering event. I was trying to play it cool, and you hit me with:{' '}
              <span className="font-serif italic text-cool-900 dark:text-coral-500 font-medium">
                "Kennedy Ifeadi, I know you now."
              </span>{' '}
              I was terrified of doing too much, but somehow you ended up thinking I was doing too little.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
