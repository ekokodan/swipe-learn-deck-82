import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, XCircle, Eye, Lightbulb } from 'lucide-react';
import { PracticeCardData } from '../types';

interface PracticeCardProps {
  data: PracticeCardData;
  isActive: boolean;
}

export const PracticeCard = ({ data, isActive }: PracticeCardProps) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);

  const checkAnswer = () => {
    setHasAttempted(true);
    const correct = userAnswer.trim().toLowerCase() === data.answer.toLowerCase();
    setIsCorrect(correct);
    
    if (!correct) {
      // Trigger shake animation
      const card = document.querySelector('.practice-card');
      card?.classList.add('shake-error');
      setTimeout(() => card?.classList.remove('shake-error'), 500);
    } else {
      // Show confetti effect
      setIsRevealed(true);
    }
  };

  const revealAnswer = () => {
    setIsRevealed(true);
    setIsCorrect(null);
  };

  const reset = () => {
    setUserAnswer('');
    setIsRevealed(false);
    setIsCorrect(null);
    setShowHint(false);
    setHasAttempted(false);
  };

  return (
    <motion.div
      className="h-full w-full practice-card"
      initial={{ scale: 0.9, opacity: 0, y: 10 }}
      animate={isActive ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.9, opacity: 0.7, y: 10 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Card className="h-full border-2 border-accent/20 bg-gradient-to-br from-background to-accent-muted/20">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              Practice
            </Badge>
            {data.hint && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowHint(!showHint)}
                className="h-8 w-8"
                aria-label="Show hint"
              >
                <Lightbulb className="h-4 w-4" />
              </Button>
            )}
          </div>
          <CardTitle className="text-xl font-bold text-accent">
            Practice Exercise
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div>
            <h3 className="mb-4 text-lg font-medium">{data.prompt}</h3>
            
            <AnimatePresence>
              {showHint && data.hint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 rounded-lg bg-accent-muted/50 p-3 text-sm"
                >
                  💡 <strong>Hint:</strong> {data.hint}
                </motion.div>
              )}
            </AnimatePresence>

            {data.type === 'text' && (
              <div className="space-y-4">
                <Input
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Type your answer..."
                  disabled={isRevealed}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && userAnswer.trim()) {
                      checkAnswer();
                    } else if (e.key === ' ' && e.ctrlKey) {
                      revealAnswer();
                    }
                  }}
                  className="text-lg"
                />
                
                <div className="flex gap-2">
                  <Button 
                    onClick={checkAnswer}
                    disabled={!userAnswer.trim() || isRevealed}
                    className="flex-1"
                  >
                    Check Answer
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={revealAnswer}
                    disabled={isRevealed}
                    className="flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    Reveal
                  </Button>
                </div>
              </div>
            )}

            {data.type === 'multiple-choice' && data.options && (
              <div className="space-y-3">
                {data.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`w-full justify-start text-left ${
                      userAnswer === option ? 'bg-accent/20 border-accent' : ''
                    }`}
                    onClick={() => setUserAnswer(option)}
                    disabled={isRevealed}
                  >
                    {String.fromCharCode(65 + index)}. {option}
                  </Button>
                ))}
                
                <div className="flex gap-2 pt-2">
                  <Button 
                    onClick={checkAnswer}
                    disabled={!userAnswer || isRevealed}
                    className="flex-1"
                  >
                    Check Answer
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={revealAnswer}
                    disabled={isRevealed}
                  >
                    Reveal
                  </Button>
                </div>
              </div>
            )}
          </div>

          <AnimatePresence>
            {(isCorrect !== null || isRevealed) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`rounded-lg p-4 ${
                  isCorrect === true
                    ? 'bg-success/20 border border-success/30'
                    : isCorrect === false
                    ? 'bg-error/20 border border-error/30'
                    : 'bg-accent-muted/50 border border-accent/30'
                }`}
              >
                <div className="flex items-center gap-2">
                  {isCorrect === true && (
                    <>
                      <CheckCircle className="h-5 w-5 text-success" />
                      <span className="font-medium text-success">Correct!</span>
                    </>
                  )}
                  {isCorrect === false && (
                    <>
                      <XCircle className="h-5 w-5 text-error" />
                      <span className="font-medium text-error">Not quite right.</span>
                    </>
                  )}
                  {isCorrect === null && isRevealed && (
                    <span className="font-medium text-accent">Answer revealed</span>
                  )}
                </div>
                
                <div className="mt-2">
                  <strong>Correct answer:</strong> {data.answer}
                </div>
                
                {data.explanation && (
                  <div className="mt-2 text-sm opacity-90">
                    {data.explanation}
                  </div>
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={reset}
                  className="mt-3"
                >
                  Try Again
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};