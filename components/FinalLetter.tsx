
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, RefreshCw } from 'lucide-react';
import { FINAL_LETTER } from '../constants';

interface FinalLetterProps {
  onComplete?: () => void;
}

const FinalLetter: React.FC<FinalLetterProps> = ({ onComplete }) => {
  const handleFinalClick = () => {
    if (onComplete) {
      if (navigator.vibrate) navigator.vibrate([10, 20]);
      onComplete();
    }
  };

  return (
    <div className="relative w-full min-h-screen py-16 px-6 overflow-x-hidden flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="w-full max-w-2xl"
      >
        <div className="text-center mb-12">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-6"
          >
            <Sparkles size={32} className="text-[#E5B4A1] opacity-50" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold serif-heading text-white italic">My Final Promise</h2>
          <div className="mt-4 h-[2px] w-24 bg-gradient-to-r from-transparent via-[#B76E79] to-transparent mx-auto" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="glass rounded-[3rem] p-10 md:p-14 border-[#B76E79]/20 shadow-[0_30px_100px_rgba(0,0,0,0.5)] relative bg-gradient-to-b from-white/[0.04] to-transparent"
        >
          {/* Paper Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
          
          <div className="relative z-10">
            <p className="text-lg md:text-xl text-white/95 romantic-body italic leading-relaxed md:leading-loose whitespace-pre-wrap text-center">
              {FINAL_LETTER}
            </p>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFinalClick}
              className="mt-16 w-full flex flex-col items-center group cursor-pointer"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="p-4 rounded-full bg-[#B76E79]/5 border border-[#B76E79]/20 group-hover:bg-[#B76E79]/10 transition-colors"
              >
                <Heart size={32} className="text-[#B76E79] fill-[#B76E79]/40 drop-shadow-[0_0_10px_rgba(183,110,121,0.5)]" />
              </motion.div>
              <div className="mt-6 flex flex-col items-center">
                <span className="text-[10px] tracking-[0.5em] uppercase font-bold text-[#E5B4A1] group-hover:text-white transition-colors">
                  Endless Love
                </span>
                <span className="text-[8px] tracking-[0.3em] uppercase text-[#E5B4A1]/60 font-bold mt-1">Mehrab</span>
              </div>
              <div className="mt-4 flex items-center gap-2 text-white/20 text-[8px] uppercase tracking-widest group-hover:text-white/40 transition-colors">
                <RefreshCw size={10} />
                <span>Return Home</span>
              </div>
            </motion.button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-20 text-center text-white/20 italic text-sm"
        >
          <p>Happy 2 Months, my beautiful Arshiya.</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FinalLetter;