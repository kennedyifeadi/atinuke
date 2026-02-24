import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './components/ThemeToggle';
import { Hero } from './components/Hero';
import { OriginStory } from './components/OriginStory';
import { Nonchalant } from './components/Nonchalant';
import { VideoSection } from './components/VideoSection';
import { PhotoGrid } from './components/PhotoGrid';
import { FaithAppreciation } from './components/FaithAppreciation';
import { LyricsSection } from './components/LyricsSection';
import { Preloader } from './components/Preloader';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div className={`w-full min-h-screen transition-opacity duration-1000 ${loading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
        <ThemeToggle />
      <Hero />
      <OriginStory />
      <Nonchalant />
      <VideoSection />
      <PhotoGrid />
      <FaithAppreciation />
      <LyricsSection />
      </div>
    </>
  );
}

export default App;
