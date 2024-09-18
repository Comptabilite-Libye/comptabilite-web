import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MfaVerificationResponse } from './shared/mfa-verification-response.modal';
import { MfaVerificationRequest } from './shared/mfa-verification-request.model';
import { environment } from '../../environments/environment.development';
 

@Injectable({
  providedIn: 'root'
})
export class AuthClientService {
  

  constructor(private http: HttpClient) { }

  public login(payload: string): Observable<MfaVerificationResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<MfaVerificationResponse>(
      environment.apiUrl + '/login', payload, httpOptions
    );
  }

  public verifyTotp(payload: MfaVerificationRequest): Observable<MfaVerificationResponse> {
    return this.http.post<MfaVerificationResponse>(
      environment.apiUrl + '/verifyTotp', payload
    );
  }

  public register(
    payload: string
  ): Observable<string> {
    return this.http.post(
      environment.apiUrl + '/register',payload,
      { responseType: 'text' }
    );
  }
}
