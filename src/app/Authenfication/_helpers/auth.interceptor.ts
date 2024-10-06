
import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHeaderResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import * as alertifyjs from 'alertifyjs'
import { TokenStorageService } from '../_services/token-storage.service';
import { Observable, Subject, catchError, map, throwError } from 'rxjs';

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
  backendDown: Boolean = false;
  private lastNotificationTime = 0;
  private errorSubject = new Subject<HttpErrorResponse>();
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let authReq = req;
    const token = this.token.getToken();
    this.langSession = sessionStorage.getItem("lang")

    if (token != null) {
      authReq = req.clone({ headers: req.headers.set("Authorization", 'Bearer ' + token) });
      authReq = req.clone({ headers: req.headers.set("Accept-Language", this.langSession) });
    }

    return next.handle(authReq)

      .pipe(


        map((event: any) => {

          if (event.status < 200 || event.status >= 300) {
            return throwError(event);
          }

          return event;
        }),

        catchError((response: HttpErrorResponse) => {

          if (response.status === 401) {
            this.handleBackendError401(response)
          } else if (response.status === 500) {
            this.handleBackendError500(response);
          } else if (response.status === 404) {
            this.handleBackendError404(response);
          } else if (response.status === 409) {
            this.handleBackendError409(response)
          }




          return throwError("Error Not Exist!");
        }

        )
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
      alertifyjs.set('notifier', 'position', 'top-left');
      alertifyjs.notify(
        '<img  style="width: 30px; height: 30px; margin: 0px 0px 0px 15px" src="/assets/files/images/backend.gif" alt="image" >' +
        ` Error Backend`
      );
    }
  }

  private handleBackendError401(error: HttpErrorResponse) {
    const currentTime = Date.now();
    if (currentTime - this.lastNotificationTime > 2000) { // Only notify every 2 seconds
      this.lastNotificationTime = currentTime;
      alertifyjs.set('notifier', 'position', 'top-left');
      alertifyjs.notify('<img  style="width: 30px; height: 30px; margin: 0px 0px 0px 15px" src="/assets/files/images/expSession.png" alt="image" >' + ` Expired session`);
      this.openModalComponent();
    }
  }
  private handleBackendError409(errorResp: HttpErrorResponse) {
    const currentTime = Date.now();
    if (currentTime - this.lastNotificationTime > 2000) { // Only notify every 2 seconds
      this.lastNotificationTime = currentTime;
      alertifyjs.set('notifier', 'position', 'top-left');
      alertifyjs.notify('<img  style="width: 30px; height: 30px; margin: 0px 0px 0px 15px" src="/assets/files/images/error.gif" alt="image" >' + errorResp.error.description);
    
    }
  }

  private handleBackendError404(errorResp: HttpErrorResponse) {
    const currentTime = Date.now();
    if (currentTime - this.lastNotificationTime > 2000) { // Only notify every 2 seconds
      this.lastNotificationTime = currentTime;
      alertifyjs.set('notifier', 'position', 'top-left');
      alertifyjs.notify('<img  style="width: 30px; height: 30px; margin: 0px 0px 0px 15px" src="/assets/files/images/error.gif" alt="image" >' + errorResp.error.error);

    }
  }

}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];