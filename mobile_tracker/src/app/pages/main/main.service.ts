import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://glpgas.ar/api/users/me';

  constructor(private http: HttpClient) { }

  getUserData(): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `token ${token}`);

    return this.http.get<any>(this.apiUrl, { headers });
  }
}
