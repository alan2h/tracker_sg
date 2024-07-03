import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class BillsViewService {

    private baseUrl = 'https://glpgas.ar/api';
    private token: string | null = sessionStorage.getItem('token');

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `token ${this.token}`
        });
    }

    getBills(): Observable<any[]> {
        const url = `${this.baseUrl}/expenses/`;

        return this.http.get<any[]>(url, { headers: this.getHeaders() });
    }

}