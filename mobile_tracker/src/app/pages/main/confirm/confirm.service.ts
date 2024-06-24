import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrlUser = 'https://glpgas.ar/api/users/me';
  private apiUrlPos = 'https://glpgas.ar/api/pos/';

  constructor(private http: HttpClient) { }

  getUserData(): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `token ${token}`
    });
    return this.http.get<any>(this.apiUrlUser, { headers });
  }

  getCustomerData(): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `token ${token}`
    });
    return this.http.get<any>(this.apiUrlPos, { headers });
  }
}
