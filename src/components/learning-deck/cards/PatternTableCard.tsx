import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PatternTableData } from '../types';

interface PatternTableCardProps {
  data: PatternTableData;
  isActive: boolean;
}

export const PatternTableCard = ({ data, isActive }: PatternTableCardProps) => {
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
              Pattern Table
            </Badge>
          </div>
          <CardTitle className="text-2xl font-bold text-accent">
            {data.title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-accent-muted/30">
                  {data.headers.map((header, index) => (
                    <th
                      key={index}
                      className="px-4 py-3 text-left font-semibold"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.rows.map((row, rowIndex) => (
                  <motion.tr
                    key={rowIndex}
                    className="border-b transition-colors hover:bg-accent-muted/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + rowIndex * 0.1 }}
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`px-4 py-3 ${
                          cellIndex === 0 ? 'font-medium text-accent' : ''
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {data.notes && data.notes.length > 0 && (
            <div>
              <h4 className="mb-3 font-semibold text-foreground">Notes:</h4>
              <div className="space-y-2">
                {data.notes.map((note, index) => (
                  <motion.div
                    key={index}
                    className="rounded-lg bg-accent-muted/50 p-3 text-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    • {note}
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