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
      className="h-full w-full"
      initial={{ scale: 0.9, opacity: 0, y: 10 }}
      animate={isActive ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.9, opacity: 0.7, y: 10 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Card className="h-full border-2 border-accent/20 bg-gradient-to-br from-background to-accent-muted/20">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              Definition
            </Badge>
            {data.pronunciation && (
              <Button
                variant="ghost"
                size="icon"
                onClick={playPronunciation}
                className="h-8 w-8"
                aria-label="Play pronunciation"
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          <CardTitle className="text-2xl font-bold text-accent">
            {data.term}
          </CardTitle>
          {data.pronunciation && (
            <div className="text-sm text-muted-foreground italic">
              /{data.pronunciation}/
            </div>
          )}
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div>
            <p className="text-lg leading-relaxed">
              {data.definition}
            </p>
          </div>
          
          {data.examples && data.examples.length > 0 && (
            <div>
              <h4 className="mb-3 font-semibold text-foreground">Examples:</h4>
              <div className="space-y-2">
                {data.examples.map((example, index) => (
                  <motion.div
                    key={index}
                    className="rounded-lg bg-accent-muted/50 p-3 text-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    "{example}"
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};