import { ErrorHandler, Injectable } from '@angular/core';
import { Subject, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class ClientErrorService implements ErrorHandler {
  private clientErrorSub$ = new Subject<any>();
  constructor(private alertService: AlertService) {
    this.clientErrorSub$
      .asObservable()
      .pipe(
        switchMap((error: any) => {
          this.alertService.pushAlert({
            message: `We faced some issues trying to execute your request. Please try sometime later`,
            type: 'error',
            remove: false,
          });
          return of(error);
        })
      )
      .subscribe();
  }

  handleError(error: Error): void {
    console.log('error handled by global error handler', error);
    this.clientErrorSub$.next(error);
  }
}
