export type EducationLevel = 'PLE' | 'UCE' | 'UACE';
export type UserRole = 'student' | 'parent' | 'school' | 'admin';
export type ExamMode = 'practice' | 'simulation' | 'quiz';
export type AuthMode = 'login' | 'signup-student' | 'signup-parent' | 'signup-school';

export interface StudyReminder {
    id: string;
    subject: string;
    time: string; // HH:mm format
    active: boolean;
}

export interface QuestionHistoryItem {
    questionPartId: string;
    examId: string;
    lastAttempt: string; // ISO date string
    isCorrect: boolean;
    streak: number; // consecutive correct attempts
    nextReview: string; // ISO date string
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password?: string; // User's password for authentication.
  avatarUrl?: string;
  // Student specific
  level?: EducationLevel;
  school?: string;
  dob?: string;
  xp?: number;
  streak?: number;
  achievements?: string[];
  lastExamDate?: string;
  questionHistory?: QuestionHistoryItem[];
  studyReminders?: StudyReminder[];
  // Parent/School specific
  phone?: string;
  subscription?: {
    plan: SubscriptionPlan;
    billingHistory: BillingRecord[];
  };
  // School specific
  contactPerson?: string;
}

export interface Exam {
  id: string;
  title: string;
  subject: string;
  topic?: string;
  year: number;
  level: EducationLevel;
  timeLimit: number; // in minutes
  questionCount: number;
  avgScore: number;
  isFree: boolean;
  type: 'Past Paper' | 'Practice Paper';
  questions: Question[];
  description?: string;
  pdfSummary?: string;
  explanationPdfUrl?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface QuestionPart {
  id: string;
  text: string;
  marks: number;
  answer: string;
  explanation?: string;
  answerType?: 'text' | 'numeric' | 'open-ended';
}

export interface QuestionTable {
  headers: string[];
  rows: string[][];
}

export interface Question {
  id: string;
  questionNumber: number;
  text: string; // The "stem" or preamble for the question
  imageUrl?: string;
  table?: QuestionTable;
  parts: QuestionPart[];
}


export interface ExamAttempt {
    subject: string;
    year: number;
    score: number;
    date: string;
}

export interface SubjectPerformance {
    name: string;
    average: number;
    attempts: number;
    improvement: number; // percentage
}

export interface WeakArea {
    subject: string;
    average: number;
    topic: string;
}

export interface LinkRequest {
    id: string;
    from: string; // User ID
    to: string;   // User ID
    status: 'pending';
}

export interface LinkedAccount {
    userId1: string;
    userId2: string;
}

export type SubscriptionPlan = 'Free' | 'Premium';

export interface BillingRecord {
    id:string;
    date: string;
    amount: number;
    description: string;
}

export interface Notification {
    id: string;
    userId: string;
    text: string;
    date: string;
    read: boolean;
}


// --- Forum Types ---

export interface ForumCategory {
    id: string;
    name: string;
    description: string;
    icon: 'general' | 'tips' | 'school' | 'feedback';
}

export interface ForumPost {
    id: string;
    categoryId: string;
    title: string;
    content: string;
    authorId: string;
    createdAt: string; // ISO date string
    isPinned: boolean;
    isLocked: boolean;
    tags?: string[];
    views?: number;
}

export interface ForumReply {
    id: string;
    postId: string;
    parentId: string | null;
    content: string;
    authorId: string;
    createdAt: string; // ISO date string
}