import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

// const AUTH_API = 'http://localhost:9090/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(userName: string, password: string): Observable<any> {
    // return this.http.get(`${environment.API_BASE_URL_ACCESS}vaccessmenuusers/findByUser?user=`+user+`&menuPere=`+menuPere );

    return this.http.post(`${environment.API_ACCESS}` + '/login', {
      userName,
      password
    }, httpOptions);
  }

  register(userName: string, email: string, password: string , fullName:string): Observable<any> {
    return this.http.post(`${environment.API_ACCESS}` + '/signup', {
      userName,
      email,
      password,
      fullName
    }, httpOptions);
  }
}
