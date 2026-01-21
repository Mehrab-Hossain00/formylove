
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, ChevronRight, Quote, Sparkles } from 'lucide-react';
import { ANNIVERSARY_MESSAGE } from '../constants';

const HeartParticle: React.FC<{ delay: number }> = ({ delay }) => {
  const [coords] = useState({
    x: Math.random() * 100,
    size: Math.random() * 12 + 6,
  });

  return (
    <motion.div
      initial={{ y: '110vh', opacity: 0 }}
      animate={{ 
        y: '-10vh', 
        opacity: [0, 0.3, 0],
        x: `${coords.x - 2 + Math.sin(Date.now() / 2000) * 5}vw`
      }}
      transition={{ 
        duration: Math.random() * 10 + 15, 
        repeat: Infinity, 
        delay: delay,
        ease: "linear"
      }}
      className="absolute pointer-events-none text-[#B76E79]/15"
      style={{ left: `${coords.x}vw` }}
    >
      <Heart size={coords.size} fill="currentColor" />
    </motion.div>
  );
};

const LoveBloom: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1.5]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.1, 1]);

  return (
    <motion.div 
      style={{ scale, rotate, opacity }}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
    >
      <div className="relative w-64 h-64 flex items-center justify-center">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
            className="absolute w-32 h-48 border-2 border-[#B76E79]/20 rounded-full bg-gradient-to-t from-[#B76E79]/10 to-transparent blur-[2px]"
            style={{ transform: `rotate(${i * 60}deg) translateY(-20px)` }}
          />
        ))}
        <Heart size={40} className="text-[#B76E79] fill-[#B76E79]/40 relative z-10" />
      </div>
    </motion.div>
  );
};

const Hero: React.FC<{ onEnter: () => void }> = ({ onEnter }) => {
  const [particles, setParticles] = useState<number[]>([]);

  useEffect(() => {
    setParticles(Array.from({ length: 20 }, (_, i) => i));
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center pt-8 pb-32 px-6 overflow-x-hidden">
      <LoveBloom />
      
      {/* Ambient Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {particles.map((p) => (
          <HeartParticle key={p} delay={p * 1.5} />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center">
        {/* Main Branding */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass border-[#B76E79]/40 mb-8 shadow-[0_0_20px_rgba(183,110,121,0.2)]"
          >
            <Sparkles size={14} className="text-[#E5B4A1]" />
            <span className="text-[11px] uppercase tracking-[0.4em] font-bold text-[#E5B4A1]">
              Our 2-Month Milestone
            </span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold serif-heading text-white leading-[1.1] mb-2 drop-shadow-2xl">
            Happy 2 Months<br />
            <span className="text-[#E5B4A1] italic font-normal">Anniversary</span>
          </h1>
        </motion.div>

        {/* The Letter Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full relative group"
        >
          {/* Decorative Corner Accents */}
          <div className="absolute -top-2 -left-2 w-12 h-12 border-t-2 border-l-2 border-[#B76E79]/40 rounded-tl-3xl z-20" />
          <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-2 border-r-2 border-[#B76E79]/40 rounded-br-3xl z-20" />
          
          <div className="relative glass rounded-[2.5rem] p-10 md:p-14 border-[#B76E79]/20 shadow-[0_30px_100px_rgba(0,0,0,0.4)] overflow-hidden bg-gradient-to-b from-white/[0.03] to-transparent">
            {/* Background Texture/Watermark */}
            <div className="absolute top-10 right-10 opacity-[0.03] pointer-events-none group-hover:opacity-[0.06] transition-opacity duration-700">
              <Quote size={180} className="text-white rotate-12" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#B76E79]/30" />
                <h2 className="text-[#E5B4A1] text-[10px] font-bold uppercase tracking-[0.5em] whitespace-nowrap">
                  Message from the Heart
                </h2>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#B76E79]/30" />
              </div>
              
              <p className="text-xl md:text-2xl text-white/95 romantic-body italic leading-relaxed md:leading-[1.8] text-center px-2">
                {ANNIVERSARY_MESSAGE}
              </p>
              
              <div className="mt-12 flex flex-col items-center gap-2">
                <Heart size={20} className="text-[#B76E79] fill-[#B76E79]/20 mb-2" />
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/30 italic">
                  Forever Yours, Mehrab
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-16 flex flex-col items-center gap-6"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="w-1 h-12 rounded-full bg-gradient-to-b from-[#B76E79] to-transparent" />
            <span className="text-white/20 text-[9px] uppercase tracking-[0.5em] font-medium">Scroll to explore</span>
          </div>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ y: -5 }}
            onClick={onEnter}
            className="group relative px-10 py-5 bg-[#B76E79] rounded-full text-white font-bold tracking-[0.3em] uppercase text-[11px] flex items-center gap-4 shadow-[0_15px_40px_rgba(183,110,121,0.4)] overflow-hidden"
          >
            <span className="relative z-10">Our Journey</span>
            <ChevronRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
            />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;