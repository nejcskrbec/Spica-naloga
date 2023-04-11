import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, catchError, retry, tap} from "rxjs";

import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl: string = 'https://api4.allhours.com//api/v1';

  constructor(
    private authorizationService: AuthorizationService,
    private http: HttpClient
  ) {}

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error.error.message || error.statusText);
  }

  public getUsers(): Observable<any[]> {
    const url: string = `${this.apiUrl}/Users`;
    const headers = new HttpHeaders({
      'authorization': `Bearer ${this.authorizationService.getToken()?.access_token}`,
      'content-type': 'application/json'
    });
    return this.http.get<any[]>(url, { headers })
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  public getUsersBySearch(searchTerm: string): Observable<any[]> {
    const url: string = `${this.apiUrl}/Users/Query?searchTerm=${searchTerm}`;
    const headers = new HttpHeaders({
      'authorization': `Bearer ${this.authorizationService.getToken()?.access_token}`,
      'content-type': 'application/json'
    });
    return this.http.get<any[]>(url, { headers })
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  postUser(user: any): Observable<any> {
    const url: string = `${this.apiUrl}/Users`;
    let body = user;
    const headers = new HttpHeaders({
      'authorization': `Bearer ${this.authorizationService.getToken()?.access_token}`,
      'content-type': 'application/json'
    });
    return this.http
      .post<any>(url, body, { headers })
      .pipe(retry(1), catchError(this.handleError));
  }

  public getAbsences(): Observable<any[]> {
    const url: string = `${this.apiUrl}/AbsenceDefinitions`;
    const headers = new HttpHeaders({
      'authorization': `Bearer ${this.authorizationService.getToken()?.access_token}`,
      'content-type': 'application/json'
    });
    return this.http.get<any[]>(url, { headers })
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  postAbsence(absence: any): Observable<any> {
    const url: string = `${this.apiUrl}/Absences`;
    let body = absence;
    const headers = new HttpHeaders({
      'authorization': `Bearer ${this.authorizationService.getToken()?.access_token}`,
      'content-type': 'application/json'
    });
    return this.http
      .post<any>(url, body, { headers })
      .pipe(retry(1), catchError(this.handleError));
  }

}
