import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private token: string | null = sessionStorage.getItem('token');

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `token ${this.token}`
    });
  }

  getProducts(): Observable<any[]> {
    const url = `${environment.url_base}/api/products/`;
    return this.http.get<any[]>(url, { headers: this.getHeaders() });
  }
}
