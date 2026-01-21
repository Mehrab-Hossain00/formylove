
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, X } from 'lucide-react';

interface FooterProps {
  onClose: () => void;
}

const Footer: React.FC<FooterProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[120] w-[90%] max-w-xs"
    >
      <div className="glass rounded-3xl p-4 border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl relative flex items-center justify-center gap-4">
        <button 
          onClick={onClose}
          className="absolute -top-2 -right-2 p-1.5 rounded-full bg-[#B76E79] text-white shadow-lg"
        >
          <X size={10} />
        </button>
        
        <p className="text-white/60 text-[9px] uppercase tracking-[0.4em] font-bold">
          Until our first hug
        </p>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Heart size={10} className="text-[#B76E79] fill-[#B76E79] opacity-60" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Footer;
