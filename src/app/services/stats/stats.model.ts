import { Time } from '../../components/stopWatch/stop-watch.model';

export type Complexity = 'easy' | 'medium' | 'hard';

export interface QuestionComplexity {
  complexity: Complexity;
  questionsCount: number;
}

export interface QuizResult {
  points: number;
  totalTime: Time;
  correctAnswersCount: number;
  questionsComplexity: QuestionComplexity[];
  countQuestion: number;
}

export interface QuizStats {
  quizzesCount: number;
  correctQuestionsCount: number;
  wrongQuestionsCount: number;
  averageTimePerQuestion: number;
}
