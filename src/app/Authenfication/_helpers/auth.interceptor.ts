
import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHeaderResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import * as alertifyjs from 'alertifyjs'
import { TokenStorageService } from '../_services/token-storage.service';
import { BehaviorSubject, Observable, Subject, catchError, filter, map, switchMap, take, throwError } from 'rxjs';

import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { ModalService } from '../shared/modal/modal.service';
import { ModalContentComponent } from '../shared/modal-content/modal-content.component';
import { SessionComponent } from 'src/app/Shared/Session/Session.component';
import { MatDialog } from '@angular/material/dialog';


const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public dialog: MatDialog, private modalService: ModalService, private token: TokenStorageService, private router: Router, private route: ActivatedRoute) { }
  langSession: any;
  tokens: any;
  backendDown: Boolean = false;
  private lastNotificationTime = 0;
  private errorSubject = new Subject<HttpErrorResponse>();
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

 
    this.tokens = this.token.getToken();
    this.langSession = sessionStorage.getItem("lang")
    const currentUrl = window.location.pathname;

    if (this.tokens != null) {
       
      if (currentUrl !== '/login') {
        req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.tokens) });
      } 

      
  
      req = req.clone({ headers: req.headers.set("Accept-Language", this.langSession) });
      req = req.clone({ headers: req.headers.set("Login-Page", "Yes") });
      req = req.clone({ headers: req.headers.set('cache-control', 'no-cache') });
      req = req.clone({ headers: req.headers.set('Access-Control-Allow-Origin', '*') });
      req = req.clone({ headers: req.headers.set("Access-Control-Allow-Methods", "POST, GET, PUT") });
      req = req.clone({ headers: req.headers.set("Access-Control-Allow-Headers", "Content-Type") });
     
    }
    
    return next.handle(req) 
      .pipe( 
        
        map((event: any) => {

          if (event.status < 200 || event.status >= 300) {
            return throwError(event);
          }

         

          return event;
        }),

        catchError((response: HttpErrorResponse) => {

          if (response.status === 401) {
            this.handleBackendError401(req, response);
          } else if (response.status === 500) {
            this.handleBackendError500(response);
          } else if (response.status === 404) {
            this.handleBackendError404(response);
          } else if (response.status === 409) {
            this.handleBackendError409(response)
          }
          else if (response.status === 400) {
            this.handleBackendError400(response)
          }




          return throwError("Error Not Exist!");
        }

        )
      );
    // req = this.addAuthorization(req, this.tokens);
    // return next.handle(req).pipe(catchError(error => {
    //   if (error instanceof HttpErrorResponse && error.status === 401) {
    //     // const tokenExpired = error.headers.get('token-expired');
    //     // if (tokenExpired) {
    //       return this.handle401Error(req, next);
    //     // }

    //     // this.authService.logout();
    //     return throwError(error);
    //   } else {
    //     return throwError(error);
    //   }
    // }));

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


  openModalComponent() {
    this.modalService.open(ModalContentComponent, {
      ignoreBackdropClick: true,
      backdrop: 'static',
      keyboard: false,
      focus: true,
      disableClose: true,
    });

  }

  close() {
    this.modalService.close();
  }

  private handleBackendError500(error: HttpErrorResponse) {
    const currentTime = Date.now();
    if (currentTime - this.lastNotificationTime > 2000) { // Only notify every 2 seconds
      this.lastNotificationTime = currentTime;

      if( error.error?.description != undefined){
        alertifyjs.set('notifier', 'position', 'top-left');
        alertifyjs.notify('<img  style="width: 30px; height: 30px; margin: 0px 0px 0px 15px" src="/assets/files/images/error.gif" alt="image" >' + error.error?.description);
  
      }else{
        alertifyjs.set('notifier', 'position', 'top-left');
        alertifyjs.notify(
          '<img  style="width: 30px; height: 30px; margin: 0px 0px 0px 15px" src="/assets/files/images/backend.gif" alt="image" >' +
          ` Error Backend`
        );
      }
      
    }
  }

  private handleBackendError401(request: HttpRequest<any>,errorResp: HttpErrorResponse) {
    const currentTime = Date.now();
    if (currentTime - this.lastNotificationTime > 2000) { // Only notify every 2 seconds
      this.lastNotificationTime = currentTime;
      alertifyjs.set('notifier', 'position', 'top-left');
      alertifyjs.notify('<img  style="width: 30px; height: 30px; margin: 0px 0px 0px 15px" src="/assets/files/images/expSession.png" alt="image" >'  + errorResp.error?.description);
      const currentUrl = window.location.pathname;
      
      if (currentUrl !== '/login') {
        this.openModalComponent();
      } 

    }
  } 
 

  // private handleRefreshToken() {
  //   this.token.refreshToken2()
  //     .subscribe(
  //       (response) => {
  //         // Update the access token in local storage and authService
  //         // this.setToken(response.accessToken);
  //         // Retry the original request
  //         // this.tokens
  //         console.log("responseee from refresh token", response.accessToken);

  //         // ... 
  //       },
  //       (error) => {
  //         // Handle error (e.g., log, clear tokens, redirect)
  //         // ...
  //       }
  //     );
  // }

  private handleBackendError409(errorResp: HttpErrorResponse) {
    const currentTime = Date.now();
    if (currentTime - this.lastNotificationTime > 2000) { // Only notify every 2 seconds
      this.lastNotificationTime = currentTime;
      alertifyjs.set('notifier', 'position', 'top-left');

      if(errorResp.error?.description == null ){
        alertifyjs.notify('<img  style="width: 30px; height: 30px; margin: 0px 0px 0px 15px" src="/assets/files/images/error.gif" alt="image" >' + errorResp.error?.fieldErrors[0].objectName);

      }else{

        alertifyjs.notify('<img  style="width: 30px; height: 30px; margin: 0px 0px 0px 15px" src="/assets/files/images/error.gif" alt="image" >' + errorResp.error?.description);

      }

    }
  }

  private handleBackendError400(errorResp: HttpErrorResponse) {
    const currentTime = Date.now();
    if (currentTime - this.lastNotificationTime > 2000) { // Only notify every 2 seconds
      this.lastNotificationTime = currentTime;
      alertifyjs.set('notifier', 'position', 'top-left');

     
        alertifyjs.notify('<img  style="width: 30px; height: 30px; margin: 0px 0px 0px 15px" src="/assets/files/images/error.gif" alt="image" >' + errorResp.error?.fieldErrors[0].field +' '+ errorResp.error?.fieldErrors[0].message + ' From Core ');

  

    }
  }

  private handleBackendError404(errorResp: HttpErrorResponse) {
    const currentTime = Date.now();
    if (currentTime - this.lastNotificationTime > 2000) { // Only notify every 2 seconds
      this.lastNotificationTime = currentTime;
      alertifyjs.set('notifier', 'position', 'top-left');
      alertifyjs.notify('<img  style="width: 30px; height: 30px; margin: 0px 0px 0px 15px" src="/assets/files/images/error.gif" alt="image" >' + errorResp.error?.error);

    }
  }



}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];