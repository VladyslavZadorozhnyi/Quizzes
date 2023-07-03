import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { QuizListComponent } from './pages/quizList/quiz-list.component';
import { QuizCardComponent } from './pages/quizList/quizCard/quiz-card.component';
import { QuizPlayComponent } from './pages/quizPlay/quiz-play.component';
import { QuizQuestionComponent } from './pages/quizPlay/quizQuestion/quiz-question.component';
import { QuizResultsComponent } from './pages/quizResults/quiz-results.component';
import { QuizResultsChartComponent } from './pages/quizStats/quizResultsChart/quiz-results-chart.component';
import { QuizStatsComponent } from './pages/quizStats/quiz-stats.component';
import { StopWatchComponent } from './components/stopWatch/stop-watch.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    QuizListComponent,
    QuizCardComponent,
    QuizPlayComponent,
    QuizQuestionComponent,
    QuizResultsComponent,
    QuizResultsChartComponent,
    QuizStatsComponent,
    StopWatchComponent,
  ],

  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
