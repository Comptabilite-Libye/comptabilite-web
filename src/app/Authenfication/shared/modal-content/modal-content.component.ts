import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { TokenStorageService } from '../../_services/token-storage.service';

import * as alertifyjs from 'alertifyjs'
import { ModalService } from '../modal/modal.service';
@Component({
  selector: 'app-modal-content',  
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.css']
})
export class ModalContentComponent implements OnInit {
  constructor( private modalService: ModalService,private authService: AuthService, private router: Router, private tokenStorage: TokenStorageService,
  ){

  }
  ngOnInit(): void {
   console.log('Componens Open')
  }
  visibleModalLogin:boolean =true;
  
  form: any = {
    userName: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  countries: any; 
  selectedCountry: any;
  onSubmit(): void {
    const { userName, password } = this.form;

    this.authService.login(userName, password).subscribe(
      data => {
        // sessionStorage.removeItem("auth-user");
        // sessionStorage.removeItem("userName");
        // sessionStorage.removeItem("auth-token");
        console.log("data", data);
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);

        sessionStorage.setItem("userName", userName);

        // sessionStorage.setItem("lang", this.selectedCountry.value);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        // this.roles = this.tok 
        this.onClose();

      },
      err => {
        if ([500].includes(err.status)) {
          alertifyjs.set('notifier', 'position', 'top-left');
          alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + ` Service Core Not Available 503`);
          this.playSoundError();
        }


        this.isLoginFailed = true;

      }
    );
  }
  onClose() {
    // outside click
    this.modalService.close();
  }
  playSoundError() {
    let audio = new Audio();
    audio.src = "../assets/son/erro.mp3";
    audio.load();
    audio.play();
  }
 
}
