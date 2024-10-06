import { Component, EventEmitter, OnInit, Output, } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

import * as alertifyjs from 'alertifyjs'
import { LoadingComponent } from 'src/app/Shared/loading/loading.component';
import { MouvementCaisse } from '../domaine/domaine';
import { Router } from '@angular/router';
import { RecetteServiceService } from '../WsRecette/recette-service.service';
import { Caisse } from 'src/app/MenuParametrage/menu-parametrages/domaine/domaine';
import { ParametrageService } from 'src/app/MenuParametrage/menu-parametrages/WService/parametrage.service';
@Component({
  selector: 'app-mouvement-caisse',
  templateUrl: './mouvement-caisse.component.html',
  styleUrls: ['./mouvement-caisse.component.css', '.../../../src/assets/files/css/style.css'], providers: [ConfirmationService, MessageService]
})
export class MouvementCaisseComponent implements OnInit {

  openModal!: boolean;
  IsLoading = true;
  constructor(private paramService: ParametrageService, private recette_service: RecetteServiceService, private router: Router, private loadingComponent: LoadingComponent) {
  }
  isLoading = false;

  ngOnInit(): void {
    this.GetCaisse();
    // this.GelMouvmenetCaisseByCodeCaisse(this.selectedCaisse);
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
  dataMouvementCaisse = new Array<MouvementCaisse>();
  selectedTransfertCaisse: any;

  searchTerm = '';
  GelMouvmenetCaisseByCodeCaisse(codeCaisse:number) {
    // if (this.selectedCaisse == null || this.selectedCaisse == undefined) {
    //   this.loadingComponent.IsLoading = false;
    //   this.IsLoading = false;
    // } else {
      this.recette_service.GetMouvementCaisseByCodeCaisse(codeCaisse).subscribe((data: any) => {

        this.loadingComponent.IsLoading = false;
        this.IsLoading = false;
        this.dataMouvementCaisse = data;


      });
    // }


  }

  selectedCaisse: any;
  dataCaisse = new Array<Caisse>();
  listCaissePushed = new Array<any>();
  listCaisseRslt = new Array<any>();
  GetCaisse() {
    this.paramService.GetCaisse().subscribe((data: any) => {
      this.dataCaisse = data;
      // this.selectedCaisse = data[0].code;
      this.listCaissePushed = [];
      for (let i = 0; i < this.dataCaisse.length; i++) {
        this.listCaissePushed.push({ label: this.dataCaisse[i].designationAr, value: this.dataCaisse[i].code })
      }
      this.listCaisseRslt = this.listCaissePushed;
      this.selectedCaisse = this.dataCaisse[0].code;
      this. GelMouvmenetCaisseByCodeCaisse(this.selectedCaisse);
    })
  }

}
