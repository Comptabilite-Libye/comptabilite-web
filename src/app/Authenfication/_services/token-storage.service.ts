import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
 
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
   
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  private tokenExpirationSubject = new BehaviorSubject<null>(null);
  tokenExpiration$ = this.tokenExpirationSubject.asObservable();

  // ... other authentication methods
  token :any ;
  isTokenExpired(): boolean {
    this.token = this.getToken(); // Get token
    if (this.token) {
      const tokenExpiration = new Date(this.token.exp * 1000); // Assuming exp is in seconds
      return new Date() >= tokenExpiration;
    }
    return true; // Consider token expired if it's not found
  }

  onTokenExpired(): void {
    this.tokenExpirationSubject.next(null); // Emit event
  }
}
