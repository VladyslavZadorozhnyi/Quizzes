import { Component, Input, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';

export interface QuizChartData {
  correctAnswers: number;
  incorrectAnswers: number;
}

@Component({
  selector: 'app-quiz-results-chart',
  templateUrl: './quiz-results-chart.component.html',
  styleUrls: ['./quiz-results-chart.component.scss'],
})
export class QuizResultsChartComponent implements OnInit {
  @Input() chartData!: QuizChartData;

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [['Correct'], ['Wrong']];
  public pieChartDatasets: ChartDataset<'pie'>[] = [];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  ngOnInit(): void {
    const { correctAnswers, incorrectAnswers } = this.chartData;
    this.pieChartDatasets = [
      {
        data: [correctAnswers, incorrectAnswers],
        backgroundColor: ['green', 'red'],
      },
    ];
  }
}
