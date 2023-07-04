import { Component, OnInit } from '@angular/core';
import { QuestionsAPIService } from '../../services/questionsAPI/questionsAPI.service';
import {
  Question,
  QuestionAPI,
} from '../../services/questionsAPI/questionsAPI.model';
import { QuestionsConverter } from '../../services/questionsAPI/questionsConverter';
import { Router } from '@angular/router';
import { QuizService } from '../../services/quiz/quiz.service';
import { QuestionsUtil } from '../../util/questions.util';
import { Quiz } from '../../services/quiz/quiz.model';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss'],
})
export class QuizListComponent implements OnInit {
  quizzes!: Quiz[];

  constructor(
    private questionsAPI: QuestionsAPIService,
    private quizService: QuizService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.questionsAPI.getQuestionsList$().subscribe((questions) => {
      const groupedQuestions =
        QuestionsConverter.groupQuestionsByCategories(questions);
      const slicedQuizzes = new Map(
        [...groupedQuestions.entries()].slice(0, 10)
      );
      const quizzesArray = QuestionsUtil.quizzesMapToArray(slicedQuizzes);
      this.quizzes = quizzesArray;
      this.quizService.quizzes = quizzesArray;
    });
  }

  onQuizSelected(quiz: string): void {
    this.router.navigate(['play', quiz]);
  }

  startRandomQuizName(): void {
    const randomIndex = Math.floor(
      Math.random() * this.quizService.quizzes.length
    );
    const randomQuiz = this.quizService.quizzes[randomIndex];
    const randomQuizName = randomQuiz?.name;
    this.onQuizSelected(randomQuizName);
  }
}
