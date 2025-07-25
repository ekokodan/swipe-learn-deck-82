import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { MisconceptionCardData } from '../types';

interface MisconceptionCardProps {
  data: MisconceptionCardData;
  isActive: boolean;
}

export const MisconceptionCard = ({ data, isActive }: MisconceptionCardProps) => {
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
              Common Misconception
            </Badge>
            <AlertTriangle className="h-5 w-5 text-amber-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-accent">
            Let's Clear This Up
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Misconception */}
          <div className="rounded-lg border border-error/30 bg-error/10 p-4">
            <div className="flex items-start gap-3">
              <XCircle className="h-5 w-5 text-error mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-error mb-2">Common Mistake:</h4>
                <p className="text-error/90">{data.misconception}</p>
              </div>
            </div>
          </div>

          {/* Correction */}
          <div className="rounded-lg border border-success/30 bg-success/10 p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-success mb-2">Correct Approach:</h4>
                <p className="text-success/90">{data.correction}</p>
              </div>
            </div>
          </div>

          {/* Explanation */}
          <div className="rounded-lg bg-accent-muted/30 p-4">
            <h4 className="font-semibold mb-2">Why This Matters:</h4>
            <p className="leading-relaxed">{data.explanation}</p>
          </div>

          {/* Examples */}
          {data.examples && data.examples.length > 0 && (
            <div>
              <h4 className="mb-4 font-semibold">Examples:</h4>
              <div className="space-y-4">
                {data.examples.map((example, index) => (
                  <motion.div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-2 gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <div className="rounded-lg border border-error/30 bg-error/5 p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <XCircle className="h-4 w-4 text-error" />
                        <span className="text-sm font-medium text-error">Wrong</span>
                      </div>
                      <p className="text-sm">{example.wrong}</p>
                    </div>
                    <div className="rounded-lg border border-success/30 bg-success/5 p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span className="text-sm font-medium text-success">Correct</span>
                      </div>
                      <p className="text-sm">{example.correct}</p>
                    </div>
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