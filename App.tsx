
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import MemoryLane from './components/MemoryLane';
import ReasonsGrid from './components/ReasonsGrid';
import FinalLetter from './components/FinalLetter';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import TimeTogetherTimer from './components/TimeTogetherTimer';
import { Info } from 'lucide-react';

export type ViewState = 'home' | 'memories' | 'reasons' | 'letter';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewState>('home');
  const [isLetterUnlocked, setIsLetterUnlocked] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  const handleViewChange = (view: ViewState) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUnlockLetter = () => {
    setIsLetterUnlocked(true);
  };

  const pageVariants = {
    initial: { opacity: 0, scale: 0.98, y: 10 },
    enter: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 1.02, y: -10 }
  };

  return (
    <div className="fixed inset-0 transition-colors duration-1000 selection:bg-[#B76E79] selection:text-white overflow-hidden flex flex-col bg-[#3D1A2E] text-pink-100">
      
      {/* Dynamic Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1], 
            opacity: [0.2, 0.3, 0.2],
            backgroundColor: '#FFB6C1'
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full blur-[150px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.1, 1, 1.1], 
            opacity: [0.3, 0.2, 0.3],
            backgroundColor: '#FF69B4'
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full blur-[150px]" 
        />
      </div>

      {/* Footer Toggle Button */}
      {activeView !== 'home' && ( activeView !== 'letter' ) && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          whileHover={{ opacity: 1, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowFooter(true)}
          className="fixed bottom-28 right-6 z-[110] p-2 rounded-full glass border-white/10 text-white/50"
        >
          <Info size={16} />
        </motion.button>
      )}

      <div className="relative z-10 flex-1 flex flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial="initial"
            animate="enter"
            exit="exit"
            variants={pageVariants}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex-1 overflow-y-auto no-scrollbar pt-4 pb-32"
          >
            {activeView === 'home' && (
              <Hero onEnter={() => handleViewChange('memories')} />
            )}
            
            {activeView === 'memories' && (
              <div className="px-4 h-full flex flex-col justify-center">
                <MemoryLane onComplete={() => handleViewChange('reasons')} />
              </div>
            )}

            {activeView === 'reasons' && (
              <div className="px-6 min-h-full">
                <ReasonsGrid 
                  onUnlockLetter={handleUnlockLetter} 
                  onNavigateToLetter={() => handleViewChange('letter')}
                />
              </div>
            )}

            {activeView === 'letter' && (
              <>
                <FinalLetter onComplete={() => handleViewChange('home')} />
                <TimeTogetherTimer />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <Navigation 
        activeView={activeView} 
        onViewChange={handleViewChange} 
        isLetterUnlocked={isLetterUnlocked} 
      />
      
      <AnimatePresence>
        {showFooter && <Footer onClose={() => setShowFooter(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default App;
