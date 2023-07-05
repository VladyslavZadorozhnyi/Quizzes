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
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { NgChartsModule } from 'ng2-charts';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    ToolbarComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatListModule,
    NgChartsModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
