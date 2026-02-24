import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

// Importing local assets with spaces
import pic1 from '../assets/image 1.jpeg';
import pic2 from '../assets/image 2.jpeg';
import pic3 from '../assets/image 3.jpeg';
import vid1 from '../assets/image 7.mp4';
import vid2 from '../assets/image 8.mp4';

const items = [
  { id: 1, type: 'image', url: pic1, title: 'The DevFest Duo', story: 'You came for the speaker, I came for the company. We survived the crowd behind us, and I\'ll never forget the cameraman declaring us the "couple of the event." He had a good eye.' },
  { id: 2, type: 'video', url: vid1, title: 'In Motion', story: 'Captured moments of our vibrant life together, where every second counts.' },
  { id: 3, type: 'image', url: pic2, title: 'Peaceful Evenings', story: 'Those long calls where neither of us realizes how much time has passed until we look at the clock.' },
  { id: 4, type: 'video', url: vid2, title: 'Laughter & Joy', story: 'The smiles that light up our darkest days.' },
  { id: 5, type: 'image', url: pic3, title: 'The Starting Lines', story: 'Before we knew each other, just seeing the brilliance from a distance. Then everything clicked into place.' },
];

interface MediaItem {
  id: number;
  type: string;
  url: string;
  title: string;
  story: string;
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
            alt={item.title} 
            className="w-full h-full object-cover"
          />
        )}
      </motion.div>
      
      {/* Text overlay floating at bottom left */}
      <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full max-w-3xl z-10 pb-12 md:pb-16 xl:pb-24">
        <div className="bg-black/50 backdrop-blur-md p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/10 shadow-2xl">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-coral-400 mb-3">{item.title}</h3>
          <p className="text-white/95 font-sans text-base md:text-lg lg:text-xl leading-relaxed">
            {item.story}
          </p>
        </div>
      </div>
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
