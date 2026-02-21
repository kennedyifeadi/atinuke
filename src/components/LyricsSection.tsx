import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import feverDream from '../assets/feverDream.mp3';

const lyrics = [
  "Somethin' 'bout you hit me like a freight train to the chest, uh-huh",
  "The day we met, uh-huh",
  "My loneliness",
  "Left the room the second that you walked in, somethin' like a fever dream",
  "Haven't slept in weeks, I think I'm seeing things",
  "Like our shadows dancing us out of our clothes",
  "I'll be damned if you love me, damned if you don't"
];

const LyricLine = ({ text, index, progress }: { text: string; index: number; progress: any }) => {
  // Map the overall scroll progress to the specific range for this line.
  // Assuming 7 lyrics, they are spaced evenly across the scroll region.
  const step = 1 / lyrics.length;
  const start = index * step;
  const end = start + step;

  const opacity = useTransform(progress, [Math.max(0, start - 0.1), start, end, Math.min(1, end + 0.1)], [0.2, 1, 1, 0.2]);
  const scale = useTransform(progress, [Math.max(0, start - 0.1), start, end, Math.min(1, end + 0.1)], [0.95, 1, 1, 0.95]);

  return (
    <motion.p
      style={{ opacity, scale }}
      className="text-4xl md:text-6xl font-sans font-bold text-cool-900 dark:text-coral-400 my-8 text-center"
    >
      {text}
    </motion.p>
  );
};

export function LyricsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const isInView = useInView(containerRef, { amount: 0.2 });
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      if (isInView && !isPlaying) {
        audioRef.current.volume = 0.5;
        audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.log("Audio autoplay blocked", e));
      } else if (!isInView && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isInView, isPlaying]);

  return (
    <section 
      ref={containerRef} 
      className="relative bg-warm-sand dark:bg-zinc-900 transition-colors duration-500 py-20 h-[200vh]"
    >
      <audio 
        ref={audioRef}
        src={feverDream} // Placeholder audio
        loop
      />
      
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        <div className="w-full max-w-4xl max-h-[100vh] relative z-10 flex flex-col items-center">
          {lyrics.map((lyric, index) => (
            <LyricLine key={index} text={lyric} index={index} progress={scrollYProgress} />
          ))}
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 w-full h-1/2 bg-gradient-to-t from-warm-sand dark:from-zinc-900 to-transparent pointer-events-none z-20"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-warm-sand dark:from-zinc-900 to-transparent pointer-events-none z-20"></div>
        
        <div className="absolute bottom-10 z-30 flex items-center gap-4 text-cool-600 dark:text-cool-400">
           <span className="text-sm tracking-widest uppercase font-sans">
             {isPlaying ? 'Playing Music...' : 'Scroll slowly'}
           </span>
        </div>
      </div>
    </section>
  );
}
