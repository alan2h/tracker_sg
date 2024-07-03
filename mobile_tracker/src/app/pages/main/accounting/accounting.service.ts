import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AccountingService {
    private baseUrl = 'https://glpgas.ar/api';
    private token: string | null = sessionStorage.getItem('token');

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `token ${this.token}`
        });
    }

    getContability(): Observable<any[]> {
        const url = `${this.baseUrl}/expenses/concepts/`;
        return this.http.get<any[]>(url, { headers: this.getHeaders() });
    }


}
