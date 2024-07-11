import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.url_base}/auth-token/`;

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials).pipe(
      tap(response => {
        if (response && response.token) {
          sessionStorage.setItem('token', response.token);
        }
      })
    );
  }

  logout(): void {
    sessionStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }
}
