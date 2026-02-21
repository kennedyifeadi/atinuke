
import { ThemeToggle } from './components/ThemeToggle';
import { Hero } from './components/Hero';
import { OriginStory } from './components/OriginStory';
import { Nonchalant } from './components/Nonchalant';
import { VideoSection } from './components/VideoSection';
import { PhotoGrid } from './components/PhotoGrid';
import { FaithAppreciation } from './components/FaithAppreciation';
import { LyricsSection } from './components/LyricsSection';

function App() {
  return (
    <div className="w-full min-h-screen">
      <ThemeToggle />
      <Hero />
      <OriginStory />
      <Nonchalant />
      <VideoSection />
      <PhotoGrid />
      <FaithAppreciation />
      <LyricsSection />
    </div>
  );
}

export default App;
