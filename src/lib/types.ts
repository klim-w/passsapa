// PassSapa - Shared TypeScript Interfaces (T1 Architecture Standard)

export type SubjectCategory = 
  | "เวชกรรมไทย" 
  | "เภสัชกรรมไทย" 
  | "ผดุงครรภ์ไทย" 
  | "นวดไทย" 
  | "กฎหมายและจรรยาบรรณวิชาชีพ";

export type QuestionType = "mcq_5" | "fill_in_blank" | "subjective";

export type ExamPart = "theory" | "practical" | "general";

export type SubCategory = "เวช 1" | "เวช 2" | "ทั่วไป";

export interface QuestionOption {
  id: "a" | "b" | "c" | "d" | "e";
  text: string;
}

export interface QuestionItem {
  id: string;
  category: SubjectCategory;
  scriptureRef: string;
  questionText: string;
  questionType?: QuestionType; // mcq_5, fill_in_blank, subjective
  examPart?: ExamPart;        // theory, practical, general
  subCategory?: SubCategory;  // เวช 1, เวช 2, ทั่วไป
  imageUrl?: string;
  options?: QuestionOption[]; // For mcq_5 (5 choices)
  correctOptionId?: "a" | "b" | "c" | "d" | "e";
  correctAnswerText?: string; // For fill_in_blank
  subjectiveRubric?: string;  // For subjective (essay answer key)
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

export interface StudyMaterialItem {
  id: string;
  category: SubjectCategory;
  title: string;
  scriptureRef: string;
  summary: string;
  fullContent: string;
  readTimeMinutes: number;
}

export interface KnowledgeArticleItem {
  id: string;
  title: string;
  category: string;
  author: string;
  summary: string;
  fullContent: string;
  publishedDate: string;
  readTimeMinutes: number;
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
