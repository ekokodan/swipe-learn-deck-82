import { LearningDeckViewer } from '@/components/learning-deck/LearningDeckViewer';
import { sampleDeck } from '@/data/sampleDeck';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();

  const handleLanguageChange = (language: 'EN' | 'FR') => {
    toast({
      title: "Language Changed",
      description: `Switched to ${language === 'EN' ? 'English' : 'French'}`,
    });
  };

  const handleSettingsClick = () => {
    toast({
      title: "Settings",
      description: "Settings panel would open here",
    });
  };

  return (
    <LearningDeckViewer
      deck={sampleDeck}
      onLanguageChange={handleLanguageChange}
      onSettingsClick={handleSettingsClick}
    />
  );
};

export default Index;
