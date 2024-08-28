import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from '../_services/token-storage.service';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import * as alertifyjs from 'alertifyjs'  
const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end
// const TOKEN_HEADER_KEY = 'x-access-token';   // for Node.js Express back-end

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService , private auth : AuthService) { }

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

      .pipe(
          catchError((error: HttpErrorResponse) => {
            let errorMessage = '';
            if (error.error instanceof ErrorEvent) if (error.status === 0) {
                    return throwError('Unable to Connect to the Server');
                  } else {
              alertifyjs.set('notifier', 'position', 'top-left');
              alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + ` xxxxxxx` );
            }
            return throwError(errorMessage);
          })
    
        )
  }
  private isLoginPage(request: HttpRequest<any>) {
    return request.url.includes("/login");
  }
  
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
