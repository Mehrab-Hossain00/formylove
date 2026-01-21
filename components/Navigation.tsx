
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Camera, Home, ScrollText, ChevronUp, ChevronDown } from 'lucide-react';
import { ViewState } from '../App';

interface NavigationProps {
  activeView: ViewState;
  onViewChange: (view: ViewState) => void;
  isLetterUnlocked: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ activeView, onViewChange, isLetterUnlocked }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems: { id: ViewState; icon: any; label: string; hidden?: boolean }[] = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'memories', icon: Camera, label: 'Gallery' },
    { id: 'reasons', icon: Heart, label: 'Reasons' },
    { id: 'letter', icon: ScrollText, label: 'Letter', hidden: !isLetterUnlocked },
  ];

  const handleNavClick = (view: ViewState) => {
    if (navigator.vibrate) navigator.vibrate(5);
    onViewChange(view);
    setIsOpen(false); // Auto close after selection
  };

  const toggleNav = () => {
    if (navigator.vibrate) navigator.vibrate(10);
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[150] w-[95%] max-w-lg pointer-events-none">
      <div className="flex flex-col items-center pointer-events-auto w-full pb-6">
        
        {/* The Handle Bar - Minimalist Trigger */}
        <motion.button
          onClick={toggleNav}
          className={`flex flex-col items-center px-4 py-1 rounded-t-xl glass border-b-0 border-white/5 transition-all duration-500 mb-[-1px] ${
            isOpen ? 'bg-black/80 translate-y-1' : 'bg-black/30 hover:bg-black/50 shadow-sm'
          }`}
          initial={false}
          animate={{ y: isOpen ? 0 : 0 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div 
            animate={{ rotate: isOpen ? 180 : 0 }}
            className="text-white/10 mb-0.5"
          >
            {isOpen ? <ChevronDown size={8} /> : <ChevronUp size={8} />}
          </motion.div>
          <div className="w-4 h-0.5 rounded-full bg-white/5" />
        </motion.button>

        {/* The Navigation Bar */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ y: 50, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="glass rounded-[2rem] px-2 py-3 flex items-center justify-around shadow-2xl border-white/10 bg-black/80 backdrop-blur-3xl w-full"
            >
              {navItems.filter(item => !item.hidden).map((item) => {
                const isActive = activeView === item.id;
                const Icon = item.icon;

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="relative flex flex-col items-center gap-1.5 py-1 flex-1 min-w-[45px]"
                    whileTap={{ scale: 0.85 }}
                  >
                    <div className={`p-2.5 rounded-2xl transition-all duration-500 relative ${
                      isActive 
                      ? 'text-white scale-110' 
                      : 'text-white/30'
                    }`}>
                      {isActive && (
                        <motion.div
                          layoutId="nav-bg"
                          className="absolute inset-0 bg-[#B76E79] rounded-2xl shadow-[0_5px_15px_rgba(183,110,121,0.4)]"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <Icon size={18} className="relative z-10" strokeWidth={isActive ? 2.5 : 2} />
                    </div>
                    
                    <span className={`text-[8px] uppercase tracking-widest font-bold transition-colors duration-300 truncate w-full px-1 text-center ${
                      isActive ? 'text-[#E5B4A1]' : 'text-white/10'
                    }`}>
                      {item.label}
                    </span>
                    
                    {isActive && (
                      <motion.div
                        layoutId="nav-glow"
                        className="absolute -bottom-1 w-1 h-1 bg-[#B76E79] rounded-full blur-[2px]"
                      />
                    )}
                  </motion.button>
                );
              })}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navigation;
