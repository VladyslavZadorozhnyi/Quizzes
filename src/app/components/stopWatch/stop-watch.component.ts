import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-stop-watch',
  templateUrl: './stop-watch.component.html',
  styleUrls: ['./stop-watch.component.scss'],
})
export class StopWatchComponent implements OnInit, OnDestroy {
  minutes: number = 0;
  seconds: number = 0;
  isTimerRunning: boolean = false;

  private unsubscribe$: Subject<void> = new Subject<void>();

  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  startTimer() {
    this.isTimerRunning = true;

    interval(1000)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        if (this.seconds < 59) {
          this.seconds++;
        } else {
          this.seconds = 0;
          this.minutes++;
        }
      });
  }

  stopTimer() {
    const time = { minutes: this.minutes, seconds: this.seconds };
    localStorage.setItem('savedTime', JSON.stringify(time));
    this.isTimerRunning = false;
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
