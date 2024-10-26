import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component,  ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import {   FormBuilder  } from '@angular/forms';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { catchError, throwError  } from 'rxjs';
import { Table } from 'primeng/table';

import * as alertifyjs from 'alertifyjs'  
import { Fournisseur } from '../domaine/domaine';
import { ParametrageService } from '../WService/parametrage.service';
import { LoadingComponent } from 'src/app/Shared/loading/loading.component'; 
import { Router } from '@angular/router';
 
declare const PDFObject: any;
@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css',  '.../../../src/assets/files/css/style.css'], providers: [ConfirmationService, MessageService]

})
export class FournisseurComponent {

  IsLoading = true; 
  openModal!: boolean;


  constructor(private router: Router  ,private loadingComponent : LoadingComponent,private confirmationService: ConfirmationService, private param_service: ParametrageService, private messageService: MessageService, private http: HttpClient, private fb: FormBuilder, private cdr: ChangeDetectorRef) {


  }  
  pdfData!: Blob;
  isLoading = false;
  ngOnInit(): void {

    this.GelAllFournisseur();  
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

  clearForm() {
    this.code == undefined;
    this.designationAr = '';
    this.designationLt = '';
    this.actif = false;
    this.visible = false;
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
  designationAr: string = 'NULL';
  designationLt: string = "NULL";  
  actif!: boolean;
  visible!: boolean;
  
  selectedFournisseur!: Fournisseur; 


  onRowSelect(event: any) {
    this.code = event.data.code;
    this.actif = event.data.actif;
    this.visible = event.data.visible;
    this.codeSaisie = event.data.codeSaisie;
    this.designationAr = event.data.designationAr;
    this.designationLt = event.data.designationLt; 

    console.log('vtData : ', event);
  }
  onRowUnselect(event: any) {
    console.log('row unselect : ', event);
    this.code = event.data = null;
  }

 

  DeleteFournisseur(code: any) {
    this.param_service.DeleteFournisseur(code) .subscribe(
      (res:any) => {
        alertifyjs.set('notifier', 'position', 'top-left');
        alertifyjs.success('<i class="success fa fa-chevron-down" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + "Success Deleted");

        this.ngOnInit();
        this.check_actif = true;
        this.check_inactif = false;
        this.visDelete = false;

      }
    )
  }
  clearSelected(): void {
    this.code == undefined;
    this.codeSaisie = '';
    this.designationAr = '';
    this.designationLt = '';
    this.actif = false; 
    this.visible = false; 
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
        let el = <HTMLInputElement>document.getElementById('codeSaisie');
      if (el != null) {
        el.disabled = true;
      }
        this.visibleModal = true;
        this.onRowSelect;

      }

    }

    if (mode === 'Delete') {

      if (this.code == undefined) {
        this.onRowUnselect;
        alertifyjs.set('notifier', 'position', 'top-left'); 
        alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px  !important;"></i>'  + " Choise A row Please");

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
      this.formHeader = "Imprimer Liste Fournisseur"
      this.visibleModalPrint = true;
      this.RemplirePrint();
 

    }

  }

    
  userCreate = "soufien";
  // datecreate !: Date;
  currentDate = new Date(); 
 
  datform = new Date();
  PostFournisseur() {
    

    if (!this.designationAr || !this.designationLt || !this.codeSaisie) {
      alertifyjs.set('notifier', 'position', 'top-left');
      alertifyjs.notify('<img  style="width: 30px; height: 30px; margin: 0px 0px 0px 15px" src="/assets/files/images/required.gif" alt="image" >' + "Field Required");

    } else {


      let body = {
        codeSaisie: this.codeSaisie,
        designationAr: this.designationAr,
        designationLt: this.designationLt, 
        userCreate: this.userCreate,

        dateCreate: new Date().toISOString(), //
        code: this.code,
        actif: this.actif,
        visible: this.visible,

      }
      if (this.code != null) {
        body['code'] = this.code;

        this.param_service.UpdateFournisseur(body).subscribe(

          (res: any) => {
            alertifyjs.set('notifier', 'position', 'top-left');
                        alertifyjs.notify('<img  style="width: 30px; height: 30px; margin: 0px 0px 0px 15px" src="/assets/files/images/ok.png" alt="image" >' + "تم التحيين");

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
        this.param_service.PostFournisseur(body) .subscribe(
          (res:any) => {
            alertifyjs.set('notifier', 'position', 'top-left'); 
            alertifyjs.notify('<img  style="width: 30px; height: 30px; margin: 0px 0px 0px 15px" src="/assets/files/images/ok.png" alt="image" >' + "تم الحفظ بنجاح");
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
  dataFournisseur = new Array<Fournisseur>(); 
  GelAllFournisseur() {
    this.param_service.GetFournisseur() .subscribe((data: any) => {
      this.loadingComponent.IsLoading = false;
      this.IsLoading = false;


      this.dataFournisseur = data;
      this.onRowUnselect(event);
 
    }) 
  }

}

