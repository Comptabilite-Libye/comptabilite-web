
import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHeaderResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import * as alertifyjs from 'alertifyjs'
import { TokenStorageService } from '../_services/token-storage.service';
import { Observable, catchError, throwError } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';


const TOKEN_HEADER_KEY = 'Authorization';    

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor( private token: TokenStorageService, private router: Router, private route: ActivatedRoute) { }
  langSession : any;
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     
    let authReq = req;
    const token = this.token.getToken();
  this.langSession = sessionStorage.getItem("lang")

    if (token != null) {
      authReq = req.clone({ headers: req.headers.set("Authorization", 'Bearer ' + token) }); 
      authReq = req.clone({ headers: req.headers.set("Accept-Language",this.langSession) }); 
    }  
    
    return next.handle(authReq) 
      .pipe(catchError(err => {

        
          if ([403].includes(err.status)) {
            this.LogOut();
          } else if ([401].includes(err.status)) {
            alertifyjs.set('notifier', 'position', 'top-left');
            alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + ` ${err.error?.error}`);
            // this.LogOut();
      
          }  else if (err.size ==0){
            console.log("Web Interrompue")

          }
        
        
          
        return throwError(() => err); 
      })
      );
  } 
  LogOut() { 
    sessionStorage.clear();
    this.reloadPage();
    this.router.navigate(['/login'], { relativeTo: this.route }) 
  }
  reloadPage() {
    setTimeout(() => {
      window.location.reload();
    }, 10);
  }

}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];