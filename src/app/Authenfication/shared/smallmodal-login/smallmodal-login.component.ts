import { Component, Input, OnInit } from '@angular/core';
 
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


  @Input('UserName') userName:any
  @Input('Password') password:any

  VisibileModalLogin:boolean=false;
  constructor( private modalService: BsModalService,public bsModalRef: BsModalRef,private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router ) { }

  ngOnInit(): void {
    this.visibleModalLogin=true;
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
   
    // this.alerteBac = '';
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
