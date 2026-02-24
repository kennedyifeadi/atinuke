import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import pic1 from '../assets/image 1.jpeg';
import pic2 from '../assets/image 2.jpeg';
import pic3 from '../assets/image 3.jpeg';
import pic4 from '../assets/image 4.jpeg';
import pic5 from '../assets/image 5.jpeg';
import pic6 from '../assets/image 6.jpeg';
import pic9 from '../assets/image 9.jpeg';
import pic10 from '../assets/image 10.jpeg';
import vid1 from '../assets/image 7.mp4';
import vid2 from '../assets/image 8.mp4';
import mainVid from '../assets/VideoShootForAtinuke.mp4';

const assets = [
  pic1, pic2, pic3, pic4, pic5, pic6, pic9, pic10,
  vid1, vid2, mainVid
];

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let loadedCount = 0;
    const total = assets.length;

    const handleLoad = () => {
      loadedCount++;
      setProgress(Math.round((loadedCount / total) * 100));
      if (loadedCount === total) {
        setTimeout(onComplete, 800); // slight delay for smooth transition after hitting 100%
      }
    };

    const loadAsset = (url: string) => {
      return new Promise((resolve) => {
        if (url.endsWith('.mp4')) {
          const video = document.createElement('video');
          video.src = url;
          video.preload = 'auto';
          video.oncanplaythrough = resolve;
          video.onerror = resolve; // Ignore errors so it doesn't block
          video.load();
        } else {
          const img = new Image();
          img.src = url;
          img.onload = resolve;
          img.onerror = resolve;
        }
      });
    };

    // Force complete after 8 seconds anyway to prevent hanging on slow connections
    const fallbackTimeout = setTimeout(() => {
        console.log("Preloading timed out, bypassing...");
        onComplete();
    }, 8000);

    Promise.all(assets.map(url => loadAsset(url).then(handleLoad))).then(() => {
        clearTimeout(fallbackTimeout);
    });

    return () => clearTimeout(fallbackTimeout);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col items-center justify-center p-6"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      <div className="flex flex-col items-center gap-8 w-full max-w-sm">
        <motion.div
           animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
           transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <h1 className="text-4xl md:text-5xl font-serif text-coral-400 tracking-wide text-center">
            Atinuke's Day
          </h1>
        </motion.div>
        
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-coral-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", bounce: 0, duration: 0.5 }}
          />
        </div>
        
        <p className="text-cool-400 font-sans text-xs tracking-widest uppercase animate-pulse">
          Curating Memories... {progress}%
        </p>
      </div>
    </motion.div>
  );
}
