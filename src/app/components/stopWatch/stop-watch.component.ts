import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subject, takeUntil } from 'rxjs';
import { Time } from './stop-watch.model';

@Component({
  selector: 'app-stop-watch',
  templateUrl: './stop-watch.component.html',
  styleUrls: ['./stop-watch.component.scss'],
})
export class StopWatchComponent implements OnInit, OnDestroy {
  minutes: number = 0;
  seconds: number = 0;

  private unsubscribe$: Subject<void> = new Subject<void>();

  get time(): Time {
    return {
      minutes: this.minutes,
      seconds: this.seconds,
    };
  }

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  startTimer(): void {
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

  stopTimer(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
