import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { QuestionAPI, QuestionsAPIResponse } from './questionsAPI.model';
import { ObjectUtil } from '../../util/object.util';

@Injectable({
  providedIn: 'root',
})
export class QuestionsAPIService {
  constructor(private http: HttpClient) {}

  fetchQuestions(): Observable<QuestionsAPIResponse> {
    const amount = 50;
    const params = new HttpParams().set('amount', amount);
    return this.http.get<QuestionsAPIResponse>(environment.QUESTION_API_URL, {
      params,
    });
  }

  getQuestionsList$(): Observable<QuestionAPI[]> {
    return this.fetchQuestions().pipe(
      map((response) => {
        const responseCode = response.response_code;
        switch (responseCode) {
          case 0:
            return response.results;
          default:
            return [];
        }
      }),
      tap((data) => console.log(data))
    );
  }
}
