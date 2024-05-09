import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public apiUrl = 'https://dummyapi.com';
  public tokenKey = 'ionPOC_auth_token';

  constructor(private http: HttpClient, private route: Router) {}

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http
      .post<any>(
        `${this.apiUrl}/auth/login`,
        { username, password },
        { headers }
      )
      .pipe(
        catchError(async (error: HttpErrorResponse) => {
          if (error.status === 0 || error.status === 403) {
            console.log('CORS error. Returning dummy success response.');
            await localStorage.setItem(
              this.tokenKey,
              'abjkasbdjkbasjdbakbkasasdasdadkjbakdbab'
            );
            return of({ success: true, message: 'Dummy success response' });
          } else {
            throw error;
          }
        })
      );
  }

  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.route.navigate(['/login']);
  }
}
