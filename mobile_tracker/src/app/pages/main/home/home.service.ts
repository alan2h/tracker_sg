import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private questionsUrl = 'https://glpgas.ar/api/questions';
  private answersUrl = 'https://glpgas.ar/api/answers/';

  constructor(private http: HttpClient) {}

  getQuestions(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `token ${token}`
    });
    return this.http.get<any>(this.questionsUrl, { headers });
  }

  sendAnswer(token: string, formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `token ${token}`
    });
    return this.http.post<any>(this.answersUrl, formData, { headers });
  }
}
