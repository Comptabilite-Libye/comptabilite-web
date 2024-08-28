import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import * as alertifyjs from 'alertifyjs'
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

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.reloadCurrentRoute();
    }
  }

  onSubmit(): void {
    const { userName, password } = this.form;

    this.authService.login(userName, password).subscribe(
      data => {
        console.log("data", data)
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        sessionStorage.setItem("userName", userName);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();


      },
      err => {

        // this.errorMessage = err.error;
        this.isLoginFailed = true;
        alertifyjs.set('notifier', 'position', 'top-left');
        alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + `Login Failed`);

        // console.log("errrrrrrrrr", err.error.description)
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
    // this.reloadCurrentRoute();
    this.router.navigate(['home']);
  }

  reloadCurrentRoute() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {

      this.router.navigate(['home']);
    });
  }
}
