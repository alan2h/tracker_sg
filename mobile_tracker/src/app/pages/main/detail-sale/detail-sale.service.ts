// src/app/services/sales.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private apiUrl = `${environment.url_base}/api/sales/`;

  constructor(private http: HttpClient) { }

  submitSale(customerId: number, status_payment: string, paymentMethod: string, detailSale: any[], total: number): Observable<any> {
    const body = {
      total: total,
      point_of_sale: customerId,
      status: status_payment,
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
