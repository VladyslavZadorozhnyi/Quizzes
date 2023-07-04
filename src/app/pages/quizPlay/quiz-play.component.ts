import { Component, OnInit, ViewChild } from '@angular/core';
import { QuizService } from '../../services/quiz/quiz.service';
import { Quiz } from '../../services/quiz/quiz.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../../services/questionsAPI/questionsAPI.model';
import { StopWatchComponent } from '../../components/stopWatch/stop-watch.component';
import { QuizStatsService } from '../../services/stats/quiz-stats.service';

@Component({
  selector: 'app-quiz-play',
  templateUrl: './quiz-play.component.html',
  styleUrls: ['./quiz-play.component.scss'],
})
export class QuizPlayComponent implements OnInit {
  @ViewChild(StopWatchComponent)
  stopWatch!: StopWatchComponent;

  quiz!: Quiz;
  activeQuestionIndex: number = 0;
  activeQuestion!: Question;
  currentAnswer!: string;
  nextBtnMessage!: string;

  constructor(
    private quizService: QuizService,
    private statsService: QuizStatsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const quizId = this.activatedRoute.snapshot.paramMap.get('id');
    if (quizId) {
      this.quizService.quizId = quizId;
      const activeQuiz = this.quizService.getActiveQuiz();
      if (activeQuiz.name) {
        this.quiz = { ...activeQuiz };
        this.activeQuestion = this.quiz.questions[this.activeQuestionIndex];
        this.updateBtnMessage();
      } else {
        this.router.navigate(['']);
      }
    }
  }

  nextPage(): void {
    this.router.navigate(['results']);
  }

  toNextQuestion(): void {
    this.quiz.questions[this.activeQuestionIndex] = {
      ...this.activeQuestion,
      isCorrectAnswer:
        this.activeQuestion.correct_answer === this.currentAnswer,
    };
    const nextQuestion = this.quiz.questions[this.activeQuestionIndex + 1];

    if (nextQuestion) {
      this.activeQuestionIndex++;
      this.activeQuestion = nextQuestion;
      this.currentAnswer = '';
      this.updateBtnMessage();
    } else {
      this.quiz.time = this.stopWatch.time;
      this.statsService.setQuiz(this.quiz);
      this.nextPage();
    }
  }

  updateBtnMessage(): void {
    this.nextBtnMessage = this.quiz.questions[this.activeQuestionIndex + 1]
      ? 'Next question'
      : 'Finish quiz';
  }

  onAnswerChanged(answer: string): void {
    this.currentAnswer = answer;
  }

  cancelQuiz(): void {
    this.router.navigate(['home']);
  }
}
