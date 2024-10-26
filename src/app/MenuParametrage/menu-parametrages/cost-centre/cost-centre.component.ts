import { HttpClient } from '@angular/common/http';
import { Component, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService, TreeNode } from 'primeng/api'; 
import { Table } from 'primeng/table'; 
import * as alertifyjs from 'alertifyjs'
import { CostCentre, TypeCostCentre } from '../domaine/domaine';
import { ParametrageService } from '../WService/parametrage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingComponent } from 'src/app/Shared/loading/loading.component';
import { Compteur } from 'src/app/Shared/Compteur/domaine';
import { CompteurService } from 'src/app/Shared/Compteur/CompteurService';

declare const PDFObject: any;

@Component({
  selector: 'app-cost-centre',
  templateUrl: './cost-centre.component.html',
  styleUrls: ['./cost-centre.component.css', '.../../../src/assets/files/css/style.css'], providers: [ConfirmationService, MessageService]
})
export class CostCentreComponent {

  IsLoading = true;
  openModal!: boolean; 



  selectedFile!: TreeNode;

  constructor(private CompteurService: CompteurService, private loadingComponent: LoadingComponent, private router: Router, private route: ActivatedRoute, private confirmationService: ConfirmationService, private param_service: ParametrageService, private messageService: MessageService, private http: HttpClient, private fb: FormBuilder, private cdr: ChangeDetectorRef) {


  }
  pdfData!: Blob;
  isLoading = false;
  ngOnInit(): void {
    this.GelAllCostCentre();
  }

  DataCodeSaisie = new Array<Compteur>();
  GetCodeSaisie() {
    this.CompteurService.GetcompteurCodeSaisie("CodeSaisieCC").
      subscribe((data: any) => {
        this.DataCodeSaisie = data;
        this.codeSaisie = data.prefixe + data.suffixe;
      })

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
    this.selectedCostCentre =null;
 
  }

  clearForm() {
    this.code == undefined;
    this.designationAr = '';
    this.designationLt = '';
    this.actif = false;
    this.codeSaisie = '';
    this.onRowUnselect(event);
    this.selectedTypeCostCentre = null;
    this.selectedParent = '';
    this.profitCentre =false;
    this.detail =false;
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
  profitCentre!: boolean; 
  detail!: boolean; 
  selectedCostCentre: any;  
 
classement : any;

DisPere : boolean = false;
  onRowSelect(event: any) {
    this.code = event.data.code;
    this.actif = event.data.actif;
    this.codeSaisie = event.data.codeSaisie;
    this.designationAr = event.data.designationAr;
    this.designationLt = event.data.designationLt;
    this.selectedTypeCostCentre = event.data.codeTypeCostCentre;
    this.profitCentre = event.data.profitCentre;
    this.detail = event.data.detail;
    this.Niveau  = event.data.niveau;
this.classement = event.data.classement;

    if(event.data.parent !=null){
      this.selectedParent =  event.data.parent.code;
    }


    // if (event.data.parent == null) {
    //   this.DisDelete = true;
    //   this.VisDeleteBtn = false;
    // } else {
    //   this.selectedParent = event.data.parent.code;
    //   this.DisDelete = false;
    //   this.VisDeleteBtn = true;
    // }
   

    console.log('vtData : ', event);
  }
  onRowUnselect(event: any) {
    console.log('row unselect : ', event);
    this.code = event.data = null;
 
    // this.selectedCostCentre == null
  }



  DeleteCostCentre(code: any) {
    this.param_service.DeleteCostCentre(code).subscribe(
      (res: any) => {
        alertifyjs.set('notifier', 'position', 'top-left');
        // alertifyjs.success('<i class="success fa fa-chevron-down" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + "Success Deleted");
        alertifyjs.notify('<img  style="width: 30px; height: 30px; margin: 0px 0px 0px 15px" src="/assets/files/images/ok.png" alt="image" >' + "تم الحذف");

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
    this.selectedCostCentre = null
 
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
      this.clearForm();
      this.GetCodeSaisie();
      this.actif = false;
      this.visibleModal = true;
      this.code == undefined;
      this.GetTypeCostCentre();
      this.GetParent();
      this.DisPere = false;

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

        this.DisPere = true;
        this.visibleModal = true;
        this.onRowSelect;
this.GetCostCentreByCode();
        this.GetParent();
        this.GetTypeCostCentre();
      }

    }

    if (mode === 'Delete') {

      if (this.code == undefined) {
        this.onRowUnselect;
        alertifyjs.set('notifier', 'position', 'top-left');
        alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + ` الرجاء إختيار سطر `);

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
      this.formHeader = "Imprimer Liste CostCentre"
      this.visibleModalPrint = true;
      this.RemplirePrint();


    }

  }


  userCreate = "soufien";
  // datecreate !: Date;
  currentDate = new Date();
  Niveau:any = 'NULL';
  VisNiveau:boolean =false;
  datform = new Date();
  PostCostCentre() { 
    if (!this.designationAr || !this.designationLt || !this.codeSaisie  ) {
      alertifyjs.set('notifier', 'position', 'top-left');
      alertifyjs.notify('<img  style="width: 30px; height: 30px; margin: 0px 0px 0px 15px" src="/assets/files/images/required.gif" alt="image" >' + "Field Required");
    } else { 
      let body = {
        codeSaisie: this.codeSaisie,
        designationAr: this.designationAr,
        designationLt: this.designationLt,
        userCreate: this.userCreate,
        codeTypeCostCentre: this.selectedTypeCostCentre,
        dateCreate: new Date().toISOString(), //
        code: this.code,
        actif: this.actif,
        parent:  {code :this.selectedParent } ,
        profitCentre: this.profitCentre ,
        detail: this.detail,
        niveau: this.Niveau ,
        classement : this.ClassTemp,
      }
      if (this.code != null) {
        body['code'] = this.code; 
        this.param_service.UpdateCostCentre(body).subscribe( 
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
            this.selectedCostCentre = null;
          }
        ); 
      }
      else {

        if(!this.selectedParent){
          alertifyjs.set('notifier', 'position', 'top-left');
          alertifyjs.notify('<img  style="width: 30px; height: 30px; margin: 0px 0px 0px 15px" src="/assets/files/images/required.gif" alt="image" >' + "Field Required");
       
        }else{

          this.param_service.PostCostCentre(body).subscribe(
            (res: any) => {
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
              this.selectedCostCentre =null;
            }
          )
        }

       
      }
    } 
  }


