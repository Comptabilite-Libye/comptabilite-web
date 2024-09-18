import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import * as alertifyjs from 'alertifyjs'
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(private translateService: TranslateService) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = this.translateService.instant('error.general'); // Default message

    if (error.error) {
      // Check if there's an 'error' property in the response (Spring Boot's error object)
      if (error.error.description) {
        errorMessage = this.translateService.instant('error.backendMessage', { message: error.error.description });
      } else if (error.error.detail) {
        errorMessage = this.translateService.instant('error.backendDetail', { detail: error.error.detail });
      }
    } else {
      // Handle other potential error scenarios
      errorMessage = this.translateService.instant('error.unknown');
    }

    // Log the error for debugging purposes
    console.error('Error:', error);

    alertifyjs.set('notifier', 'position', 'top-left');
    alertifyjs.error(`<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i> ${errorMessage}`);
    this.playSoundError();
  }

  playSoundError() {
    let audio = new Audio();
    // audio.src = "../assets/son/erro.mp3";
    audio.src = "../assets/son/1080p_hd_1_2.mp3";
    audio.load();
    audio.play();
  }


}