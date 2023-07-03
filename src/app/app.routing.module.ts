import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './pages/quizList/quiz-list.component';
import { QuizPlayComponent } from './pages/quizPlay/quiz-play.component';
import { QuizResultsComponent } from './pages/quizResults/quiz-results.component';
import { QuizStatsComponent } from './pages/quizStats/quiz-stats.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: QuizListComponent },
  {
    path: 'play',
    children: [
      {
        path: ':id',
        component: QuizPlayComponent,
      },
    ],
  },
  { path: 'results', component: QuizResultsComponent },
  { path: 'stats', component: QuizStatsComponent },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
