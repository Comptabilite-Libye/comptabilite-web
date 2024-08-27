import { Component, OnInit } from '@angular/core'; 
import { TokenStorageService } from './Authenfication/_services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(private tokenStorageService: TokenStorageService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.liveClock();
    this.MethodeVisbileNavBars();
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      // this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      // this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
  }
  

  

  disabled: boolean = false;
  
  getvaluesFromLocalStorage() {
    var count=0;
     var intervalId = setInterval(() => {
      if ( sessionStorage.getItem("auth-user") == ''  ) {
        this.disabled = false
      } else {
        this.disabled = true
      }
      
    //   count=count+1;
    // if (count==1000) clearInterval(intervalId);
    // console.log("timer stoped" ) 
    }, 100);
     

 
  }

  UserConnected:any;
  liveDateTime = new Date();
  liveClock() {
    setInterval(() => {
      this.liveDateTime = new Date();
    }, 1000);
  }visibleModalLogOut: boolean = false;
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
  //   this.router.navigateByUrl('', {skipLocationChange: true}).then(() => {
  //     this.router.navigate(['']);
  // });
  this.reloadPage();
    this.router.navigate(['/login'], { relativeTo: this.route })
   

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
