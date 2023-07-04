import { Complexity } from '../stats/stats.model';

export interface QuestionsAPIResponse {
  response_code: number;
  results: QuestionAPI[];
}

export interface QuestionAPI {
  category: string;
  type: string;
  difficulty: Complexity;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface Question extends QuestionAPI {
  answers: string[];
  isCorrectAnswer?: boolean;
}
