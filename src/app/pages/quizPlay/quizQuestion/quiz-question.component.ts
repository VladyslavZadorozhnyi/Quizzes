import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from '../../../services/questionsAPI/questionsAPI.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.scss'],
})
export class QuizQuestionComponent implements OnInit {
  @Input() question!: Question;

  @Output() answerChanged = new EventEmitter<string>();

  form: FormGroup = this.fb.group({
    answer: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form.get('answer')?.valueChanges.subscribe((value) => {
      this.answerChanged.emit(value);
    });
  }
}
