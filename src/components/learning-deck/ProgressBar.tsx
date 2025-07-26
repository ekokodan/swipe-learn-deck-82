import { motion } from 'framer-motion';

interface ProgressBarProps {
  total: number;
  current: number;
  milestones?: number[];
}

export const ProgressBar = ({ total, current, milestones = [] }: ProgressBarProps) => {
  const progressPercentage = Math.round((current / total) * 100);
  
  return (
    <div className="relative w-full px-6 py-4">
      {/* Main Progress Container */}
      <div className="relative">
        <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted/50 shadow-inner">
          {[...Array(total)].map((_, index) => {
            const isCompleted = index < current;
            const isCurrent = index === current;
            const isMilestone = milestones.includes(index);
            
            return (
              <motion.div
                key={index}
                className={`flex-1 progress-segment ${
                  isCompleted || isCurrent ? 'active' : ''
                } ${index > 0 ? 'ml-px' : ''}`}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ 
                  scaleX: isCompleted || isCurrent ? 1 : 0.4,
                  opacity: 1
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 25,
                  delay: index * 0.03 
                }}
              >
                {isMilestone && (
                  <motion.div
                    className="absolute -top-1 h-4 w-1 bg-accent/80 rounded-full shadow-sm"
                    style={{ left: `${(index / total) * 100}%` }}
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={{ 
                      delay: 0.5 + index * 0.02,
                      type: "spring",
                      stiffness: 300
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
        
        {/* Animated Progress Glow */}
        <motion.div
          className="absolute top-0 left-0 h-2 rounded-full shadow-lg opacity-60"
          style={{
            background: 'var(--gradient-accent)',
            width: `${(current / total) * 100}%`
          }}
          initial={{ width: 0 }}
          animate={{ width: `${(current / total) * 100}%` }}
          transition={{ 
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1]
          }}
        />
      </div>
      
      {/* Elegant Progress Text */}
      <motion.div 
        className="mt-3 flex items-center justify-between text-sm"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <span className="text-elegant text-muted-foreground">
          Progress
        </span>
        <div className="flex items-center gap-2">
          <motion.span 
            className="text-accent font-semibold text-lg"
            key={progressPercentage}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            {progressPercentage}%
          </motion.span>
          <span className="text-muted-foreground">Complete</span>
        </div>
      </motion.div>
    </div>
  );
};