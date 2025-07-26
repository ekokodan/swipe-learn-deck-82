import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Target, Circle } from 'lucide-react';

interface QuickNavProps {
  total: number;
  current: number;
  milestones?: number[];
  onNavigate: (index: number) => void;
}

export const QuickNav = ({ total, current, milestones = [], onNavigate }: QuickNavProps) => {
  return (
    <div className="flex items-center justify-center gap-3 p-6">
      {[...Array(total)].map((_, index) => {
        const isCurrent = index === current;
        const isMilestone = milestones.includes(index);
        const isCompleted = index < current;

        return (
          <motion.div
            key={index}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              delay: index * 0.03,
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
          >
            <Button
              variant="ghost"
              size="icon"
              className={`nav-dot h-10 w-10 rounded-full transition-all duration-300 relative ${
                isCurrent
                  ? 'bg-accent text-accent-foreground scale-125 shadow-lg animate-glow'
                  : isCompleted
                  ? 'bg-accent/70 hover:bg-accent/90 shadow-md'
                  : 'bg-muted/60 hover:bg-muted/80 hover:scale-110'
              }`}
              onClick={() => onNavigate(index)}
              aria-label={`Go to card ${index + 1}`}
            >
              {isMilestone ? (
                <Target className={`h-4 w-4 ${isCurrent ? 'animate-pulse' : ''}`} />
              ) : (
                <Circle 
                  className={`h-3 w-3 transition-all duration-200 ${
                    isCurrent || isCompleted ? 'fill-current scale-110' : 'scale-75'
                  }`} 
                />
              )}
              
              {/* Elegant ripple effect */}
              {isCurrent && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-accent/30"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
              )}
            </Button>
          </motion.div>
        );
      })}
      
      {/* Elegant progress indicator */}
      <motion.div 
        className="ml-6 text-sm text-muted-foreground font-medium"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-accent font-semibold">{current + 1}</span>
        <span className="mx-1">/</span>
        <span>{total}</span>
      </motion.div>
    </div>
  );
};