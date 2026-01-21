
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MEMORIES } from '../constants';
import { Calendar, ChevronLeft, ChevronRight, Heart, Quote, Clock, Sparkles, Star } from 'lucide-react';

interface MemoryLaneProps {
  onComplete?: () => void;
}

const FloatingHearts = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ y: 400, x: Math.random() * 300, opacity: 0, scale: 0.5 }}
        animate={{ 
          y: -100, 
          x: (Math.random() * 300) + (Math.sin(i) * 50),
          opacity: [0, 0.6, 0],
          scale: [0.5, 1, 0.8]
        }}
        transition={{ 
          duration: 4 + Math.random() * 4, 
          repeat: Infinity, 
          delay: i * 0.8,
          ease: "linear"
        }}
        className="absolute text-[#E5B4A1]/40"
      >
        <Heart size={12 + Math.random() * 10} fill="currentColor" />
      </motion.div>
    ))}
  </div>
);

const MemoryLane: React.FC<MemoryLaneProps> = ({ onComplete }) => {
  const [index, setIndex] = useState(0);

  if (!MEMORIES || MEMORIES.length === 0) {
    return (
      <div className="text-center text-white/50 py-20 italic">
        The vault is quiet today...
      </div>
    );
  }

  const currentMemory = MEMORIES[index];
  const isLast = index === MEMORIES.length - 1;
  const isProposal = currentMemory.id === 11; // "The Proposal" is ID 11

  const next = () => {
    // Extra haptic for the proposal
    if (navigator.vibrate) {
      if (isProposal) navigator.vibrate([20, 50, 20]);
      else navigator.vibrate(10);
    }
    
    if (isLast) {
      if (onComplete) onComplete();
    } else {
      setIndex((prev) => prev + 1);
    }
  };
  
  const prev = () => {
    if (navigator.vibrate) navigator.vibrate(5);
    setIndex((prev) => (prev - 1 + MEMORIES.length) % MEMORIES.length);
  };

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x < -80) next();
    else if (info.offset.x > 80) prev();
  };

  return (
    <div className="relative w-full max-w-sm mx-auto flex flex-col items-center px-4">
      <div className="text-center mb-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mb-3 flex justify-center"
        >
          <Heart size={16} className="text-[#B76E79] fill-[#B76E79]" />
        </motion.div>
        <h2 className="text-3xl font-bold serif-heading text-[#E5B4A1] mb-2 tracking-tight">Memory Lane</h2>
        <p className="text-white/20 tracking-[0.3em] uppercase text-[9px] font-bold">Slide through our moments</p>
      </div>

      <div className="relative w-full aspect-[4/5] perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMemory.id}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            onClick={(e) => {
              if (isLast) {
                next();
                return;
              }
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              if (x > rect.width * 0.7) next();
              else if (x < rect.width * 0.3) prev();
            }}
            initial={{ opacity: 0, x: 50, rotate: 2, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, rotate: -2, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className={`w-full h-full rounded-[3rem] p-10 flex flex-col relative overflow-hidden cursor-grab active:cursor-grabbing transition-all duration-700
              ${isProposal 
                ? 'bg-gradient-to-br from-[#4A1D33] via-[#5D2A42] to-[#1A0B2E] border-2 border-[#E5B4A1] shadow-[0_0_50px_rgba(229,180,161,0.3)]' 
                : 'glass border-[#E5B4A1]/20 shadow-[0_40px_80px_rgba(0,0,0,0.5)]'
              }
              ${isLast ? 'border-[#B76E79]/50 shadow-[0_0_30px_rgba(183,110,121,0.2)]' : ''}
            `}
          >
            {/* Unique Background Elements for Proposal */}
            {isProposal && (
              <>
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 bg-[#E5B4A1]/10 rounded-full blur-[100px] -top-1/2" 
                />
                <FloatingHearts />
                <div className="absolute top-4 right-4 text-[#E5B4A1]/40">
                  <Star size={24} className="animate-pulse" />
                </div>
                <div className="absolute bottom-4 left-4 text-[#E5B4A1]/40 rotate-180">
                  <Star size={24} className="animate-pulse" />
                </div>
              </>
            )}

            {/* Texture and Background Watermark */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
            <div className="absolute -top-12 -right-12 opacity-[0.04] rotate-12 pointer-events-none">
               <Calendar size={220} className={isProposal ? "text-[#E5B4A1]" : "text-[#E5B4A1]"} />
            </div>

            <div className="relative z-10 flex flex-col h-full">
              {/* Enhanced Date Display */}
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-[#E5B4A1]">
                    {isProposal ? <Sparkles size={12} className="animate-spin-slow" /> : <Clock size={12} className="opacity-50" />}
                    <span className={`text-[10px] tracking-[0.3em] font-bold uppercase ${isProposal ? 'text-[#E5B4A1]' : 'opacity-60'}`}>
                      {isProposal ? 'The Grand Milestone' : 'Recorded Moment'}
                    </span>
                  </div>
                  <span className="text-white/20 text-[10px] font-bold serif-heading italic">
                    {index + 1}/{MEMORIES.length}
                  </span>
                </div>
                
                <div className="relative group/date">
                   <div className="absolute -inset-2 bg-[#B76E79]/5 blur-xl rounded-full opacity-0 group-hover/date:opacity-100 transition-opacity" />
                   <h4 className={`relative text-xl md:text-2xl font-bold serif-heading leading-tight drop-shadow-sm transition-colors duration-500 ${isProposal ? 'text-white' : 'text-[#E5B4A1]'}`}>
                      {currentMemory.date}
                   </h4>
                   <div className={`w-12 h-[2px] mt-2 rounded-full transition-all duration-700 ${isProposal ? 'bg-[#E5B4A1] w-20 shadow-[0_0_10px_rgba(229,180,161,0.5)]' : 'bg-[#B76E79]'}`} />
                </div>
              </div>
              
              <div className="mt-auto">
                <motion.h3 
                  animate={isProposal ? { scale: [1, 1.02, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`text-3xl font-bold mb-6 serif-heading leading-tight transition-colors duration-500 ${isProposal ? 'text-[#E5B4A1] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]' : 'text-white'}`}
                >
                  {currentMemory.title}
                </motion.h3>
                
                <div className="relative">
                  <Quote size={20} className={`absolute -top-6 -left-2 ${isProposal ? 'text-[#E5B4A1]/30' : 'text-[#B76E79]/20'}`} />
                  <p className={`romantic-body text-[16px] leading-relaxed font-medium italic pr-4 transition-colors duration-500 ${isProposal ? 'text-white/100' : 'text-white/90'}`}>
                    {currentMemory.description}
                  </p>
                  {isProposal && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-6 flex items-center gap-2"
                    >
                      <div className="px-3 py-1 rounded-full bg-[#E5B4A1]/20 border border-[#E5B4A1]/30 text-[#E5B4A1] text-[9px] uppercase tracking-widest font-bold">
                        She said Yes!
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className={`mt-12 flex items-center justify-between transition-colors ${isProposal ? 'text-[#E5B4A1]/40' : 'text-white/10'}`}>
                <ChevronLeft size={16} />
                <div className="flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-current" />
                  <div className={`w-1.5 h-1.5 rounded-full ${isProposal ? 'bg-[#E5B4A1]' : 'bg-current'}`} />
                  <div className="w-1 h-1 rounded-full bg-current" />
                </div>
                <ChevronRight size={16} />
              </div>
            </div>
            
            {(isLast || isProposal) && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`absolute inset-0 pointer-events-none ${isProposal ? 'bg-gradient-to-t from-[#B76E79]/20 to-transparent' : 'bg-gradient-to-t from-[#B76E79]/10 to-transparent'}`}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modern Progress Bar */}
      <div className="mt-12 w-full max-w-[200px] h-[2px] bg-white/5 rounded-full overflow-hidden relative">
        <motion.div 
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#B76E79] to-[#E5B4A1]"
          initial={{ width: 0 }}
          animate={{ width: `${((index + 1) / MEMORIES.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      {isLast && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={onComplete}
          className="mt-8 text-[#E5B4A1] text-[10px] uppercase tracking-[0.4em] font-bold border-b border-[#E5B4A1]/30 pb-1"
        >
          Continue Journey
        </motion.button>
      )}
    </div>
  );
};

export default MemoryLane;
