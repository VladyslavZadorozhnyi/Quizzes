import { Injectable } from '@angular/core';
import { QuizResult, QuizStats } from './stats.model';
import { Quiz } from '../quiz/quiz.model';
import { QuestionsUtil } from '../../util/questions.util';
import { BehaviorSubject } from 'rxjs';

const QUIZ_STATS_KEY = 'quiz_stats';

@Injectable({
  providedIn: 'root',
})
export class QuizStatsService {
  lastQuiz!: Quiz;
  quizResult!: QuizResult;
  quizStatsSubject!: BehaviorSubject<QuizStats>;

  constructor() {
    this.quizStatsSubject = new BehaviorSubject<QuizStats>(
      this.getInitialStats()
    );
  }

  setQuiz(quiz: Quiz) {
    this.lastQuiz = quiz;
    this.quizResult = this.buildQuizResult(this.lastQuiz);
    this.updateQuizStats();
  }
  buildQuizResult(quiz: Quiz): QuizResult {
    const points = quiz.questions
      .filter((question) => question.isCorrectAnswer)
      .reduce(
        (prev, curr) =>
          prev + QuestionsUtil.getDifficultyPoint(curr.difficulty),
        0
      );
    const correctAnswers = quiz.questions.filter(
      (question) => question.isCorrectAnswer
    ).length;
    const complexity = QuestionsUtil.getQuestionComplexityArray(quiz.questions);

    const quizResult: QuizResult = {
      correctAnswersCount: correctAnswers,
      totalTime: quiz.time,
      questionsComplexity: complexity,
      countQuestion: quiz.questions.length,
      points,
    };

    return quizResult;
  }

  loadQuizStats(): void {
    let quizStats: QuizStats;
    const quizStatsContent = localStorage.getItem('quiz_stats');
    if (quizStatsContent) {
      quizStats = JSON.parse(quizStatsContent);
    } else {
      quizStats = this.getInitialStats();
    }

    this.quizStatsSubject.next(quizStats);
  }

  updateQuizStats(): void {
    const {
      correctQuestionsCount,
      quizzesCount,
      wrongQuestionsCount,
      averageTimePerQuestion,
    } = this.quizStatsSubject.getValue();
    const { totalTime, countQuestion, correctAnswersCount } = this.quizResult;
    const averageTimePerLastQuiz =
      (totalTime.minutes * 60 + totalTime.seconds) / countQuestion;
    const averageTimePerAnswer = parseFloat(
      ((averageTimePerQuestion + averageTimePerLastQuiz) / 2).toFixed(2)
    );

    const updatedStats: QuizStats = {
      correctQuestionsCount: correctQuestionsCount + correctAnswersCount,
      averageTimePerQuestion: averageTimePerAnswer,
      wrongQuestionsCount:
        wrongQuestionsCount + (countQuestion - correctAnswersCount),
      quizzesCount: quizzesCount + 1,
    };

    this.updateStatsInStorage(updatedStats);
    this.quizStatsSubject.next(updatedStats);
  }

  updateStatsInStorage(stats: QuizStats): void {
    localStorage.setItem(QUIZ_STATS_KEY, JSON.stringify(stats));
  }

  getInitialStats(): QuizStats {
    return {
      quizzesCount: 0,
      averageTimePerQuestion: 0,
      correctQuestionsCount: 0,
      wrongQuestionsCount: 0,
    };
  }

  resetStats(): void {
    localStorage.removeItem(QUIZ_STATS_KEY);
    this.quizStatsSubject.next(this.getInitialStats());
  }
}
