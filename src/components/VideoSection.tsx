import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import VideoWish from "../assets/VideoShootForAtinuke.mp4"

export function VideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  
  // Use framer-motion's useInView hook. We use a 50% margin so it plays when the center of the video is in view.
  const isInView = useInView(containerRef, { amount: 0.6 });

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsPlaying(true);
            setShowOverlay(false);
          }).catch(e => {
            console.log("Autoplay blocked due to lack of user interaction:", e);
            setIsPlaying(false);
            setShowOverlay(true);
          });
        }
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
        setShowOverlay(true);
      }
    }
  }, [isInView]);

  const togglePlay = () => {
    if (videoRef.current) {
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

  return (
    <section className="bg-cool-50 dark:bg-zinc-950 transition-colors duration-500 relative flex items-center justify-center min-h-[90vh]">
      <div 
        ref={containerRef}
        className="w-full aspect-video overflow-hidden shadow-2xl relative bg-black cursor-pointer group"
        onClick={togglePlay}
      >
        <video 
          ref={videoRef}
          src={VideoWish} 
          className="w-full h-full object-cover"
          loop
          playsInline
        />
        
        {/* Subtle overlay overlaying the paused state */}
        <div className={`absolute inset-0 transition-opacity duration-700 flex flex-col items-center justify-center ${showOverlay ? 'bg-black/40 backdrop-blur-sm opacity-100' : 'opacity-0'}`}>
          <div className="w-20 h-20 rounded-full border-2 border-white/50 flex items-center justify-center text-white/80 bg-black/20 group-hover:scale-110 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          </div>
          <span className="text-white/80 mt-4 text-sm font-medium tracking-wider drop-shadow-md">
            Tap to play with sound
          </span>
        </div>
      </div>
    </section>
  );
}