  compteur: number = 0;
  listDesig = new Array<any>();
  dataCostCentre = new Array<CostCentre>();
  GelAllCostCentre() {
    this.param_service.GetCostCentre().subscribe((data: any) => { 
      this.loadingComponent.IsLoading = false;
      this.IsLoading = false;
     
      

      this.dataCostCentre = data; 
      this.onRowUnselect(event); 
    })
  }



  selectedTypeCostCentre: any;
  dataTypeCostCentre = new Array<TypeCostCentre>();
  listTypeCostCentrePushed = new Array<any>();
  listTypeCostCentreRslt = new Array<any>();
  GetTypeCostCentre() {
    this.param_service.GetTypeCostCentre().subscribe((data: any) => {
      this.dataTypeCostCentre = data;
      this.listTypeCostCentrePushed = [];
      for (let i = 0; i < this.dataTypeCostCentre.length; i++) {
        this.listTypeCostCentrePushed.push({ label: this.dataTypeCostCentre[i].designationAr, value: this.dataTypeCostCentre[i].code })
      }
      this.listTypeCostCentreRslt = this.listTypeCostCentrePushed;
    })
  }


  GetCostCentreByCode(){
    this.param_service.GetCostCentreByCode(this.selectedCostCentre.code).subscribe((data: any) => {
      this.dataTypeCostCentre = data; 
    })
  }



  selectedParent: any;
  dataParent = new Array<CostCentre>();
  listParentPushed = new Array<any>();
  listParentRslt = new Array<any>();
  GetParent() {
    this.param_service.GetCostCentreDetail().subscribe((data: any) => {
      this.dataParent = data;
      this.listParentPushed = [];
      for (let i = 0; i < this.dataParent.length; i++) {
        this.listParentPushed.push({ label: this.dataParent[i].designationAr, value: this.dataParent[i].code })
      }
      this.listParentRslt = this.listParentPushed;
    })
  }

  getPicNV0() {
    return "url('assets/files/images/00.png')";
  }
  
  getPicNV1() {
    return "url('assets/files/images/11.png')";
  }

  getPicNV2() {
    return "url('assets/files/images/22.png')";
  }

  getPicNV3() {
    return "url('assets/files/images/33.png')";
  }

  getPicNV4() {
    return "url('assets/files/images/44.png')";
  }
  getPicNVNull() {
    return "url('assets/files/images/icons8-expired-48.png')";
  }

  ClassTemp:any;
  GetNiveau(){
    this.param_service.GetCostCentreByCode(this.selectedParent).subscribe((data: any) => {
      //  console.log("new niveau fo post" ,data.niveau + 1);
       this.Niveau = data.niveau + 1;
       this.ClassTemp = data.classement;
    })
  }
  
}


