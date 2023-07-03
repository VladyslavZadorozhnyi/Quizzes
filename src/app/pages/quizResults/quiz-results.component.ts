import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.scss'],
})
export class QuizResultsComponent implements OnInit {
  minutes!: number;
  seconds!: number;

  ngOnInit() {
    const savedTime = localStorage.getItem('savedTime');
    if (savedTime) {
      const time = JSON.parse(savedTime);
      this.minutes = time.minutes;
      this.seconds = time.seconds;
    }
  }
}
