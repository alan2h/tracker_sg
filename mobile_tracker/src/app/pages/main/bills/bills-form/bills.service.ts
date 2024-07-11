import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BillsService {
    private token: string | null = sessionStorage.getItem('token');

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `token ${this.token}`
        });
    }

    getConcepts(): Observable<any[]> {
        const url = `${environment.url_base}/api/expenses/concepts/`;
        return this.http.get<any[]>(url, { headers: this.getHeaders() });
    }

    submitBill(data: any): Observable<any[]> {
        const body = {
            concept: data.conceptId,
            amount: data.amount,
            description: data.descriptionBill
        };

        const url = `${environment.url_base}/api/expenses/`;
        console.log(url);
        console.log(body);
        return this.http.post<any[]>(url, body, { headers: this.getHeaders() });
    }
}
