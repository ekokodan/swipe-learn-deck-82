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
      <DeckHeader
        title={deck.title}
        level={deck.level}
        language={language}
        onLanguageChange={handleLanguageChange}
        onSettingsClick={onSettingsClick || (() => {})}
      />

      {/* Progress Bar */}
      <ProgressBar
        total={deck.cards.length}
        current={currentIndex}
        milestones={milestones}
      />

      {/* Main Content Area */}
      <div className="relative flex-1">
        {/* Card Carousel */}
        <div className="container px-4 py-6">
          <Swiper
            modules={[Navigation, Keyboard, A11y]}
            spaceBetween={16}
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
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 1,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 1,
                spaceBetween: 32,
              },
            }}
            className="learning-deck-swiper"
            style={{ paddingBottom: '60px' }}
          >
            {deck.cards.map((card, index) => (
              <SwiperSlide key={card.id}>
                <div className="w-full h-[70vh] max-w-4xl mx-auto">
                  {renderCard(card, index === currentIndex)}
                </div>
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
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="rounded-full bg-background/80 backdrop-blur border-2 hover:bg-accent hover:text-accent-foreground"
            aria-label="Previous card"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            disabled={currentIndex === deck.cards.length - 1}
            className="rounded-full bg-background/80 backdrop-blur border-2 hover:bg-accent hover:text-accent-foreground"
            aria-label="Next card"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* More Info Button */}
        <div className="absolute bottom-20 right-4 z-10">
          <Button
            onClick={() => setIsDrawerOpen(true)}
            className="rounded-full bg-accent hover:bg-accent-hover text-accent-foreground"
            aria-label="More information"
          >
            <Info className="h-5 w-5 mr-2" />
            More Info
          </Button>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="border-t bg-background/95 backdrop-blur">
        <QuickNav
          total={deck.cards.length}
          current={currentIndex}
          milestones={milestones}
          onNavigate={goToSlide}
        />
      </div>

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