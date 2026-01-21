
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Heart } from 'lucide-react';
import { START_DATE } from '../constants';

const TimeTogetherTimer: React.FC = () => {
  const [time, setTime] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = now.getTime() - START_DATE.getTime();
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTime({ days, hours, mins, secs });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-lg mx-auto mt-20 mb-12 px-6"
    >
      <div className="glass rounded-[2.5rem] p-8 border-[#B76E79]/20 shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-[#B76E79]/5 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center">
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-4 text-[#E5B4A1]"
          >
            <Clock size={20} />
          </motion.div>
          
          <h3 className="text-[#E5B4A1] text-[10px] font-bold uppercase tracking-[0.5em] mb-6">Our Time Together</h3>
          
          <div className="flex gap-4 md:gap-8 items-center justify-center">
            {[
              { val: time.days, unit: 'Days' },
              { val: time.hours, unit: 'Hours' },
              { val: time.mins, unit: 'Mins' },
              { val: time.secs, unit: 'Secs' },
            ].map((t, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-2xl md:text-3xl font-bold text-white tabular-nums drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                  {t.val}
                </span>
                <span className="text-[7px] md:text-[8px] uppercase tracking-[0.2em] text-[#B76E79] font-bold mt-1">
                  {t.unit}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-3">
             <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#B76E79]/30" />
             <Heart size={12} className="text-[#B76E79] fill-[#B76E79]/20" />
             <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#B76E79]/30" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TimeTogetherTimer;
