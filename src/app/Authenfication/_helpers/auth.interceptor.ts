import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from '../_services/token-storage.service';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';


const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end
// const TOKEN_HEADER_KEY = 'x-access-token';   // for Node.js Express back-end

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService, private auth: AuthService, private router: Router,private route: ActivatedRoute) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      // for Spring Boot back-end
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });

      // for Node.js Express back-end
      // authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) });
    }
    return next.handle(authReq)

      // .pipe(catchError(error => {
      //   if (error.status == 401 && !this.isLoginPage(authReq)) {
      //     this.auth.logout();
      //   }
      //   const errMsg = error.error.description  ;
      //   return throwError(() => errMsg);
      // }));;

      // .pipe(
      //   catchError((err : HttpErrorResponse) => {
      //    if (errorObj instanceof HttpErrorResponse) {
      //     if (errorObj.status === 0) {
      //       return throwError('Unable to Connect to the Server');
      //     }
      //    }
      //   }));

      .pipe(catchError(err => {
        if ([401, 403].includes(err.status)) {
          // auto logout if 401 or 403 response returned from api
          // this.auth.logout();
          console.log("Ssssssssssssssss")
          this.LogOut();
        }

        const error = err.error?.message || err.statusText;
        console.error(err);
        return throwError(() => error);

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
