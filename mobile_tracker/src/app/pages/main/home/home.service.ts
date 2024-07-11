import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private questionsUrl = `${environment.url_base}/api/questions`;
  private answersUrl = `${environment.url_base}/api/answers/`;

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
