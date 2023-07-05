import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Quiz } from '../../../services/quiz/quiz.model';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss'],
})
export class QuizCardComponent {
  @Input() quiz!: Quiz;

  @Output() quizSelected = new EventEmitter<string>();

  onQuizSelected(name: string) {
    this.quizSelected.emit(name);
  }
}
