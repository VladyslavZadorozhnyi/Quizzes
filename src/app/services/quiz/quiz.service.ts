import { Injectable } from '@angular/core';
import { Quiz } from './quiz.model';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private _quizId!: string;
  private _quizzes: Quiz[] = [];

  constructor() {}

  get quizId(): string {
    return this._quizId;
  }

  set quizId(id: string) {
    this._quizId = id;
  }

  set quizzes(quizzes: Quiz[]) {
    this._quizzes = quizzes;
  }

  getActiveQuiz(): Quiz {
    const quiz = this._quizzes.find((quiz) => quiz.name === this._quizId);
    return quiz ? quiz : { name: '', questions: [] };
  }
}
