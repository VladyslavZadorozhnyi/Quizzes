import { Injectable } from '@angular/core';
import { Quiz } from './quiz.model';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private _quizId!: string;
  private _quizzes: Quiz[] = [];

  constructor() {}

  set quizId(id: string) {
    this._quizId = id;
  }

  set quizzes(quizzes: Quiz[]) {
    this._quizzes = quizzes;
  }

  get quizzes(): Quiz[] {
    return this._quizzes;
  }

  getActiveQuiz(): Quiz {
    const quiz = this._quizzes.find((quiz) => quiz.name === this._quizId);
    return quiz
      ? quiz
      : { name: '', questions: [], time: { minutes: 0, seconds: 0 } };
  }
}
