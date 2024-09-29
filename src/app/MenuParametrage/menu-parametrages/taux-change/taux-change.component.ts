import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';
import { Table } from 'primeng/table';

import * as alertifyjs from 'alertifyjs'
import { Devise, TauxDeChange } from '../domaine/domaine';
import { ParametrageService } from '../WService/parametrage.service';
import { LoadingComponent } from 'src/app/Shared/loading/loading.component'; 
import { Router } from '@angular/router';


declare const PDFObject: any;
@Component({
  selector: 'app-taux-change',
  templateUrl: './taux-change.component.html',
  styleUrls: ['./taux-change.component.css', '.../../../src/assets/files/css/style.css'], providers: [ConfirmationService, MessageService]
})
export class TauxChangeComponent {

  IsLoading = true;
  openModal!: boolean;


  constructor(private router: Router  ,private loadingComponent: LoadingComponent, private confirmationService: ConfirmationService, private param_service: ParametrageService, private messageService: MessageService, private http: HttpClient, private fb: FormBuilder, private cdr: ChangeDetectorRef) {


  }
  pdfData!: Blob; 
  ngOnInit(): void {

    this.GelTauxDeChange();



  } 
   @Output() closed: EventEmitter<string> = new EventEmitter();
  closeThisComponent() { 
      const parentUrl = this.router.url.split('/').slice(0, -1).join('/'); 
      this.closed.emit(parentUrl); 
      this.router.navigate([parentUrl]);
  }


  RemplirePrint(): void {

    this.param_service.getPDFf().subscribe((blob: Blob) => {
      const reader = new FileReader();
      const binaryString = reader.readAsDataURL(blob);
      reader.onload = (event: any) => {
        //Here you can do whatever you want with the base64 String
        // console.log("File in Base64: ", event.target.result);
        this.pdfData = event.target.result; 
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

  clearForm() {
    this.code == undefined;
    this.tauxChange = '';
    this.codeSaisie = '';
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
  tauxChange: string = '0';
  DisCodeSaisie: boolean = false;
  selectedTauxDeChange!: TauxDeChange;
  onRowSelect(event: any) {
    this.code = event.data.code;
    this.codeSaisie = event.data.codeSaisie;
    this.tauxChange = event.data.tauxChange;
    this.selectedDevise = event.data.codeDevise;

    console.log('vtData : ', event);
  }
  onRowUnselect(event: any) {
    console.log('row unselect : ', event);
    this.code = event.data = null;
  }



  clearSelected(): void {
    this.code == undefined;
    this.codeSaisie = '';
    this.tauxChange = '';
    this.selectedDevise = '';
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

      this.GetDeviseByHasNotTaux();

    }
    if (mode === 'edit') {


      if (this.code == undefined) {
        this.clearForm();
        this.onRowUnselect(event);
        alertifyjs.set('notifier', 'position', 'top-left');
        alertifyjs.error("Choise A row Please");
        this.visDelete == false && this.visibleModal == false
      } else {

        button.setAttribute('data-target', '#Modal');
        this.formHeader = "تعديل"
        this.onRowSelect;
        this.GetDeviseByCode(this.selectedDevise);
        this.DisCodeSaisie = true;
        this.visibleModal = true;


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

        }
      }

    }

    if (mode === 'Print') {


      button.setAttribute('data-target', '#ModalPrint');
      this.formHeader = "طباعة"
      this.visibleModalPrint = true;
      this.RemplirePrint();


    }

  }

  CloseModalPrint() {
    this.visibleModalPrint = false;
  }
  currentDate = new Date();

  datform = new Date();
  PostTauxDeChange() {
    let userSession = sessionStorage.getItem("userName");

    if (!this.tauxChange || !this.codeSaisie) {
      alertifyjs.set('notifier', 'position', 'top-left');
      alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + " Field Required");

    } else {


      let body = {
        codeSaisie: this.codeSaisie,
        tauxChange: this.tauxChange,
        userCreate: userSession,
        codeDevise: this.selectedDevise,
        dateCreate: new Date().toISOString(), //
        code: this.code,

      }
      if (this.code != null) {
        body['code'] = this.code;

        this.param_service.UpdateTauxDeChange(body) .subscribe(

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
        this.param_service.PostTauxDeChange(body) .subscribe(
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

          }
        )
      }
    }


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
  dataTauxDeChange = new Array<TauxDeChange>();
  GelTauxDeChange() {
    this.param_service.GetTauxDeChange() .subscribe((data: any) => {

      this.loadingComponent.IsLoading = false;
      this.IsLoading = false;

      this.dataTauxDeChange = data;
      this.onRowUnselect(event);

    })
  }



  selectedDevise: any;
  dataDevise = new Array<Devise>();
  listDevisePushed = new Array<any>();
  listDeviseRslt = new Array<any>();
  GetDeviseByHasNotTaux() {
    this.param_service.GetDeviseByHasNotTaux() .subscribe((data: any) => {
      this.dataDevise = data;
      this.listDevisePushed = [];
      for (let i = 0; i < this.dataDevise.length; i++) {
        this.listDevisePushed.push({ label: this.dataDevise[i].designationAr, value: this.dataDevise[i].code })
      }
      this.listDeviseRslt = this.listDevisePushed;
    })
  }


  // dataDeviseByCode = new Array<Devise>();
  // listDeviseByCodePushed = new Array<any>();
  GetDeviseByCode(code: number) {
    this.param_service.GetDeviseByCode(code) .subscribe((data: any) => {
      this.dataDevise = data;
      this.listDevisePushed = [];
        this.listDevisePushed.push({ label: data.designationAr, value: data.code })
     
      this.listDeviseRslt = this.listDevisePushed;
    })
  }


}


