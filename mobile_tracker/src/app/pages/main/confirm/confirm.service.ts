import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrlUser = 'https://glpgas.ar/api/users/me';
  private apiUrlPos = 'https://glpgas.ar/api/pos/';
  private apiWhatsappUrl = 'https://graph.facebook.com/v19.0/356480757551822/messages';

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

  sendMessageWhatsapp(form: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer EAAVbFZBl8aQcBO7MM4n3kjqJYiAyJuJV5avRwJ2v1QoSo0mjZCYLq7oVNoZB9puZCnY2AR8bdQDgLZB1LHd1kYe8MZBsbZBDn1QhrVrZCnQbljuIc1Os6ERLKtZBnfjeMl2pHkqKT2sd9tToB8d3nCkxjAesMXS5cuk4oenIieDnCR9Atuw5yG9PmsTkQvPquBpAEN4yAlncFZCeCqw4JUeYLEevBHxT4Ln7IrFGJP`
    });
    return this.http.post<any>(this.apiWhatsappUrl, form, { headers });
  }

}
