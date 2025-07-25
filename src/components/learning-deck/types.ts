export interface LearningCard {
  id: string;
  type: 'definition' | 'pattern-table' | 'animated-example' | 'misconception' | 'practice';
  title?: string;
  content: any; // Flexible content structure based on card type
}

export interface Milestone {
  id: string;
  type: string;
  text?: string;
  [key: string]: any;
}

export interface LearningDeck {
  id: string;
  title: string;
  level?: number;
  language: 'EN' | 'FR';
  milestones: Milestone[];
  cards: LearningCard[];
}

export interface DefinitionCardData {
  term: string;
  definition: string;
  examples?: string[];
  pronunciation?: string;
}

export interface PatternTableData {
  title: string;
  headers: string[];
  rows: string[][];
  notes?: string[];
}

export interface AnimatedExampleData {
  title: string;
  steps: {
    text: string;
    highlight?: string;
    animation?: string;
  }[];
}

export interface MisconceptionCardData {
  misconception: string;
  correction: string;
  explanation: string;
  examples?: { wrong: string; correct: string }[];
}

export interface PracticeCardData {
  prompt: string;
  answer: string;
  type: 'text' | 'multiple-choice' | 'fill-blank';
  options?: string[];
  hint?: string;
  explanation?: string;
}