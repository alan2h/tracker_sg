import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrlUser = `${environment.url_base}/api/users/me`;
  private apiUrlPos = `${environment.url_base}/api/pos/`;
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
      'Authorization': `Bearer EAAVbFZBl8aQcBO4jvyiNZCOLKBHLaYC3wwqnrBf0GLJrG8xrEmHe6JaiTbFFQ2vzYFUVxzsDPmTCEwdRl1pamqZApVG3irnpQ78Iii4ConIreYIdUpWARPgrj6WsyDXbD3jJbGoQvUh2rI5hKRCKZA86nlMEFnai1KDRenUrDEqLRT07zisbSBg6mNMGJuMkeRB03cMZCZBAaV9BBf3ZBZCtqHcSwRdV17vMbf6D`
    });
    return this.http.post<any>(this.apiWhatsappUrl, form, { headers });
  }

}
