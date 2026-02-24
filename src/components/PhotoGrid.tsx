import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

// Importing local assets with spaces
import pic1 from '../assets/image 1.jpeg';
import pic2 from '../assets/image 2.jpeg';
import pic3 from '../assets/image 3.jpeg';
import vid1 from '../assets/image 7.mp4';
import vid2 from '../assets/image 8.mp4';

const items = [
  { id: 1, type: 'image', url: pic1, text: 'Just a picture of you at DevFest.' },
  { id: 2, type: 'video', url: vid1, text: 'Come and give me all your money. Abeg.' },
  { id: 3, type: 'image', url: pic2, text: 'Atinuke with her far away best friend.' },
  { id: 4, type: 'video', url: vid2, text: 'POV: they said I should do a video. They said I should do a video shoot.' },
  { id: 5, type: 'image', url: pic3, text: 'The Glamour, The Smile, The Aura, The Steeze. This is TK in her element.' },
];

interface MediaItem {
  id: number;
  type: string;
  url: string;
  text: string;
}

function StackingMedia({ item, index }: { item: MediaItem, index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const isInView = useInView(sentinelRef, { amount: 0.5 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (item.type !== 'video' || !video) return;

    const handlePlay = () => {
      setIsPlaying(true);
      setShowOverlay(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
      setShowOverlay(true);
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    if (isInView) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => {
          console.log("Autoplay blocked due to lack of user interaction:", e);
        });
      }
    } else {
      video.pause();
    }

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [isInView, item.type]);

  const togglePlay = () => {
    if (item.type === 'video' && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
        setShowOverlay(true);
      } else {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
          setShowOverlay(false);
        });
      }
    }
  };
  
  // Parallax subtle effect on the image when scrolled past
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  // Dim the image slightly to give depth to the next stacked image
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <>
      <div 
        ref={sentinelRef} 
        className="absolute w-full h-[100dvh] pointer-events-none"
        style={{ top: `${index * 100}dvh` }}
      />
      <div 
        ref={containerRef}
        className={`sticky top-0 h-[100dvh] w-full overflow-hidden shadow-2xl bg-zinc-950 ${item.type === 'video' ? 'cursor-pointer group' : ''}`}
        style={{ zIndex: index }}
        onClick={item.type === 'video' ? togglePlay : undefined}
      >
      <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full text-white">
        {item.type === 'video' ? (
          <>
            <video 
              ref={videoRef}
              src={item.url} 
              className="w-full h-full object-cover"
              loop
              playsInline
            />
            {/* Subtle overlay for paused video state */}
            <div className={`absolute inset-0 transition-opacity duration-700 flex flex-col items-center justify-center ${showOverlay ? 'bg-black/40 backdrop-blur-sm opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <div className="w-20 h-20 rounded-full border-2 border-white/50 flex items-center justify-center text-white/80 bg-black/20 group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </div>
              <span className="text-white/80 mt-4 text-sm font-medium tracking-wider drop-shadow-md">
                Tap to play with sound
              </span>
            </div>
          </>
        ) : (
          <img 
            src={item.url} 
            alt="Memory" 
            className="w-full h-full object-cover"
          />
        )}
      </motion.div>
      
      {/* Text overlay layer at the very bottom */}
      {item.text && (
        <div className="absolute bottom-0 left-0 w-full z-10 px-4 md:px-8 pb-6 md:pb-10 pt-32 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
          <p className="text-white font-sans text-xl md:text-2xl lg:text-3xl leading-relaxed">
            {item.text}
          </p>
        </div>
      )}
      </div>
    </>
  );
}

export function PhotoGrid() {
  return (
    <section className="relative bg-warm-sand dark:bg-zinc-900 transition-colors duration-500">
      <div className="py-24 md:py-32 px-4 md:px-6 text-center border-b border-black/5 dark:border-white/5 relative z-10 bg-warm-sand dark:bg-zinc-900">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-cool-900 dark:text-coral-400 mb-4">Moments & Memories</h2>
          <p className="text-lg md:text-xl text-cool-600 dark:text-cool-300 font-sans">Scroll through our journey</p>
        </motion.div>
      </div>

      <div className="relative w-full">
        {items.map((item, i) => (
          <StackingMedia key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
