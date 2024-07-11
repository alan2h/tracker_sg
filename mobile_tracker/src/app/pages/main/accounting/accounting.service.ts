import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AccountingService {
    private token: string | null = sessionStorage.getItem('token');

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `token ${this.token}`
        });
    }

    getContability(): Observable<any[]> {
        const url = `${environment.url_base}/api/sales/get_detail_finished`;
        return this.http.get<any[]>(url, { headers: this.getHeaders() });
    }


}
