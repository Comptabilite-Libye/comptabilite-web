import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { catchError, throwError } from 'rxjs';
import { ParametrageService } from 'src/app/MenuParametrage/menu-parametrages/WService/parametrage.service';
import { EncryptionService } from 'src/app/Shared/EcrypteService/EncryptionService';
import { ErrorHandlerService } from 'src/app/Shared/TranslateError/error-handler-service.service';

@Component({
  selector: 'app-menu-recettes',
  templateUrl: './menu-recettes.component.html',
  styleUrls:[ './menu-recettes.component.css', '.../../../src/assets/files/css/StyleMenu.css']
})
export class MenuRecettesComponent implements OnInit {
  items: MenuItem[] | undefined;
  encryptedValue: string = '';
  constructor(private errorHandler: ErrorHandlerService,private encryptionService: EncryptionService, private paramServie: ParametrageService) {

  }
  ngOnInit(): void {
     

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

  handleComponentClose() {
    // Logic to perform when the child component closes
    console.log("Child component closed");
  }
}