import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { catchError, throwError } from 'rxjs';
import { EncryptionService } from 'src/app/Shared/EcrypteService/EncryptionService';

import * as alertifyjs from 'alertifyjs'
import { ParametrageService } from 'src/app/MenuParametrage/menu-parametrages/WService/parametrage.service';
import { ErrorHandlerService } from 'src/app/Shared/TranslateError/error-handler-service.service';
@Component({
  selector: 'app-menu-recette',
  templateUrl: './menu-recette.component.html',
  styleUrls: ['./menu-recette.component.css', '.../../../src/assets/files/css/StyleMenu.css']
})
export class MenuRecetteComponent implements OnInit {
  items: MenuItem[] | undefined;
  encryptedValue: string = '';
  constructor(private errorHandler: ErrorHandlerService,private encryptionService: EncryptionService, private paramServie: ParametrageService) {

  }
  ngOnInit(): void {
    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Refresh',
            icon: 'pi pi-refresh'
          },
          {
            label: 'Export',
            icon: 'pi pi-upload'
          }
        ]
      }
    ];

    this.PasswordAnnulApprouvAC();
    this.PasswordAnnulApprouvTc();

  }



  PasswordAnnulApprouvAC() {
    this.paramServie.getParams("PassAnnullApprouveAC").pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        this.errorHandler.handleError(error); 
        return throwError(errorMessage);
      })

    ).subscribe(

      (res: any) => {
        let pass = res.valeur;
        this.encryptedValue = this.encryptionService.encrypt(pass);
        sessionStorage.setItem("PasswordAnnuleApprouve", this.encryptedValue);
      }
    )
  }


  PasswordAnnulApprouvTc() {
    this.paramServie.getParams("PassAnnullApprouveTC").pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        this.errorHandler.handleError(error); 
        return throwError(errorMessage);
      })

    ).subscribe(

      (res: any) => {
        let pass = res.valeur;
        this.encryptedValue = this.encryptionService.encrypt(pass);
        sessionStorage.setItem("PassAnnApprouveTC", this.encryptedValue);
      }
    )
  }
}
