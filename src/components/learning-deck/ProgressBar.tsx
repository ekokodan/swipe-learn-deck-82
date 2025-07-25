import { motion } from 'framer-motion';

interface ProgressBarProps {
  total: number;
  current: number;
  milestones?: number[];
}

export const ProgressBar = ({ total, current, milestones = [] }: ProgressBarProps) => {
  return (
    <div className="relative w-full px-4 py-2">
      <div className="flex h-1 w-full overflow-hidden rounded-full bg-muted">
        {[...Array(total)].map((_, index) => {
          const isCompleted = index < current;
          const isCurrent = index === current;
          const isMilestone = milestones.includes(index);
          
          return (
            <motion.div
              key={index}
              className={`flex-1 ${
                isCompleted || isCurrent
                  ? 'bg-accent progress-segment active' 
                  : 'bg-muted progress-segment'
              } ${index > 0 ? 'ml-px' : ''}`}
              initial={{ scaleX: 0 }}
              animate={{ 
                scaleX: isCompleted || isCurrent ? 1 : 0.3,
                backgroundColor: isCompleted || isCurrent 
                  ? 'hsl(var(--accent))' 
                  : 'hsl(var(--muted))'
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                delay: index * 0.05 
              }}
            >
              {isMilestone && (
                <motion.div
                  className="absolute top-0 h-3 w-0.5 bg-accent-foreground"
                  style={{ left: `${(index / total) * 100}%` }}
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ delay: 0.3 }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
      
      {/* Progress percentage text */}
      <div className="mt-1 text-center text-xs text-muted-foreground">
        {Math.round((current / total) * 100)}% Complete
      </div>
    </div>
  );
};