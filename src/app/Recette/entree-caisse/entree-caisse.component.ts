import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { catchError, take, throwError } from 'rxjs';
import { Table } from 'primeng/table';

import * as alertifyjs from 'alertifyjs'
import { AlimentationCaisse } from '../domaine/domaine';
import { RecetteServiceService } from '../WsRecette/recette-service.service';
import { ParametrageService } from '../../MenuParametrage/WService/parametrage.service'
import { Caisse, Devise } from '../../MenuParametrage/domaine/domaine';
import { LoadingComponent } from 'src/app/Shared/loading/loading.component';
import { CompteurService } from 'src/app/Shared/Compteur/CompteurService';
import { Compteur } from 'src/app/Shared/Compteur/domaine';
import { Router } from '@angular/router';
declare const PDFObject: any;
@Component({
  selector: 'app-entree-caisse',
  templateUrl: './entree-caisse.component.html',
  styleUrls: ['./entree-caisse.component.css', '.../../../src/assets/files/css/style.css'], providers: [ConfirmationService, MessageService]
})
export class EntreeCaisseComponent {

  openModal!: boolean;
  IsLoading = true;
  DisPrint: boolean = true;
  constructor(private router: Router, private loadingComponent: LoadingComponent, private recette_service: RecetteServiceService, private CompteurService: CompteurService, private paramService: ParametrageService) {
  }
  pdfData!: Blob;
  isLoading = false;
  ngOnInit(): void {
    this.GelAllAlimentationCaisse();
    this.Voids();

  }
  DataCodeSaisie = new Array<Compteur>();
  GetCodeSaisie() {
    this.CompteurService.GetcompteurCodeSaisie("CodeSaisieAC").pipe(
      take(2),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        alertifyjs.set('notifier', 'position', 'top-left');
        alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + ` ${error.error?.detail}`);

        return throwError(errorMessage);
      })
    ).
      subscribe((data: any) => {
        this.DataCodeSaisie = data;
        this.codeSaisie = data.prefixe + data.suffixe;
      })
  }

  RemplirePrint(code: any): void {


    this.recette_service.GetEditionAlimentCaissePDFf(code).subscribe((blob: Blob) => {
      const reader = new FileReader();
      const binaryString = reader.readAsDataURL(blob);
      reader.onload = (event: any) => {
        //Here you can do whatever you want with the base64 String
        // console.log("File in Base64: ", event.target.result);

        this.pdfData = event.target.result;
        this.isLoading = false;
        if (this.pdfData) {
          this.handleRenderPdf(this.pdfData);
        }
      };

      reader.onerror = (event: any) => {
        console.log("File could not be read: " + event.target.error.code);
      };
    });





  }

  handleRenderPdf(data: any) {
    const pdfObject = PDFObject.embed(data, '#pdfContainer');
  }


  clear(table: Table) {
    table.clear();
    this.searchTerm = '';
  }

  CloseModalPrint() {
    this.visibleModalPrint = false;

  }
  clearForm() {
    this.code == undefined;
    this.observation = '';
    this.montant = '';
    this.codeSaisie = '';
    this.pdfData = new Blob();
    this.selectedAlimentationCaisse = new Array<any>();
    this.selectedCaisse = '';
    this.selectedDevise = '';
    this.selectedTypeRecette = '';
    this.selectedModeReglement='';
    this.onRowUnselect(event);


  }
  check_actif = false;
  check_inactif = false;

  formHeader = ".....";
  searchTerm = '';
  visibleModal: boolean = false;
  visibleModalPrint: boolean = false;
  visDelete: boolean = false;
  code!: number | null;
  codeSaisie: any;
  observation: string = 'NULL';
  montant: string = '0';
  montantDevise: string="0"


  selectedAlimentationCaisse: any;


  onRowSelect(event: any) {
    this.code = event.data.code;
    this.montant = event.data.montant;
    this.codeSaisie = event.data.codeSaisie;
    this.observation = event.data.observation;
    this.montant = event.data.montant;
    this.selectedDevise = event.data.codeDevise;
    this.selectedCaisse = event.data.codeCaisse;
    this.selectedTypeRecette = event.data.codeTypeRecette;
    this.DisPrint = false;
    this.selectedModeReglement = event.data.codeModeReglement; 
  }
  onRowUnselect(event: any) { 
    this.code = event.data = null;
    this.selectedAlimentationCaisse == null;
    this.DisPrint = true;
    this.selectedCaisse =''; 
    this.selectedDevise =''; 
    this.selectedModeReglement ='';
    this.selectedTypeRecette ='';
  }



  DeleteAlimentationCaisse(code: any) {
    this.recette_service.DeleteAlimentationCaisse(code).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        alertifyjs.set('notifier', 'position', 'top-left');
        alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + ` ${error.error?.detail}`);

        return throwError(errorMessage);
      })

    ).subscribe(
      (res: any) => {
        alertifyjs.set('notifier', 'position', 'top-left');
        alertifyjs.success('<i class="success fa fa-chevron-down" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + "Success Deleted");

        this.ngOnInit();
        this.check_actif = true;
        this.check_inactif = false;
        this.visDelete = false;
        this.clearForm();

      }
    )
  }
  clearSelected(): void {
    this.code == undefined;
    this.codeSaisie = '';
    this.observation = '';
    this.montant = '';
  }

  public onOpenModal(mode: string) {

    this.visibleModal = false;
    this.visDelete = false;
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#Modal');
      this.formHeader = "إضافة"
      this.onRowUnselect(event);
      this.clearSelected();
      this.visibleModal = true;
      this.code == undefined;
      this.GetCaisse();
      this.GetTypeRecette();
      this.GetDevise();
      this.GetCodeSaisie();
      this.GetModeReglement();

    }
    if (mode === 'edit') {


      if (this.code == undefined) {
        // alert("Choise A row Please");

        //  
        this.clearForm();
        this.onRowUnselect(event);
        alertifyjs.set('notifier', 'position', 'top-left');
        alertifyjs.error("Choise A row Please");
        this.visDelete == false && this.visibleModal == false
      } else {

        button.setAttribute('data-target', '#Modal');
        this.formHeader = "تعديل"

        this.visibleModal = true;
        this.onRowSelect;
        this.GetCaisse();
        this.GetTypeRecette();
        this.GetModeReglement();
        this.GetDevise();
        this.GetAlimentationCaisseByCode();
      }

    }

    if (mode === 'Delete') {

      if (this.code == undefined) {
        this.onRowUnselect;
        alertifyjs.set('notifier', 'position', 'top-left');
        alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px  !important;"></i>' + " Choise A row Please");

        this.visDelete == false && this.visibleModal == false
      } else {

        {
          button.setAttribute('data-target', '#ModalDelete');
          this.formHeader = "حذف"
          this.visDelete = true;
          
          this.onRowUnselect(event);

        }
      }

    }

    if (mode === 'Print') {


      button.setAttribute('data-target', '#ModalPrint');
      this.formHeader = "طباعة"
      this.visibleModalPrint = true;
      this.RemplirePrint(this.selectedAlimentationCaisse.code);

      this.onRowUnselect(event);

    }

  }


  userCreate = "";
  PostAlimentationCaisse() {
    let userSession = sessionStorage.getItem("userName");
    if (!this.observation || !this.codeSaisie) {
      alertifyjs.set('notifier', 'position', 'top-left');
      alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + " Field Required");
    } else {
      let body = {
        codeSaisie: this.codeSaisie,
        observation: this.observation,
        userCreate: userSession,
        dateCreate: new Date().toISOString(), //
        code: this.code,
        montant: this.montant,
        codeCaisse: this.selectedCaisse,
        codeDevise: this.selectedDevise,
        codeTypeRecette: this.selectedTypeRecette,
        codeModeReglement : this.selectedModeReglement

      }
      if (this.code != null) {
        body['code'] = this.code;
        this.recette_service.UpdateAlimentationCaisse(body).pipe(
          catchError((error: HttpErrorResponse) => {
            let errorMessage = '';
            alertifyjs.set('notifier', 'position', 'top-left');
            alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + ` ${error.error?.detail}`);

            return throwError(errorMessage);
          })
        ).subscribe(
          (res: any) => {
            alertifyjs.set('notifier', 'position', 'top-left');
            alertifyjs.success('<i class="success fa fa-chevron-down" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + "Success Updated");
            this.visibleModal = false;
            this.clearForm();
            this.ngOnInit();
            this.check_actif = true;
            this.check_inactif = false;
            this.onRowUnselect(event);
            this.clearSelected();
          }
        );
      }
      else {
        this.recette_service.PostAlimentationCaisse(body).pipe(
          catchError((error: HttpErrorResponse) => {
            let errorMessage = '';
            alertifyjs.set('notifier', 'position', 'top-left');
            alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + ` ${error.error?.detail}`);

            return throwError(errorMessage);
          })

        ).subscribe(
          (res: any) => {
            alertifyjs.set('notifier', 'position', 'top-left');
            alertifyjs.success('<i class="success fa fa-chevron-down" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + "Success Saved");
            this.visibleModal = false;
            this.clearForm();
            this.ngOnInit();
            this.code;
            this.check_actif = true;
            this.check_inactif = false;
            this.onRowUnselect(event);
            this.clearSelected();
            let NewCode = res.code;
            this.RemplirePrint(NewCode);
            this.visibleModalPrint = true;


          }
        )
      }
    }
  }


  Voids(): void {
    // this.cars = [

    // ].sort((car1, car2) => {
    //   return 0;
    // });

  }



  public remove(index: number): void {
    this.listDesig.splice(index, 1);
    console.log(index);
  }






  compteur: number = 0;
  listDesig = new Array<any>();

  // cars!: Array<Matiere>;
  // brands!: SelectItem[];
  // clonedCars: { [s: string]: Matiere } = {}; 
  dataAlimentationCaisse = new Array<AlimentationCaisse>();
  GelAllAlimentationCaisse() {
    this.recette_service.GetAllAlimentationCaisse().pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        alertifyjs.set('notifier', 'position', 'top-left');
        alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + ` ${error.error?.detail}`);

        return throwError(errorMessage);
      })

    ).subscribe((data: any) => {

      this.loadingComponent.IsLoading = false;
      this.IsLoading = false;

      this.dataAlimentationCaisse = data;
      this.onRowUnselect(event);

    })
  }

  selectedCaisse: any;
  dataCaisseDde = new Array<Caisse>();
  listCaissePushed = new Array<any>();
  listCaisseRslt = new Array<any>();
  GetCaisse() {
    this.paramService.GetCaisse().pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        alertifyjs.set('notifier', 'position', 'top-left');
        alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + ` ${error.error?.detail}`);

        return throwError(errorMessage);
      })

    ).subscribe((data: any) => {
      this.dataCaisseDde = data;
      this.listCaissePushed = [];
      for (let i = 0; i < this.dataCaisseDde.length; i++) {
        this.listCaissePushed.push({ label: this.dataCaisseDde[i].designationAr, value: this.dataCaisseDde[i].code })
      }
      this.listCaisseRslt = this.listCaissePushed;
    })
  }

  selectedTypeRecette: any;
  dataTypeRecetteDde = new Array<Caisse>();
  listTypeRecettePushed = new Array<any>();
  listTypeRecetteRslt = new Array<any>();
  GetTypeRecette() {
    this.paramService.GetTypeRecette().pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        alertifyjs.set('notifier', 'position', 'top-left');
        alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + ` ${error.error?.detail}`);

        return throwError(errorMessage);
      })
    ).subscribe((data: any) => {
      this.dataTypeRecetteDde = data;
      this.listTypeRecettePushed = [];
      for (let i = 0; i < this.dataTypeRecetteDde.length; i++) {
        this.listTypeRecettePushed.push({ label: this.dataTypeRecetteDde[i].designationAr, value: this.dataTypeRecetteDde[i].code })
      }
      this.listTypeRecetteRslt = this.listTypeRecettePushed;
    })
  }

  selectedDevise: any;
  dataDevise = new Array<Devise>();
  listDevisePushed = new Array<any>();
  listDeviseRslt = new Array<any>();
  GetDevise() {
    this.paramService.GetDevise().pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        alertifyjs.set('notifier', 'position', 'top-left');
        alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + ` ${error.error?.detail}`);

        return throwError(errorMessage);
      })
    ).subscribe((data: any) => {
      this.dataDevise = data;
      this.listDevisePushed = [];
      for (let i = 0; i < this.dataDevise.length; i++) {
        this.listDevisePushed.push({ label: this.dataDevise[i].designationAr, value: this.dataDevise[i].code })
      }
      this.listDeviseRslt = this.listDevisePushed;
    })
  }


  selectedModeReglement: any;
  dataModeReglement = new Array<Caisse>();
  listModeReglementPushed = new Array<any>();
  listModeReglementRslt = new Array<any>();
  GetModeReglement() {
    this.paramService.GetModeReglement().pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        alertifyjs.set('notifier', 'position', 'top-left');
        alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + ` ${error.error?.detail}`);

        return throwError(errorMessage);
      })

    ).subscribe((data: any) => {
      this.dataModeReglement = data;
      this.listModeReglementPushed = [];
      for (let i = 0; i < this.dataModeReglement.length; i++) {
        this.listModeReglementPushed.push({ label: this.dataModeReglement[i].designationAr, value: this.dataModeReglement[i].code })
      }
      this.listModeReglementRslt = this.listModeReglementPushed;
    })
  }


  GetAlimentationCaisseByCode() {
    this.recette_service.GetAllAlimentationCaisseByCode(this.selectedAlimentationCaisse.code).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        alertifyjs.set('notifier', 'position', 'top-left');
        alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + ` ${error.error?.detail}`);

        return throwError(errorMessage);
      })
    ).subscribe((data: any) => {  
    })
  }

  CalculTaxEchange(){
    // taux echange devise selected 
    // taux echange * ngmodel montant 

  }

}


