import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import * as alertifyjs from 'alertifyjs'
import { ParametrageService } from 'src/app/MenuParametrage/WService/parametrage.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { EncryptionService } from 'src/app/Shared/EcrypteService/EncryptionService';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    userName: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }
  countries: any;

  selectedCountry: any;

  ngOnInit(): void {


    this.countries = [
      { name: 'Ar', code: 'LY', value: "ar" },
      { name: 'Eng', code: 'US', value: "en" },
      { name: 'Fr', code: 'FR', value: "fr" }

    ];
    this.selectedCountry = this.countries[0];
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.reloadCurrentRoute();
    }

  }
  playSoundError() {
    let audio = new Audio();
    audio.src = "../assets/son/erro.mp3";
    audio.load();
    audio.play();
  }
  onSubmit(): void {
    const { userName, password } = this.form;

    this.authService.login(userName, password).subscribe(
      data => {
        console.log("data", data);
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);

        sessionStorage.setItem("userName", userName);

        sessionStorage.setItem("lang", this.selectedCountry.value);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        // this.roles = this.tokenStorage.getUser().roles;

        this.reloadPage();



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

  reloadPage(): void {
    window.location.reload();
    this.router.navigate(['home']);

  }

  reloadCurrentRoute() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {

      this.router.navigate(['home']);
    });
  }



}
