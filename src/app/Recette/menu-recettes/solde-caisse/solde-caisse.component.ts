 
import { Component, } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { catchError, take, throwError } from 'rxjs';
import { Table } from 'primeng/table';

import * as alertifyjs from 'alertifyjs'
import { SoldeCaisse } from '../domaine/domaine';
import { RecetteServiceService } from '../../WsRecette/recette-service.service'; 
import { LoadingComponent } from 'src/app/Shared/loading/loading.component'; 
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/Shared/TranslateError/error-handler-service.service';

declare const PDFObject: any;

@Component({
  selector: 'app-solde-caisse',
  templateUrl: './solde-caisse.component.html',
  styleUrls: ['./solde-caisse.component.css', '.../../../src/assets/files/css/style.css'], providers: [ConfirmationService, MessageService]
})
export class SoldeCaisseComponent {

  openModal!: boolean;
  IsLoading = true; 
  constructor(  private errorHandler: ErrorHandlerService, private loadingComponent: LoadingComponent, private recette_service: RecetteServiceService) {
  } 
  isLoading = false;
 
  ngOnInit(): void {
    
    this.GelAllSoldeCaisse();
   

  }  

  clear(table: Table) {
    table.clear();
    this.searchTerm = '';
  }
  dataSoldeCaisse = new Array<SoldeCaisse>();
  selectedSoldeCaisse: any;
  
  searchTerm = '';
  GelAllSoldeCaisse() {
    this.recette_service.GetAllSoldeCaisse().pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        this.errorHandler.handleError(error); 
        return throwError(errorMessage);
      })

    ).subscribe((data: any) => {

      this.loadingComponent.IsLoading = false;
      this.IsLoading = false;

      this.dataSoldeCaisse = data; 
      this.onRowUnselect(event);

    })
  }
  code!: number | null;
  onRowUnselect(event: any) {
    console.log('row unselect : ', event);
    this.code = event.data = null;
  }
 
}
