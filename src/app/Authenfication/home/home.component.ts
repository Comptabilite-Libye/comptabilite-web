import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service'; 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  constructor(private userService: UserService,private authService: AuthService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    if(sessionStorage.length==0){
      this.logout();
    }else{ 
    }
  }

 

  isHovered11 = false;
  onHover11() {
    this.isHovered11 = true;
  }
  onLeave11() {
    this.isHovered11 = false;
  }
  GetNumber11(){
    console.log("Number11");
  }
  isHovered12 = false;
  onHover12() {
    this.isHovered12 = true;
  }
  onLeave12() {
    this.isHovered12 = false;
  }
  isHovered13 = false;
  onHover13() {
    this.isHovered13 = true;
  }
  onLeave13() {
    this.isHovered13 = false;
  }
  isHovered14 = false;
  onHover14() {
    this.isHovered14 = true;
  }
  onLeave14() {
    this.isHovered14 = false;
  }
    isHovered15 = false;
  onHover15() {
    this.isHovered15 = true;
  }
  onLeave15() {
    this.isHovered15 = false;
  }

  
  logout(): void {
    // this.authService.logout().subscribe({
    //   next: res => {
    //     console.log(res);
    //     this.tokenStorageService.signOut();

    //     window.location.reload();
    //   },
    //   error: err => {
    //     console.log(err);
    //   }
    // });
  }

    
 
 



}
