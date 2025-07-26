import { Settings, Globe, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';

interface DeckHeaderProps {
  title: string;
  level?: number;
  language: 'EN' | 'FR';
  onLanguageChange: (language: 'EN' | 'FR') => void;
  onSettingsClick: () => void;
}

export const DeckHeader = ({ 
  title, 
  level, 
  language, 
  onLanguageChange, 
  onSettingsClick 
}: DeckHeaderProps) => {
  return (
    <header className="relative">
      <div className="container flex h-20 items-center justify-between px-6">
        <motion.div 
          className="flex items-center gap-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              className="p-2 rounded-xl bg-accent/10 text-accent"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <BookOpen className="h-6 w-6" />
            </motion.div>
            <div>
              <h1 className="heading-serif text-2xl md:text-3xl text-foreground font-semibold">
                {title}
              </h1>
              <motion.div 
                className="text-sm text-muted-foreground mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Interactive Learning Experience
              </motion.div>
            </div>
          </div>
          
          {level && (
            <motion.div 
              className="flex items-center gap-3 p-3 rounded-xl bg-background/50 border border-border/50"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Level
              </div>
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`h-2.5 w-2.5 rounded-full ${
                      i < level ? 'bg-accent shadow-sm' : 'bg-muted/60'
                    }`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      delay: 0.4 + i * 0.1,
                      type: "spring",
                      stiffness: 400,
                      damping: 15
                    }}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
        
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Select value={language} onValueChange={onLanguageChange}>
            <SelectTrigger className="glass w-24 h-10 border-border/50 hover:border-accent/30 transition-colors">
              <Globe className="h-4 w-4 text-accent" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass-card border-border/50">
              <SelectItem value="EN" className="hover:bg-accent/10">EN</SelectItem>
              <SelectItem value="FR" className="hover:bg-accent/10">FR</SelectItem>
            </SelectContent>
          </Select>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onSettingsClick}
            className="glass h-10 w-10 border border-border/50 hover:border-accent/30 hover:bg-accent/5 transition-all duration-200"
            aria-label="Settings"
          >
            <Settings className="h-5 w-5 text-muted-foreground hover:text-accent transition-colors" />
          </Button>
        </motion.div>
      </div>
    </header>
  );
};