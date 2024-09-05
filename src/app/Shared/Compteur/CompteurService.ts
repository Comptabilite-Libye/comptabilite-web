import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

import * as alertifyjs from 'alertifyjs'
@Injectable({
  providedIn: 'root'
})
export class CompteurService {


  constructor(private http: HttpClient) { }

  getAuthorizationHeaders() {
    const token = sessionStorage.getItem('auth-token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }


  GetcompteurCodeSaisie(compteur: string): Observable<any> { 
    return this.http.get(`${environment.API_Parametrage}compteur/`+compteur , {
      headers: this.getAuthorizationHeaders()
    });
  }

   

}