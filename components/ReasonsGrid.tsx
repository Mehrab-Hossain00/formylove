
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkle, MousePointer2, X } from 'lucide-react';
import { REASONS, FINAL_REASON } from '../constants';

interface ReasonsGridProps {
  onUnlockLetter?: () => void;
  onNavigateToLetter?: () => void;
}

const ReasonsGrid: React.FC<ReasonsGridProps> = ({ onUnlockLetter, onNavigateToLetter }) => {
  const [showCards, setShowCards] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [readyForFinale, setReadyForFinale] = useState(false);
  const [showFinaleModal, setShowFinaleModal] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showCards && visibleCount < REASONS.length) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
        if (scrollRef.current) {
          const parent = scrollRef.current.parentElement;
          if (parent) {
            parent.scrollTo({
              top: parent.scrollHeight,
              behavior: 'smooth'
            });
          }
        }
      }, 60); 
      return () => clearTimeout(timer);
    } else if (showCards && visibleCount === REASONS.length && !readyForFinale) {
      setReadyForFinale(true);
    }
  }, [showCards, visibleCount, readyForFinale]);

  const handleRevealFinale = () => {
    if (navigator.vibrate) navigator.vibrate([10, 30, 10]);
    setShowFinaleModal(true);
    if (onUnlockLetter) onUnlockLetter();
  };

  const handleFinaleClick = () => {
    if (onNavigateToLetter) {
      if (navigator.vibrate) navigator.vibrate(20);
      setShowFinaleModal(false);
      setTimeout(() => {
        onNavigateToLetter();
      }, 300);
    }
  };

  const getCardStyle = (i: number) => {
    const gradients = [
      "from-[#4A1D33] to-[#3D1A2E] border-[#FFB6C1]/30 text-[#FFD1DC]",
      "from-[#3D1A2E] to-[#1A0B2E] border-[#B76E79]/40 text-[#E5B4A1]",
      "from-[#B76E79]/20 to-[#3D1A2E]/60 border-[#FFB6C1]/20 text-white",
      "from-[#2D1B33] to-[#4A1D33] border-[#E5B4A1]/30 text-[#FFB6C1]",
      "from-[#1A0B2E] to-[#3D1A2E] border-[#B76E79]/20 text-[#FFD1DC]",
    ];
    const rotations = [-3, 2, -1, 3, -2, 1];
    return { 
      className: gradients[i % gradients.length], 
      rotation: rotations[i % rotations.length] 
    };
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 40, rotateX: 45, filter: 'blur(8px)' },
    show: { 
      opacity: 1, scale: 1, y: 0, rotateX: 0, filter: 'blur(0px)',
      transition: { type: "spring", stiffness: 200, damping: 20, mass: 0.8 }
    },
    hover: {
      scale: 1.05, y: -4, rotate: 0,
      borderColor: "rgba(255, 182, 193, 0.6)",
      boxShadow: "0 15px 35px rgba(255,105,180,0.2)",
      transition: { type: "spring", stiffness: 400, damping: 25 }
    }
  };

  return (
    <div ref={scrollRef} className="relative w-full min-h-screen pt-12 pb-60 px-6 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {!showCards ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(20px)', transition: { duration: 0.8 } }}
            className="flex flex-col items-center justify-center min-h-[60vh] text-center"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="mb-8">
              <Sparkle size={32} className="text-[#FFB6C1] opacity-50" />
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-bold serif-heading text-white leading-tight mb-12">
              My dear Arshiya,<br />
              <span className="italic text-[#FFD1DC] drop-shadow-[0_0_10px_rgba(255,182,193,0.3)]">you're the most...</span>
            </h2>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,182,193,0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCards(true)}
              className="relative px-14 py-6 overflow-hidden glass border-[#FFB6C1]/40 rounded-full text-white text-[10px] tracking-[0.5em] uppercase font-bold shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            >
              <span className="relative z-10">Unveil My Heart</span>
              <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" animate={{ x: ['-100%', '100%'] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} />
            </motion.button>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
              <h3 className="text-[#FFD1DC] font-bold serif-heading text-3xl italic mb-2">you're the most...</h3>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#FFB6C1] to-transparent mx-auto" />
            </motion.div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full perspective-1000">
              {REASONS.slice(0, visibleCount).map((reason, i) => {
                const style = getCardStyle(i);
                return (
                  <motion.div
                    key={reason.id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="show"
                    whileHover="hover"
                    style={{ rotate: `${style.rotation}deg` }}
                    className={`px-5 py-6 rounded-[2rem] border bg-gradient-to-br shadow-2xl flex items-center justify-center text-center min-h-[90px] cursor-default select-none relative transition-colors duration-500 ${style.className}`}
                  >
                    <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase leading-relaxed romantic-body">{reason.text}</span>
                    <div className="absolute inset-0 bg-white/5 rounded-[2rem] pointer-events-none opacity-20" />
                  </motion.div>
                );
              })}
            </div>

            <AnimatePresence>
              {readyForFinale && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-24 w-full flex flex-col items-center text-center px-6"
                >
                  {/* Large GIRL EVER text */}
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="mb-12 py-10 px-14 glass border-[#FFB6C1]/30 rounded-[3rem] bg-[#4A1D33]/40 shadow-[0_0_50px_rgba(255,182,193,0.1)]"
                  >
                    <h4 className="text-6xl md:text-9xl font-bold serif-heading text-[#FFD1DC] italic tracking-tight drop-shadow-2xl">
                      GIRL EVER
                    </h4>
                  </motion.div>

                  <div className="w-full h-px bg-gradient-to-r from-transparent via-[#FFB6C1]/20 to-transparent mb-12" />
                  
                  <motion.button
                    onClick={handleRevealFinale}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex flex-col items-center gap-6 cursor-pointer"
                  >
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.8, 0.3] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="p-10 rounded-full bg-[#FFB6C1]/10 border border-[#FFB6C1]/30 shadow-[0_0_30px_rgba(255,182,193,0.1)]"
                    >
                      <Heart size={48} className="text-[#FFD1DC] fill-[#FFB6C1]/40" />
                    </motion.div>
                    <div className="flex flex-col gap-2">
                      <p className="text-white/60 text-[10px] tracking-[0.6em] uppercase font-bold">WAIT, THERE IS ONE MORE THING...</p>
                      <div className="flex items-center justify-center gap-2 text-[#FFD1DC] font-serif italic text-lg group-hover:text-white transition-colors">
                        <MousePointer2 size={16} />
                        <span className="romantic-body">Tap anywhere to see</span>
                      </div>
                    </div>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>

      {/* Full Screen Finale Popup */}
      <AnimatePresence>
        {showFinaleModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center px-6"
          >
            {/* Backdrop Blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFinaleModal(false)}
              className="absolute inset-0 bg-[#1A0B2E]/90 backdrop-blur-2xl cursor-pointer"
            />
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                y: 0,
                transition: { type: "spring", stiffness: 150, damping: 15, mass: 0.5 }
              }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              onClick={handleFinaleClick}
              className="relative w-full max-w-xl glass rounded-[4rem] p-16 md:p-24 text-center border-2 border-[#FFD1DC]/40 bg-gradient-to-b from-[#4A1D33] to-[#1A0B2E] shadow-[0_50px_150px_rgba(0,0,0,0.8)] overflow-hidden cursor-pointer group"
            >
              {/* Animated Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); setShowFinaleModal(false); }}
                className="absolute top-8 right-8 text-white/30 hover:text-white transition-colors p-2 z-20"
              >
                <X size={24} />
              </motion.button>

              <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
              
              <motion.div
                animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="mb-12"
              >
                <Heart size={100} className="text-[#FFD1DC] fill-[#FFB6C1]/40 mx-auto drop-shadow-[0_0_40px_rgba(255,182,193,0.8)]" />
              </motion.div>

              <h3 className="text-6xl md:text-8xl font-bold serif-heading text-white leading-tight italic px-2 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                {FINAL_REASON}
              </h3>
              
              <motion.div 
                className="mt-16 h-[4px] w-32 bg-gradient-to-r from-[#FFB6C1] to-[#FFD1DC] mx-auto rounded-full" 
                animate={{ width: [60, 160, 60], opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 3 }}
              />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 text-white/40 text-[10px] tracking-[0.4em] uppercase font-bold"
              >
                Tap to read my final promise
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReasonsGrid;
