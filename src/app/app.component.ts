import { Component, OnInit,ViewEncapsulation  } from '@angular/core';
import { TokenStorageService } from './Authenfication/_services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs'; 
import { AuthService } from './Authenfication/_services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  eventBusSub?: Subscription;
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(private authService: AuthService, private tokenStorageService: TokenStorageService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {




    
    // this.liveClock();
    // this.MethodeVisbileNavBars();
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles; 
      this.username = user.username;
    } 
  }


  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.tokenStorageService.signOut();

        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  disabled: boolean = false;

  getvaluesFromLocalStorage() {
    var count = 0;
    var intervalId = setInterval(() => {
      if (sessionStorage.getItem("auth-user") == '') {
        this.disabled = false
      } else {
        this.disabled = true
      }

      //   count=count+1;
      // if (count==1000) clearInterval(intervalId);
      // console.log("timer stoped" ) 
    }, 10);



  }

  UserConnected: any;
  liveDateTime = new Date();
  visibleModalLogOut: boolean = false;
  formHeader = ".....";
  public onOpenModal(mode: string) {

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'LogOut') {


      button.setAttribute('data-target', '#ModalLogOut');
      this.formHeader = "Log Out"
      this.visibleModalLogOut = true;


    }

  }
  reloadPage() {
    setTimeout(() => {
      window.location.reload();
    }, 10);
  }
  LogOut() {

    this.tokenStorageService.signOut();
    window.location.reload();
    sessionStorage.clear();
    this.reloadPage();
    this.router.navigate(['/login'], { relativeTo: this.route });


  }
  VisibleBarTime: boolean = false;
  MethodeVisbileNavBars() {
    var count = 0;
    var intervalId = setInterval(() => {
      if (sessionStorage.getItem("auth-user") == null || sessionStorage.getItem("auth-user") == '') {
        this.VisibleBarTime = false;
      } else {
        this.VisibleBarTime = true;
        this.UserConnected = sessionStorage.getItem("userName");
      }
      count = count + 1;
      if (count == 1000) clearInterval(intervalId);
    }, 10);
  }
}
