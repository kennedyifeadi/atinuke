import { useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';

export function VideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Use framer-motion's useInView hook. We use a 50% margin so it plays when the center of the video is in view.
  const isInView = useInView(containerRef, { amount: 0.6 });

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play().catch(e => console.log("Autoplay blocked:", e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView]);

  return (
    <section className="py-24 px-6 lg:px-20 bg-cool-50 dark:bg-zinc-950 transition-colors duration-500 relative flex items-center justify-center min-h-[90vh]">
      <div 
        ref={containerRef}
        className="w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl relative border-8 border-white dark:border-zinc-800 bg-black"
      >
        <video 
          ref={videoRef}
          src="https://www.w3schools.com/html/mov_bbb.mp4" 
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
        />
        
        {/* Subtle overlay overlaying the paused state */}
        <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-700 flex items-center justify-center ${isInView ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="w-20 h-20 rounded-full border-2 border-white/50 flex items-center justify-center text-white/80">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
      </div>
    </section>
  );
}
