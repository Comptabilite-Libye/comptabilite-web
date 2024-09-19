import { Component, EventEmitter, OnInit, Output, } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { catchError, take, throwError } from 'rxjs';
import { Table } from 'primeng/table';

import * as alertifyjs from 'alertifyjs'  
import { LoadingComponent } from 'src/app/Shared/loading/loading.component'; 
import { ErrorHandlerService } from 'src/app/Shared/TranslateError/error-handler-service.service';
import { TransfertCaisse } from '../domaine/domaine'; 
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mouvement-caisse',
  templateUrl: './mouvement-caisse.component.html',
  styleUrls: ['./mouvement-caisse.component.css', '.../../../src/assets/files/css/style.css'], providers: [ConfirmationService, MessageService]
})
export class MouvementCaisseComponent implements OnInit {

  openModal!: boolean;
  IsLoading = true; 
  constructor( private router: Router , private loadingComponent: LoadingComponent) {
  } 
  isLoading = false;
 
  ngOnInit(): void {
    
    this.GelAllTransfertCaisse(); 
  }  
  @Output() closed: EventEmitter<string> = new EventEmitter();
  closeThisComponent() { 
      const parentUrl = this.router.url.split('/').slice(0, -1).join('/'); 
      this.closed.emit(parentUrl); 
      this.router.navigate([parentUrl]);
  }

  clear(table: Table) {
    table.clear();
    this.searchTerm = '';
  }
  dataTransfertCaisse = new Array<TransfertCaisse>();
  selectedTransfertCaisse: any;
  
  searchTerm = '';
  GelAllTransfertCaisse() {
    // this.recette_service.GetAllTransfertCaisse().pipe(
    //   catchError((error: HttpErrorResponse) => {
    //     let errorMessage = '';

    // this.errorHandler.handleError(error); 
    //     return throwError(errorMessage);
    //   })

    // ).subscribe((data: any) => {

      this.loadingComponent.IsLoading = false;
      this.IsLoading = false;

    //   this.dataTransfertCaisse = data;
    //   this.codeSaisieSorted = data.codeSaisie;
    //   this.onRowUnselect(event);

    // })
  }
  
 
}
