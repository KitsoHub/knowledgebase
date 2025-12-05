export type languageItemType = {
  type: 'riddle' | 'idiom' | 'proverb';
};

export type languageItemDifficuly = {
  difficulty: 1 | 2 | 3 | 4 | 5;
};

export interface LanguageBaseItem {
  id: string;
  type: languageItemType;
  category: string;
  difficulty: languageItemDifficuly;
  language: string;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface Riddle extends LanguageBaseItem {
  question: string;
  answer: string;
  options: string[];
  hints: {
    deleteLetters?: number;
    revealLetter?: number[];
    solveCost?: number;
  };
  context?: string;
  tags: string[];
}

export type LanguageItem = Riddle
