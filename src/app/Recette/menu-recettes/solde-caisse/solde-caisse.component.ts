 
import { Component, EventEmitter, Output, } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { catchError, take, throwError } from 'rxjs';
import { Table } from 'primeng/table';

import * as alertifyjs from 'alertifyjs'
import { SoldeCaisse } from '../domaine/domaine'; 
import { LoadingComponent } from 'src/app/Shared/loading/loading.component';  
import { RecetteServiceService } from '../WsRecette/recette-service.service';
import { Router } from '@angular/router';

declare const PDFObject: any;

@Component({
  selector: 'app-solde-caisse',
  templateUrl: './solde-caisse.component.html',
  styleUrls: ['./solde-caisse.component.css', '.../../../src/assets/files/css/style.css'], providers: [ConfirmationService, MessageService]
})
export class SoldeCaisseComponent {

  openModal!: boolean;
  IsLoading = true; 
  constructor(private router: Router  , private loadingComponent: LoadingComponent, private recette_service: RecetteServiceService) {
  } 
  isLoading = false;
 
  ngOnInit(): void {
    
    this.GelAllSoldeCaisse();
   

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
  dataSoldeCaisse = new Array<SoldeCaisse>();
  selectedSoldeCaisse: any;
  
  searchTerm = '';
  GelAllSoldeCaisse() {
    this.recette_service.GetAllSoldeCaisse() .subscribe((data: any) => {

      this.loadingComponent.IsLoading = false;
      this.IsLoading = false;

      this.dataSoldeCaisse = data; 
      this.onRowUnselect(event);
      // let debit = data.debit;
      // let credit = data.credit;
      // let sold = +debit + -credit;
      this.soldeCaisse = data.credit;

    })
  }
  code!: number | null;
  onRowUnselect(event: any) {
    console.log('row unselect : ', event);
    this.code = event.data = null;
  }

  soldeCaisse:any;

  GetSoldeCaisse(){

  }
 
}
