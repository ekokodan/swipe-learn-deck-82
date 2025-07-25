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
    <div className="flex items-center justify-center gap-2 p-4">
      {[...Array(total)].map((_, index) => {
        const isCurrent = index === current;
        const isMilestone = milestones.includes(index);
        const isCompleted = index < current;

        return (
          <motion.div
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.02 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 rounded-full transition-all ${
                isCurrent
                  ? 'bg-accent text-accent-foreground scale-125'
                  : isCompleted
                  ? 'bg-accent/60 hover:bg-accent/80'
                  : 'bg-muted hover:bg-muted-foreground/20'
              }`}
              onClick={() => onNavigate(index)}
              aria-label={`Go to card ${index + 1}`}
            >
              {isMilestone ? (
                <Target className="h-3 w-3" />
              ) : (
                <Circle 
                  className={`h-2 w-2 ${
                    isCurrent || isCompleted ? 'fill-current' : ''
                  }`} 
                />
              )}
            </Button>
          </motion.div>
        );
      })}
    </div>
  );
};