import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, MotionValue } from 'framer-motion';
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

const LyricLine = ({ text, index, progress }: { text: string; index: number; progress: MotionValue<number> }) => {
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
      className="text-3xl md:text-5xl lg:text-6xl font-sans font-bold text-cool-900 dark:text-coral-400 my-8 md:my-14 text-center max-w-4xl mx-auto"
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

  const isInView = useInView(containerRef, { amount: 0.1 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => {
      setIsPlaying(true);
      setShowOverlay(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
      setShowOverlay(true);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    if (isInView) {
      audio.volume = 0.5;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => {
          console.log("Audio autoplay blocked", e);
        });
      }
    } else {
      audio.pause();
    }

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [isInView]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        setShowOverlay(true);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setShowOverlay(false);
        });
      }
    }
  };

  // We translate the container vertically based on scroll so all lyrics roll up the screen
  const yOffset = useTransform(scrollYProgress, [0, 1], ["40%", "-60%"]);

  return (
    <section 
      ref={containerRef} 
      className="relative bg-warm-sand dark:bg-zinc-900 transition-colors duration-500 h-[400vh] cursor-pointer group"
      onClick={togglePlay}
    >
      <audio 
        ref={audioRef}
        src={feverDream} // Placeholder audio
        loop
      />
      
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        <motion.div 
          style={{ y: yOffset }}
          className="w-full relative z-10 flex flex-col items-center justify-start pt-[20vh]"
        >
          {lyrics.map((lyric, index) => (
            <LyricLine key={index} text={lyric} index={index} progress={scrollYProgress} />
          ))}
        </motion.div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-warm-sand dark:from-zinc-900 to-transparent pointer-events-none z-20"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-warm-sand dark:from-zinc-900 to-transparent pointer-events-none z-20"></div>
        
        <div className="absolute bottom-10 z-30 flex items-center gap-4 text-cool-600 dark:text-cool-400">
           {showOverlay ? (
             <span className="text-sm tracking-widest uppercase font-sans font-bold bg-cool-200/50 dark:bg-zinc-800/50 px-4 py-2 rounded-full animate-pulse transition-all">
               Tap anywhere to play with music
             </span>
           ) : (
             <span className="text-sm tracking-widest uppercase font-sans opacity-70">
               {isPlaying ? 'Playing Music... Scroll slowly' : 'Scroll slowly'}
             </span>
           )}
        </div>
      </div>
    </section>
  );
}
