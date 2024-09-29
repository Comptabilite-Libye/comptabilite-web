import { Injectable } from '@angular/core';
import { timer, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class IdleService {

  private idleTimeout = 1000 * 60 * 3; // 5 minutes
  private idleTimer: any;
  private mouseMoveSubject = new Subject<void>();
  private idleSubject = new Subject<boolean>();

  constructor() {
    this.startWatching();
  }

  public startWatching() {
    console.log("StartWatching");
    // Start the idle timer when the service is initialized
    this.resetIdleTimer();

    // Listen for mouse movements and reset the idle timer
    document.addEventListener('mousemove', () => {
      this.resetIdleTimer();
    });

 
    // Listen for idle events and update the expiration token
    this.idleSubject
      .pipe(takeUntil(this.mouseMoveSubject))
      .subscribe(isIdle => {
        if (isIdle) {
          // Call your backend endpoint to update the expiration token
          this.updateTokenOnBackend();
        }
      });
  }

  private resetIdleTimer() {
    clearTimeout(this.idleTimer);
    this.idleTimer = setTimeout(() => {
      // Emit an idle event when the timeout is reached
      this.idleSubject.next(true);
    }, this.idleTimeout);
  }

  // Placeholder for the backend call to update the expiration token
  private updateTokenOnBackend() {
    // Make an HTTP request to your Spring Boot backend
    // For example:
    // this.http.post('/api/auth/update-token', {})
    //   .subscribe(
    //     (response) => {
    //       // Update the user's token
    //       // ...
    //     },
    //     (error) => {
    //       // Handle errors
    //       // ...
    //     }
    //   );
  }

  // Function to stop watching for mouse movements
  stopWatching() {
    this.mouseMoveSubject.next();
    console.log("stopWatching");
  }
}