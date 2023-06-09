import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../shared/classes/storage';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, catchError, retry, tap} from "rxjs";

import { Credentials } from '../shared/classes/credentials';
import { AuthResponse } from '../shared/classes/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  apiUrl: string = 'https://login.allhours.com/connect/token';

  constructor(
    @Inject(BROWSER_STORAGE)
    private storage: Storage,
    private http: HttpClient
  ) { }

  private callAuthApi(
    credentials: Credentials
  ): Observable<AuthResponse> {
    console.log(credentials.client_id);
    console.log(credentials.client_secret);
    const url: string = `${this.apiUrl}`;
    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('client_id', credentials.client_id);
    body.set('client_secret', credentials.client_secret);
    body.set('scope', 'api');
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.http.post<AuthResponse>(url, body.toString(), { headers })
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error.error.message || error.statusText);
  }

  public authorize(credentials: Credentials): Observable<AuthResponse> {
    return this.callAuthApi(credentials).pipe(
      tap((authResponse: AuthResponse) => {
        this.saveToken(authResponse);
      })
    );
  }

  public getToken(): any {
    const token = this.storage.getItem("authorization-token");
    if (token) {
      const parsedToken = JSON.parse(token, (key, value) => {
        if (key === "expires_in") {
          return new Date(value);
        }
        return value;
      });
      return parsedToken;
    }
    return null;
  }
  
  public saveToken(token: AuthResponse): void {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);
    const newToken = {
      access_token: token.access_token,
      expires_in: expiresAt,
    };
    console.log(newToken.expires_in)
    this.storage.setItem("authorization-token", JSON.stringify(newToken));
  }
  
}
