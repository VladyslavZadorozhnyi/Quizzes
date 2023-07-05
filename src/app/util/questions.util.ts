import { Complexity, QuestionComplexity } from '../services/stats/stats.model';
import {
  Question,
  QuestionAPI,
} from '../services/questionsAPI/questionsAPI.model';
import { Quiz } from '../services/quiz/quiz.model';

export class QuestionsUtil {
  public static getDifficultyPoint(difficulty: Complexity): number {
    switch (difficulty) {
      case 'easy':
        return 1;
      case 'medium':
        return 2;
      case 'hard':
        return 3;
      default:
        return 0;
    }
  }

  public static quizzesMapToArray(quizzes: Map<string, QuestionAPI[]>): Quiz[] {
    return Array.from(quizzes, ([name, questions]) => ({
      name,
      questions: questions.map((question) => {
        return {
          ...question,
          answers: [...question.incorrect_answers, question.correct_answer],
        } as Question;
      }),
      time: {
        minutes: 0,
        seconds: 0,
      },
    }));
  }

  public static getQuestionComplexityArray(
    questions: Question[]
  ): QuestionComplexity[] {
    const complexityMap: { [key in Complexity]: number } = {
      easy: 0,
      medium: 0,
      hard: 0,
    };

    questions.forEach((question) => {
      const difficulty = question.difficulty;
      complexityMap[difficulty]++;
    });

    const questionComplexityArray: QuestionComplexity[] = Object.entries(
      complexityMap
    ).map(([complexity, questionsCount]) => ({
      complexity: complexity as Complexity,
      questionsCount,
    }));

    return questionComplexityArray;
  }
}
