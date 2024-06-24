// src/app/services/client.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'https://glpgas.ar/api/pos/';

  constructor(private http: HttpClient) { }

  getClientData(): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `token ${token}`
    });

    return this.http.get<any>(this.apiUrl, { headers });
  }
}
