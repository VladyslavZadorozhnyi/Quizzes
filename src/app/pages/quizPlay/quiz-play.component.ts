import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz/quiz.service';
import { Quiz } from '../../services/quiz/quiz.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quiz-play',
  templateUrl: './quiz-play.component.html',
  styleUrls: ['./quiz-play.component.scss'],
})
export class QuizPlayComponent implements OnInit {
  quiz!: Quiz;

  constructor(
    private quizService: QuizService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const quizId = this.activatedRoute.snapshot.paramMap.get('id');
    if (quizId) {
      this.quizService.quizId = quizId;
      const activeQuiz = this.quizService.getActiveQuiz();
      if (activeQuiz.name) {
        this.quiz = activeQuiz;
        console.log(this.quiz);
      } else {
        this.router.navigate(['']);
      }
    }
  }

  nextPage() {
    this.router.navigate(['results']);
  }
}
