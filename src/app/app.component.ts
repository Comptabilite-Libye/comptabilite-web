import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TokenStorageService } from './Authenfication/_services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './Authenfication/_services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { IdleService } from './idle.service';
import { environment } from 'src/environments/environment.development';
import { ModalContentComponent } from './Authenfication/shared/modal-content/modal-content.component';
import { ModalService } from './Authenfication/shared/modal/modal.service';
// import { BreadcrumbService } from './Authenfication/service/breadcrumb.service';


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
  sessionExpired: boolean = false;
  inactivityTimeout!: number;
  constructor(private idleService: IdleService,
    private modalService: ModalService,
    private readonly translate: TranslateService, private authService: AuthService, private tokenStorageService: TokenStorageService, private router: Router, private route: ActivatedRoute) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
 
  }

  ngOnInit(): void {


    if (sessionStorage.length == 0 || sessionStorage.getItem("auth-token") == "") {
      this.tokenStorageService.signOut();
      // window.location.reload();
      sessionStorage.clear();
      this.router.navigate(['/login'], { relativeTo: this.route });
    } else {
    }

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
    } 
 this.initialIdleSettings();
  }
  private initialIdleSettings() {
    const idleTimeoutInSeconds: number = environment.idleTimeInMinutes * 60;
    this.idleService.startWatching(idleTimeoutInSeconds).subscribe((isTimeOut: boolean) => {
       if (isTimeOut) {
        console.log("isTimeOut");
        if(!window.location.hash.includes('login')){
        // this.openModalComponent();
        }
      } 
    });
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
  // breadcrumbs$ = this.breadcrumbService.breadcrumbs$;

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

  showChildComponent: boolean = true;

  handleComponentClose() {
    this.showChildComponent = false; // Hide the child component
  }



}


