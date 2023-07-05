import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz/quiz.service';
import { QuizStatsService } from '../../services/stats/quiz-stats.service';
import { Observable } from 'rxjs';
import { QuizStats } from '../../services/stats/stats.model';
import { QuizChartData } from './quizResultsChart/quiz-results-chart.component';

@Component({
  selector: 'app-quiz-stats',
  templateUrl: './quiz-stats.component.html',
  styleUrls: ['./quiz-stats.component.scss'],
})
export class QuizStatsComponent implements OnInit {
  quizStats$!: Observable<QuizStats>;

  constructor(private quizStats: QuizStatsService) {}

  get chartData(): QuizChartData {
    const statsData = this.quizStats.quizStatsSubject.getValue();
    if (statsData) {
      return {
        incorrectAnswers: statsData.wrongQuestionsCount,
        correctAnswers: statsData.correctQuestionsCount,
      };
    }
    return {
      correctAnswers: 0,
      incorrectAnswers: 0,
    };
  }

  ngOnInit(): void {
    this.quizStats$ = this.quizStats.quizStatsSubject.asObservable();
    this.quizStats.loadQuizStats();
  }

  reset() {
    this.quizStats.resetStats();
  }
}
