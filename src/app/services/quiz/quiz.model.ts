import { Question } from '../questionsAPI/questionsAPI.model';

export interface Quiz {
  name: string;
  questions: Question[];
}
