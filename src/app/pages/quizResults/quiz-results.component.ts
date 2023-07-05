import { Component, OnInit } from '@angular/core';
import { QuizResult } from '../../services/stats/stats.model';
import { QuizStatsService } from '../../services/stats/quiz-stats.service';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.scss'],
})
export class QuizResultsComponent implements OnInit {
  quizResult!: QuizResult;

  constructor(private quizStats: QuizStatsService) {}

  ngOnInit() {
    this.quizResult = this.quizStats.quizResult;
  }
}
