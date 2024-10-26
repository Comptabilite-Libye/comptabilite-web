import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { catchError, throwError } from 'rxjs';
import { ParametrageService } from 'src/app/MenuParametrage/menu-parametrages/WService/parametrage.service';
import { EncryptionService } from 'src/app/Shared/EcrypteService/EncryptionService';

@Component({
  selector: 'app-menu-recettes',
  templateUrl: './menu-recettes.component.html',
  styleUrls: ['./menu-recettes.component.css', '.../../../src/assets/files/css/StyleMenu.css']
})
export class MenuRecettesComponent implements OnInit {
  items: MenuItem[] | undefined;
  encryptedValue: string = '';
  constructor(private encryptionService: EncryptionService, private paramServie: ParametrageService) {

  }
  ngOnInit(): void {


    this.PasswordAnnulApprouvAC();
    this.PasswordAnnulApprouvTc();

  }



  PasswordAnnulApprouvAC() {
    let PasswordAnnuleApprouveX = sessionStorage.getItem("PasswordAnnuleApprouve");

    if (PasswordAnnuleApprouveX == "" || PasswordAnnuleApprouveX == null  ) {
      this.paramServie.getParams("PassAnnullApprouveAC").subscribe(

        (res: any) => {
          let pass = res.valeur;
          this.encryptedValue = this.encryptionService.encrypt(pass);
          sessionStorage.setItem("PasswordAnnuleApprouve", this.encryptedValue);
        }
      )
    } else {

    }

  }


  PasswordAnnulApprouvTc() {
    let PassAnnullApprouveTCX = sessionStorage.getItem("PassAnnApprouveTC");

    if (PassAnnullApprouveTCX == "" || PassAnnullApprouveTCX == null  ) {
      this.paramServie.getParams("PassAnnullApprouveTC").subscribe(

        (res: any) => {
          let pass = res.valeur;
          this.encryptedValue = this.encryptionService.encrypt(pass);
          sessionStorage.setItem("PassAnnApprouveTC", this.encryptedValue);
        }
      )
    }else{

    }
    
  }

}