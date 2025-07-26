import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DefinitionCardData } from '../types';

interface DefinitionCardProps {
  data: DefinitionCardData;
  isActive: boolean;
}

export const DefinitionCard = ({ data, isActive }: DefinitionCardProps) => {
  const playPronunciation = () => {
    if ('speechSynthesis' in window && data.pronunciation) {
      const utterance = new SpeechSynthesisUtterance(data.pronunciation);
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <motion.div
      className="h-full w-full relative"
      initial={{ scale: 0.95, opacity: 0, y: 20 }}
      animate={isActive ? { 
        scale: 1, 
        opacity: 1, 
        y: 0 
      } : { 
        scale: 0.96, 
        opacity: 0.8, 
        y: 10 
      }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 25,
        duration: 0.6 
      }}
    >
      <Card className="glass-card h-full relative overflow-hidden border-accent/10 hover:border-accent/20 transition-all duration-500">
        {/* Elegant gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10 pointer-events-none" />
        
        <CardHeader className="pb-6 relative z-10">
          <motion.div 
            className="flex items-center justify-between mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Badge 
              variant="secondary" 
              className="glass text-xs font-medium px-3 py-1 bg-accent/10 text-accent border-accent/20"
            >
              Definition
            </Badge>
            {data.pronunciation && (
              <Button
                variant="ghost"
                size="icon"
                onClick={playPronunciation}
                className="glass h-10 w-10 border border-accent/20 hover:border-accent/40 hover:bg-accent/10 transition-all duration-200"
                aria-label="Play pronunciation"
              >
                <Volume2 className="h-4 w-4 text-accent" />
              </Button>
            )}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
          >
            <CardTitle className="heading-serif text-3xl md:text-4xl font-semibold text-foreground mb-2">
              {data.term}
            </CardTitle>
            {data.pronunciation && (
              <div className="text-sm text-muted-foreground italic font-mono bg-muted/30 rounded-lg px-3 py-1 inline-block">
                /{data.pronunciation}/
              </div>
            )}
          </motion.div>
        </CardHeader>
        
        <CardContent className="space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-elegant text-lg md:text-xl leading-relaxed text-foreground/90">
              {data.definition}
            </p>
          </motion.div>
          
          {data.examples && data.examples.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h4 className="mb-4 font-semibold text-foreground text-lg">Examples:</h4>
              <div className="space-y-3">
                {data.examples.map((example, index) => (
                  <motion.div
                    key={index}
                    className="glass-card p-4 text-sm border-l-4 border-accent/40 hover:border-accent/60 transition-all duration-200"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: 0.6 + index * 0.1,
                      type: "spring",
                      stiffness: 300
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      x: 4
                    }}
                  >
                    <span className="text-elegant italic text-foreground/80">"{example}"</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </CardContent>
        
        {/* Floating decoration */}
        <motion.div
          className="absolute top-6 right-6 w-20 h-20 rounded-full bg-accent/5 blur-2xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </Card>
    </motion.div>
  );
};