
import { useState, useRef } from 'react';
import { motion, useAnimation, useDragControls } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { ChevronUp } from 'lucide-react';

const photos = [
  { id: 1, url: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?q=80&w=600&auto=format&fit=crop', title: 'The DevFest Duo', story: 'You came for the speaker, I came for the company. We survived the crowd behind us, and I\'ll never forget the cameraman declaring us the "couple of the event." He had a good eye.' },
  { id: 2, url: 'https://images.unsplash.com/photo-1529156069898-49953eb1f5bc?q=80&w=600&auto=format&fit=crop', title: 'Peaceful Evenings', story: 'Those long calls where neither of us realizes how much time has passed until we look at the clock.' },
  { id: 3, url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=600&auto=format&fit=crop', title: 'The Starting Lines', story: 'Before we knew each other, just seeing the brilliance from a distance. Then everything clicked into place.' },
  { id: 4, url: 'https://images.unsplash.com/photo-1563241527-310ecacdd5ab?q=80&w=600&auto=format&fit=crop', title: 'The \'Friend\'', story: 'Atinuke with her far away best friend, Habeeb. (Lol).' },
];

function MobilePhotoItem({ photo }: { photo: any }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const controls = useAnimation();
  const drawerRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  // Handle drag end
  const handleDragEnd = (_event: any, info: PanInfo) => {
    const threshold = 50; 
    if (info.offset.y < -threshold) {
      setIsExpanded(true);
      controls.start({ y: "-30vh" }); // Slides up 50% max (since it starts at 20%)
    } else if (info.offset.y > threshold) {
      setIsExpanded(false);
      controls.start({ y: 0 }); // Reset back down
    } else {
      // snap back to current state
      controls.start({ y: isExpanded ? "-30vh" : 0 });
    }
  };

  return (
    <div className="relative w-full h-[80vh] flex items-center justify-center snap-center mb-10 overflow-hidden rounded-3xl shadow-2xl">
      <img src={photo.url} alt={photo.title} className="absolute inset-0 w-full h-full object-cover" />
      
      {/* Bottom Drawer Overlay */}
      <motion.div 
        ref={drawerRef}
        className="absolute bottom-0 left-0 w-full bg-zinc-900/80 backdrop-blur-md rounded-t-3xl border-t border-white/10 text-white"
        initial={{ y: 0, height: "20vh" }}
        animate={controls}
        drag="y"
        dragControls={dragControls}
        dragConstraints={{ top: -window.innerHeight * 0.3, bottom: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        style={{ height: "50vh" }} // Allow expanding up to 50vh, initial visual block starts lower
      >
        <div className="w-full flex justify-center py-4 cursor-grab active:cursor-grabbing" onPointerDown={e => dragControls.start(e)}>
          <div className="flex flex-col items-center gap-1 opacity-70">
            <ChevronUp size={20} className={isExpanded ? "rotate-180 transition-transform" : "transition-transform"} />
            <span className="text-xs tracking-widest uppercase mb-1">{isExpanded ? 'Drag down' : 'Drag me up'}</span>
            <div className="w-12 h-1 bg-white/30 rounded-full" />
          </div>
        </div>
        
        <div className="px-6 pb-6 h-full overflow-y-auto">
          <h3 className="text-2xl font-serif text-coral-400 mb-4">{photo.title}</h3>
          <p className="text-cool-200 font-sans leading-relaxed opacity-0 animate-fade-in" style={{ animationDelay: isExpanded ? '0.2s' : '0s', animationFillMode: 'forwards' }}>
            {isExpanded ? photo.story : ''}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export function PhotoGrid() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <section className="py-24 md:py-32 px-4 md:px-6 lg:px-20 bg-warm-sand dark:bg-zinc-900 transition-colors duration-500 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif text-cool-900 dark:text-coral-400 mb-4">Moments & Memories</h2>
          <p className="text-lg text-cool-600 dark:text-cool-300 font-sans">Swipe, hover, and explore</p>
        </motion.div>

        {isMobile ? (
          <div className="w-full snap-y snap-mandatory h-[85vh] overflow-y-scroll pb-[20vh] hide-scrollbar">
            {photos.map(photo => (
              <MobilePhotoItem key={photo.id} photo={photo} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {photos.map((photo, i) => (
              <motion.div
                key={photo.id}
                className="relative group rounded-2xl overflow-hidden shadow-xl aspect-square lg:aspect-[4/3] cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <img 
                  src={photo.url} 
                  alt={photo.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-center">
                   <h3 className="text-white font-serif text-2xl lg:text-3xl tracking-wide">
                     {photo.title}
                   </h3>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
      </div>
    </section>
  );
}
