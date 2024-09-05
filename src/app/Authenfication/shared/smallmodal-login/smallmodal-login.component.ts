import { Component, OnInit } from '@angular/core';
 
import { TokenStorageService } from '../../_services/token-storage.service';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-smallmodal-login',
  templateUrl: './smallmodal-login.component.html',
  styleUrl: './smallmodal-login.component.css'
})
export class SmallmodalLoginComponent implements OnInit {
  visibleModalLogin:boolean =false;
  form: any = {
    userName: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor( private modalService: BsModalService,public bsModalRef: BsModalRef,private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      
    }
  }

  onSubmit(): void {
    const { userName, password } = this.form;

    this.authService.login(userName, password).subscribe(
      (data:any) => {
        console.log("data", data)
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        sessionStorage.setItem("userName", userName);
       

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
       


      },
      err => { 
        this.isLoginFailed = true;
       this.visibleModalLogin = false;
      }
    );
  }

  CloseModal(){
    this.visibleModalLogin=false;
    this.reloadPage();

  }

 reloadPage(): void {
    window.location.reload();
    // this.reloadCurrentRoute();
    this.router.navigate(['login']);
  }

  reloadCurrentRoute() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {

      this.router.navigate(['home']);
    });
  }

  modalRef!: BsModalRef;
  OpenModalChargement() {
   
//     this.alerteBac = '';
// this.codeBacTab='';
    this.modalService.onShown.subscribe(() => {
      // this.alerteBac = '';
    })
    this.modalService.config = {
      ignoreBackdropClick: true,
      backdrop: 'static',
      keyboard: false,
      focus: true,
      id: 1
    }
    this.modalRef = this.modalService.show(SmallmodalLoginComponent, this.modalService.config);
    this.modalRef.content.closeBtnName = 'Annuler';
    this.modalRef.setClass('modal-lg');
    this.modalRef.content.title = 'Chargement Bac';
    // this.CodeboiteRB = "";
    
  }
}
