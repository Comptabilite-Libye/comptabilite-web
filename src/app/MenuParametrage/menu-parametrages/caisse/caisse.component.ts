import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { catchError, throwError } from 'rxjs';
import { Table } from 'primeng/table';

import * as alertifyjs from 'alertifyjs'
import { Caisse, Devise, TypeCaisse } from '../domaine/domaine';
import { ParametrageService } from '../WService/parametrage.service';
import { LoadingComponent } from 'src/app/Shared/loading/loading.component'; 
import { Router } from '@angular/router';


declare const PDFObject: any;

@Component({
  selector: 'app-caisse',
  templateUrl: './caisse.component.html',
  styleUrls: ['./caisse.component.css', '.../../../src/assets/files/css/style.css'], providers: [ConfirmationService, MessageService]
})
export class CaisseComponent implements OnInit {
  IsLoading = true;
  openModal!: boolean;
  constructor(private router: Router  , private loadingComponent: LoadingComponent, private confirmationService: ConfirmationService, private param_service: ParametrageService, private messageService: MessageService, private http: HttpClient, private fb: FormBuilder ) {

  }


 
  pdfData!: Blob;
  ngOnInit(): void {
    this.GelAllCaisse();
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
        // this.isLoading = false;
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
    this.designationAr = '';
    this.designationLt = '';
    this.actif = false;
    this.visible = false;
    this.codeSaisie = '';
    this.selectedDevise = '';
    this.selectedTypeCaisse = '';
    this.onRowUnselect(event);
  }

  clearSelected(): void {
    this.code == undefined;
    this.codeSaisie = '';
    this.designationAr = '';
    this.designationLt = '';
    this.actif = false;
    this.visible = false;
    this.selectedDevise = '';
    this.selectedTypeCaisse = '';
  }

  onRowSelect(event: any) {
    this.code = event.data.code;
    this.actif = event.data.actif;
    this.visible = event.data.visible;
    this.codeSaisie = event.data.codeSaisie;
    this.designationAr = event.data.designationAr;
    this.designationLt = event.data.designationLt;
    this.selectedDevise = event.data.codeDevise;
    this.selectedTypeCaisse = event.data.codeTypeCaisse;

    console.log('vtData : ', event);
  }
  onRowUnselect(event: any) {
    console.log('row unselect : ', event);
    this.code = event.data = null;
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
  designationAr: string = 'NULL';
  designationLt: string = "NULL";
  actif!: boolean;
  visible!: boolean;

  selectedCaisse!: Caisse;




  DeleteCaisse(code: any) {
    this.param_service.DeleteCaisse(code) .subscribe(
      (res: any) => {
        alertifyjs.set('notifier', 'position', 'top-left');
        alertifyjs.success('<i class="success fa fa-chevron-down" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + "تم الحذف");

        this.ngOnInit();
        this.check_actif = true;
        this.check_inactif = false;
        this.visDelete = false;
      }
    )
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
      this.GetDevise();
      this.GetlTypeCaisse();
      this.actif = false;
      this.visible = false;
      this.visibleModal = true;
      this.code == undefined;

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

        this.GetDevise();
        this.visibleModal = true;
        this.onRowSelect;

        this.GetlTypeCaisse();

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
      this.formHeader = "Imprimer Liste Caisse"
      this.visibleModalPrint = true;
      this.RemplirePrint();


    }

  }


  currentDate = new Date();

  datform = new Date();
  PostCaisse() {
    let userSession = sessionStorage.getItem("userName");
    if (!this.designationAr || !this.designationLt || !this.codeSaisie || !this.selectedTypeCaisse) {
      alertifyjs.set('notifier', 'position', 'top-left');
      alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + " Field Required");
    } else {
      let body = {
        codeSaisie: this.codeSaisie,
        designationAr: this.designationAr,
        designationLt: this.designationLt,
        userCreate: userSession,
        codeDevise: this.selectedDevise,
        dateCreate: new Date().toISOString(), //
        code: this.code,
        actif: this.actif,
        codeTypeCaisse: this.selectedTypeCaisse

      }
      if (this.code != null) {
        body['code'] = this.code;

        this.param_service.UpdateCaisse(body) .subscribe(

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
        this.param_service.PostCaisse(body) .subscribe(
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
  dataCaisse = new Array<Caisse>();
  content?: string;
  GelAllCaisse() {
    this.param_service.GetCaisse() .subscribe((data: any) => {
      this.loadingComponent.IsLoading = false;
      this.IsLoading = false;
      this.dataCaisse = data;
      this.onRowUnselect(event);

    })
  }



  selectedDevise: any;
  dataDevise = new Array<Devise>();
  listDevisePushed = new Array<any>();
  listDeviseRslt = new Array<any>();
  GetDevise() {
    this.param_service.GetDevise() .subscribe((data: any) => {
      this.dataDevise = data;
      this.listDevisePushed = [];
      for (let i = 0; i < this.dataDevise.length; i++) {
        this.listDevisePushed.push({ label: this.dataDevise[i].designationAr, value: this.dataDevise[i].code })
      }
      this.listDeviseRslt = this.listDevisePushed;
    })
  }


  selectedTypeCaisse: any;
  dataTypeCaisse = new Array<TypeCaisse>();
  listTypeCaissePushed = new Array<any>();
  listTypeCaisseRslt = new Array<any>();
  GetlTypeCaisse() {
    this.param_service.GetTypeCaisse() .subscribe((data: any) => {
      this.dataTypeCaisse = data;
      this.listTypeCaissePushed = [];
      for (let i = 0; i < this.dataTypeCaisse.length; i++) {
        this.listTypeCaissePushed.push({ label: this.dataTypeCaisse[i].designationAr, value: this.dataTypeCaisse[i].code })
      }
      this.listTypeCaisseRslt = this.listTypeCaissePushed;
    })
  }



}

