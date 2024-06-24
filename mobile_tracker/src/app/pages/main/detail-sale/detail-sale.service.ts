// src/app/services/sales.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private apiUrl = 'https://glpgas.ar/api/sales/';

  constructor(private http: HttpClient) { }

  submitSale(customerId: number, paymentMethod: string, detailSale: any[]): Observable<any> {
    const body = {
      total: 0,
      point_of_sale: customerId,
      status: 'PAGADO',
      method_payment: paymentMethod,
      detail: detailSale
    };

    console.log(body);

    const token = sessionStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `token ${token}`
    });

    return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }
}
