import { Component } from '@angular/core';
import { Utils } from '../../util/utils';
import { forkJoin } from 'rxjs';
import { QuestionsAPIService } from '../../services/questionsAPI/questionsAPI.service';
import {
  Question,
  QuestionAPI,
} from '../../services/questionsAPI/questionsAPI.model';
import { QuestionsConverter } from '../../services/questionsAPI/questionsConverter';
import { Router } from '@angular/router';
import { QuizService } from '../../services/quiz/quiz.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss'],
})
export class QuizListComponent {
  quizzes!: Map<string, QuestionAPI[]>;

  constructor(
    private questionsAPI: QuestionsAPIService,
    private quizService: QuizService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.questionsAPI.getQuestionsList$().subscribe((questions) => {
      this.quizzes = QuestionsConverter.groupQuestionsByCategories(questions);
      this.quizzes = new Map([...this.quizzes.entries()].slice(0, 10));
      console.log(this.quizzes);
      this.quizService.quizzes = Array.from(
        this.quizzes,
        ([name, questions]) => ({
          name,
          questions: questions.map((question) => {
            return {
              ...question,
              answers: [...question.incorrect_answers, question.correct_answer],
            } as Question;
          }),
        })
      );
      console.log(this.quizService.quizzes);
    });
  }

  startQuiz(quiz: string) {
    // this.quizService.quizId = quiz;
    this.router.navigate(['play', quiz]);
  }
}
