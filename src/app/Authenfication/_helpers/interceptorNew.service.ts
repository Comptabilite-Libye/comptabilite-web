import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators'; 
import { AlertService } from '../alert.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(private alertService: AlertService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(req).pipe(
      // Filter for HttpResponse events
      filter(event => event instanceof HttpResponse),
      map((response: HttpResponse<any>) => {
        if (
          req.method !== 'GET' &&
          req.method !== 'HEAD' &&
          req.method !== 'OPTIONS'
        ) {
          //show a success alert message for certain request methods
          this.alertService.pushAlert({
            message: response.body
              ? response.body.description
              : response.statusText,
            type: 'success',
            remove: false,
          });
        }
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        //logic for handling errors;
        return this.handleError(error);
      })
    );
  }

  handleError(error: HttpErrorResponse) {
    console.log(error);
    if (error.status !== 0) {
      //server side http errors
      if (
        error.status !== 400
        //few more codes
      ) {
        //common errors
        this.alertService.pushAlert({
          message: `Request failed with status code ${error.status}- ${
            error.statusText
          }-${error.error ? error.error.description : error.message}`,
          type: 'error',
          remove: false,
        });
        return EMPTY;
      } else {
        return throwError(error); //handle this error uniquely in the component
      }
    } else {
      //client side http errors
      if (!navigator.onLine) {
        this.alertService.pushAlert({
          message: `You are not online!`,
          type: 'error',
          remove: false,
        });
        return EMPTY;
      }
      //throw other errors to the component for the developer to rectify
      return throwError(
        `Request failed with status code ${error.status}- ${error.statusText}-${
          error.error ? error.error.description : error.message
        }`
      );
    }
  }
}
