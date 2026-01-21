
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Heart, ChevronRight, Lock, MapPin, Utensils, Flame, Gem, Home, Sparkles } from 'lucide-react';
import { FUTURE_PROMISES } from '../constants';

interface JarOfDreamsProps {
  onNavigateToLetter?: () => void;
}

const dreamIcons = [
  MapPin,    // Meeting: The location where distance disappears
  Utensils,  // First date: Dining together
  Flame,     // First kiss: The spark and passion
  Gem,       // Marriage: A precious commitment
  Home,      // Building life: A shared sanctuary
];

const JarOfDreams: React.FC<JarOfDreamsProps> = ({ onNavigateToLetter }) => {
  const [openedIndices, setOpenedIndices] = useState<number[]>([]);

  const toggleDream = (index: number) => {
    if (navigator.vibrate) navigator.vibrate(index === FUTURE_PROMISES.length - 1 ? [10, 30, 50] : 10);
    
    if (!openedIndices.includes(index)) {
      setOpenedIndices(prev => [...prev, index]);
    }

    // Special behavior for the final dream
    if (index === FUTURE_PROMISES.length - 1 && onNavigateToLetter) {
      // Delay navigation slightly for animation satisfaction
      setTimeout(() => {
        onNavigateToLetter();
      }, 1500);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="relative w-full min-h-screen py-16 px-6 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center justify-center p-3 rounded-full glass border-[#B76E79]/30 mb-6 text-[#E5B4A1]">
          <Gift size={24} />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold serif-heading text-white italic mb-4">Jar of Dreams</h2>
        <p className="text-[#B76E79] tracking-[0.4em] uppercase text-[10px] font-bold">Unveiling our shared future</p>
        <div className="mt-6 h-px w-24 bg-gradient-to-r from-transparent via-[#B76E79]/40 to-transparent mx-auto" />
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-6 w-full max-w-lg pb-20"
      >
        {FUTURE_PROMISES.map((promise, index) => {
          const isOpened = openedIndices.includes(index);
          const isLast = index === FUTURE_PROMISES.length - 1;
          const DreamIcon = dreamIcons[index] || Heart;

          return (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleDream(index)}
              className={`
                relative overflow-hidden cursor-pointer rounded-[2.5rem] p-8 border transition-all duration-700
                ${isOpened 
                  ? 'glass border-[#E5B4A1]/40 bg-white/[0.05] shadow-[0_15px_40px_rgba(183,110,121,0.15)]' 
                  : 'bg-black/20 border-white/5 hover:border-white/20 shadow-xl'
                }
              `}
            >
              <AnimatePresence>
                {isOpened && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-br from-[#B76E79]/10 to-transparent pointer-events-none" 
                  />
                )}
              </AnimatePresence>

              <div className="relative z-10 flex items-center gap-6">
                <div className={`
                  flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500
                  ${isOpened ? 'bg-[#B76E79] text-white shadow-lg' : 'bg-white/5 text-white/20'}
                `}>
                  {isOpened ? (
                    <DreamIcon size={24} className={isLast ? "animate-pulse" : ""} />
                  ) : (
                    <Lock size={20} />
                  )}
                </div>

                <div className="flex-1">
                  <AnimatePresence mode="wait">
                    {!isOpened ? (
                      <motion.div
                        key="locked"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col gap-1"
                      >
                        <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/20">Promise #{index + 1}</span>
                        <p className="text-white/40 italic romantic-body">Tap to unveil...</p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="unlocked"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col gap-1"
                      >
                        <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#E5B4A1]">Dream Unveiled</span>
                        <p className="text-white text-lg md:text-xl romantic-body italic leading-relaxed">
                          {promise}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {isLast && isOpened && (
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-[#E5B4A1]"
                  >
                    <ChevronRight size={20} />
                  </motion.div>
                )}
              </div>

              {isLast && (
                <div className={`absolute top-0 right-0 w-16 h-16 pointer-events-none transition-opacity duration-700 ${isOpened ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="absolute top-4 right-4 text-[#B76E79]/20 rotate-45">
                    <Heart size={48} />
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 mb-24 text-center"
      >
        <p className="text-white/20 text-[10px] uppercase tracking-[0.5em] font-medium italic">
          {openedIndices.length === FUTURE_PROMISES.length 
            ? "Every dream leads to us..." 
            : "Collect all dreams to move forward"}
        </p>
      </motion.div>
    </div>
  );
};

export default JarOfDreams;