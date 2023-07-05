import { QuestionAPI } from './questionsAPI.model';
import { ObjectUtil } from '../../util/object.util';

export class QuestionsConverter {
  public static groupQuestionsByCategories(
    questions: QuestionAPI[]
  ): Map<string, QuestionAPI[]> {
    let groupedQuestions: Map<string, QuestionAPI[]> = ObjectUtil.groupByKey(
      questions,
      'category'
    );
    groupedQuestions = new Map(
      [...groupedQuestions.entries()].sort((a, b) => b[1].length - a[1].length)
    );
    return groupedQuestions;
  }
}
