import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { AnimatedExampleData } from '../types';

interface AnimatedExampleCardProps {
  data: AnimatedExampleData;
  isActive: boolean;
}

export const AnimatedExampleCard = ({ data, isActive }: AnimatedExampleCardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && currentStep < data.steps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < data.steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentStep, data.steps.length]);

  const play = () => {
    setHasStarted(true);
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const reset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setHasStarted(false);
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
    setIsPlaying(false);
    setHasStarted(true);
  };

  return (
    <motion.div
      className="h-full w-full"
      initial={{ scale: 0.9, opacity: 0, y: 10 }}
      animate={isActive ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.9, opacity: 0.7, y: 10 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Card className="h-full border-2 border-accent/20 bg-gradient-to-br from-background to-accent-muted/20">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              Animated Example
            </Badge>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={isPlaying ? pause : play}
                className="h-8 w-8"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={reset}
                className="h-8 w-8"
                aria-label="Reset"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-accent">
            {data.title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Progress indicators */}
          <div className="flex justify-center gap-2">
            {data.steps.map((_, index) => (
              <button
                key={index}
                onClick={() => goToStep(index)}
                className={`h-2 w-8 rounded-full transition-all ${
                  index <= currentStep && hasStarted
                    ? 'bg-accent' 
                    : 'bg-muted hover:bg-muted-foreground/20'
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>

          {/* Current step display */}
          <div className="min-h-[200px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {hasStarted ? (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="text-center space-y-4"
                >
                  <div className="text-lg leading-relaxed">
                    {data.steps[currentStep]?.text}
                  </div>
                  
                  {data.steps[currentStep]?.highlight && (
                    <motion.div
                      className="inline-block rounded-lg bg-accent/20 px-4 py-2 text-accent font-medium"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {data.steps[currentStep].highlight}
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center space-y-4"
                >
                  <div className="text-6xl">▶️</div>
                  <div className="text-muted-foreground">
                    Click play to start the animation
                  </div>
                  <Button onClick={play} className="mt-4">
                    <Play className="h-4 w-4 mr-2" />
                    Start Animation
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Step counter */}
          {hasStarted && (
            <div className="text-center text-sm text-muted-foreground">
              Step {currentStep + 1} of {data.steps.length}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};