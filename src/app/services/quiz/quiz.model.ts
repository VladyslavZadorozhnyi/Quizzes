import { Question } from '../questionsAPI/questionsAPI.model';
import { Time } from '../../components/stopWatch/stop-watch.model';

export interface Quiz {
  name: string;
  questions: Question[];
  time: Time;
}
