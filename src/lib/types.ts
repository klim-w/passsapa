// PassSapa - Shared TypeScript Interfaces

export type SubjectCategory = "เวชกรรมไทย" | "เภสัชกรรมไทย" | "ผดุงครรภ์ไทย" | "นวดไทย" | "กฎหมายและจรรยาบรรณวิชาชีพ";

export interface QuestionOption {
  id: "a" | "b" | "c" | "d";
  text: string;
}

export interface QuestionItem {
  id: string;
  category: SubjectCategory;
  scriptureRef: string;
  questionText: string;
  imageUrl?: string;
  options: QuestionOption[];
  correctOptionId: "a" | "b" | "c" | "d";
  explanation: string;
}

export interface FlashcardItem {
  id: string;
  title: string;
  category: string;
  frontText: string;
  backText: string;
  mnemonicNote?: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  subjectCategory: string;
  durationMonths: number;
  price: number;
  originalPrice?: number;
  popular?: boolean;
  badge?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: "ประกาศรับสมัคร" | "ประกาศผลสอบ" | "ข่าวระเบียบสภาฯ";
  summary: string;
  pdfUrl?: string;
}
