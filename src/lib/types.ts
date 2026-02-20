export interface Sampradaya {
  id: string;
  name: string;
  nameHindi: string;
  slug: string;
  description: string;
  lineage: string;
  tags: string[];
}

export interface Saint {
  id: string;
  name: string;
  nameHindi: string;
  slug: string;
  sampradayaId: string;
  period: string;
  bio: string;
  works: string[];
  theologicalEmphasis: string;
  tags: string[];
}

export interface Book {
  id: string;
  title: string;
  titleHindi: string;
  slug: string;
  saintId: string;
  sampradayaId: string;
  description: string;
  language: string;
  structure: string;
  vaniCount: number;
  tags: string[];
}

export interface Vani {
  id: string;
  bookId: string;
  vaniNumber: number;
  title: string;
  titleHindi: string;
  originalText: string;
  transliteration: string;
  englishTranslation: string;
  commentary: string;
  ras: string;
  theme: string;
  raga?: string;
  tags: string[];
}
