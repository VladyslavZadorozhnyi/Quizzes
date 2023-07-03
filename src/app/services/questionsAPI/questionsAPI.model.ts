export interface QuestionsAPIResponse {
  response_code: number;
  results: QuestionAPI[];
}

export interface QuestionAPI {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface Question extends QuestionAPI {
  answers: string[];
}
