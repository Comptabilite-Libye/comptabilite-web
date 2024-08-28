import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';  
import { Router } from '@angular/router'; 
import { AuthClientService } from './auth-client.service';
import { MfaVerificationResponse } from './shared/mfa-verification-response.modal';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';
  constructor(private authenticationClient: AuthClientService, private router: Router) { }

  public login(payload: MfaVerificationResponse) {
    if(payload.tokenValid && !payload.mfaRequired){
      localStorage.clear();
      localStorage.setItem(this.tokenKey, payload.jwt);
    }
  }

  public navidateToHome(): void {
    this.router.navigate(['/']);
  }

  public register(payload: string): void {
    this.authenticationClient
      .register(payload)
      .subscribe((mfaQR:any) => {
        let parsed = JSON.parse(mfaQR);
        //localStorage.setItem(this.tokenKey, token);
        this.router.navigate(['/qr', {'qrCode': parsed.qrCode, 'qrCodeKey': parsed.mfaCode}]);
      });
  }

  public logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }
}
