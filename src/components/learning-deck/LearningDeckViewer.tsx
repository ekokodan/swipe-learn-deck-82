import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard, A11y } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import CSS for Swiper
import 'swiper/css';
import 'swiper/css/navigation';

import { LearningDeck, LearningCard } from './types';
import { DeckHeader } from './DeckHeader';
import { ProgressBar } from './ProgressBar';
import { QuickNav } from './QuickNav';
import { MoreInfoDrawer } from './MoreInfoDrawer';
import { DefinitionCard } from './cards/DefinitionCard';
import { PatternTableCard } from './cards/PatternTableCard';
import { AnimatedExampleCard } from './cards/AnimatedExampleCard';
import { MisconceptionCard } from './cards/MisconceptionCard';
import { PracticeCard } from './cards/PracticeCard';

interface LearningDeckViewerProps {
  deck: LearningDeck;
  onLanguageChange?: (language: 'EN' | 'FR') => void;
  onSettingsClick?: () => void;
  className?: string;
}

export const LearningDeckViewer = ({ 
  deck, 
  onLanguageChange, 
  onSettingsClick,
  className = ""
}: LearningDeckViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [language, setLanguage] = useState(deck.language);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevent default if we're handling the key
      const handled = () => event.preventDefault();

      switch (event.key) {
        case 'ArrowLeft':
          handled();
          goToPrevious();
          break;
        case 'ArrowRight':
          handled();
          goToNext();
          break;
        case 'n':
        case 'N':
          if (!event.ctrlKey && !event.metaKey) {
            handled();
            goToNext();
          }
          break;
        case ' ':
          // Only handle spacebar if not in an input field
          if (
            !['INPUT', 'TEXTAREA', 'BUTTON'].includes(
              (event.target as HTMLElement)?.tagName
            )
          ) {
            handled();
            // For practice cards, space reveals the answer
            const currentCard = deck.cards[currentIndex];
            if (currentCard?.type === 'practice') {
              // The practice card component handles this internally
            } else {
              goToNext();
            }
          }
          break;
        case 'Escape':
          if (isDrawerOpen) {
            handled();
            setIsDrawerOpen(false);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isDrawerOpen, deck.cards.length]);

  // Support for reduced motion
  const prefersReducedMotion = 
    typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const goToNext = useCallback(() => {
    if (currentIndex < deck.cards.length - 1) {
      swiperInstance?.slideNext();
    }
  }, [currentIndex, deck.cards.length, swiperInstance]);

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      swiperInstance?.slidePrev();
    }
  }, [currentIndex, swiperInstance]);

  const goToSlide = useCallback((index: number) => {
    swiperInstance?.slideTo(index);
  }, [swiperInstance]);

  const handleLanguageChange = (newLanguage: 'EN' | 'FR') => {
    setLanguage(newLanguage);
    onLanguageChange?.(newLanguage);
  };

  const renderCard = (card: LearningCard, isActive: boolean) => {
    const commonProps = { isActive };

    switch (card.type) {
      case 'definition':
        return <DefinitionCard data={card.content} {...commonProps} />;
      case 'pattern-table':
        return <PatternTableCard data={card.content} {...commonProps} />;
      case 'animated-example':
        return <AnimatedExampleCard data={card.content} {...commonProps} />;
      case 'misconception':
        return <MisconceptionCard data={card.content} {...commonProps} />;
      case 'practice':
        return <PracticeCard data={card.content} {...commonProps} />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-muted-foreground">Unknown card type: {card.type}</div>
          </div>
        );
    }
  };

  // Find milestone positions (every 5th card for demo)
  const milestones = deck.cards
    .map((_, index) => index)
    .filter((index) => (index + 1) % 5 === 0);

  return (
    <div className={`min-h-screen bg-background ${className}`}>
      {/* Header */}
      <div className="glass-card sticky top-0 z-50 border-b backdrop-blur-xl">
        <DeckHeader
          title={deck.title}
          level={deck.level}
          language={language}
          onLanguageChange={handleLanguageChange}
          onSettingsClick={onSettingsClick || (() => {})}
        />
      </div>

      {/* Progress Bar */}
      <div className="glass sticky top-[70px] z-40 border-b">
        <ProgressBar
          total={deck.cards.length}
          current={currentIndex}
          milestones={milestones}
        />
      </div>

      {/* Main Content Area */}
      <div className="relative flex-1">
        {/* Card Carousel */}
        <div className="container px-6 py-8">
          <Swiper
            modules={[Navigation, Keyboard, A11y]}
            spaceBetween={24}
            slidesPerView={1}
            keyboard={{
              enabled: true,
              onlyInViewport: true,
            }}
            a11y={{
              enabled: true,
              prevSlideMessage: 'Previous card',
              nextSlideMessage: 'Next card',
            }}
            onSwiper={setSwiperInstance}
            onSlideChange={(swiper) => {
              setCurrentIndex(swiper.activeIndex);
              
              // Announce card change for screen readers
              const announcement = `Card ${swiper.activeIndex + 1} of ${deck.cards.length}`;
              const announcer = document.getElementById('card-announcer');
              if (announcer) {
                announcer.textContent = announcement;
              }
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 1,
                spaceBetween: 28,
              },
              1024: {
                slidesPerView: 1,
                spaceBetween: 32,
              },
            }}
            className="learning-deck-swiper"
            style={{ paddingBottom: '80px' }}
          >
            {deck.cards.map((card, index) => (
              <SwiperSlide key={card.id}>
                <motion.div 
                  className="w-full h-[70vh] max-w-5xl mx-auto"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ 
                    opacity: index === currentIndex ? 1 : 0.7, 
                    scale: index === currentIndex ? 1 : 0.98,
                    y: 0 
                  }}
                  transition={{ 
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                >
                  {renderCard(card, index === currentIndex)}
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Screen reader announcer */}
          <div
            id="card-announcer"
            className="sr-only"
            aria-live="polite"
            aria-atomic="true"
          />
        </div>

        {/* Navigation Controls */}
        <motion.div 
          className="absolute left-6 top-1/2 -translate-y-1/2 z-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="glass-card rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-40 disabled:scale-95 h-12 w-12 border-2"
            aria-label="Previous card"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </motion.div>

        <motion.div 
          className="absolute right-6 top-1/2 -translate-y-1/2 z-10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            disabled={currentIndex === deck.cards.length - 1}
            className="glass-card rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-40 disabled:scale-95 h-12 w-12 border-2"
            aria-label="Next card"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </motion.div>

        {/* More Info Button */}
        <motion.div 
          className="absolute bottom-24 right-6 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={() => setIsDrawerOpen(true)}
            className="fab rounded-full px-6 py-3 btn-glow"
            aria-label="More information"
          >
            <Info className="h-5 w-5 mr-2" />
            <span className="font-medium">More Info</span>
          </Button>
        </motion.div>
      </div>

      {/* Quick Navigation */}
      <motion.div 
        className="glass-card border-t backdrop-blur-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <QuickNav
          total={deck.cards.length}
          current={currentIndex}
          milestones={milestones}
          onNavigate={goToSlide}
        />
      </motion.div>

      {/* More Info Drawer */}
      <MoreInfoDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={deck.cards[currentIndex]?.title || deck.title}
        content={{
          notes: [
            "This lesson covers the fundamentals of the topic with interactive examples.",
            "Take your time to understand each concept before moving to the next card.",
            "Use the practice exercises to test your understanding.",
          ],
          additionalResources: [
            { title: "Video Tutorial", url: "#" },
            { title: "Practice Exercises", url: "#" },
            { title: "Related Lessons", url: "#" },
          ],
        }}
      />
    </div>
  );
};