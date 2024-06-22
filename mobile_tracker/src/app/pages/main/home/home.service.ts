import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private apiUrl = 'https://glpgas.ar/api/questions';

  constructor(private http: HttpClient) {}

  getQuestions(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `token ${token}`
    });
    return this.http.get<any>(this.apiUrl, { headers });
  }
}
