import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';

import * as alertifyjs from 'alertifyjs'
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { catchError, throwError } from 'rxjs';
import { Caisse, Devise, Fournisseur, TypeDepense } from 'src/app/MenuParametrage/menu-parametrages/domaine/domaine';
import { ParametrageService } from 'src/app/MenuParametrage/menu-parametrages/WService/parametrage.service';
import { Compteur } from 'src/app/Shared/Compteur/domaine';
import { EncryptionService } from 'src/app/Shared/EcrypteService/EncryptionService';
import { LoadingComponent } from 'src/app/Shared/loading/loading.component';
import { CompteurService } from 'src/app/Shared/Compteur/CompteurService';
import { DepenseService } from '../services/depense.service';

import { DatePipe } from '@angular/common';
import { FilterMetadata } from 'primeng/api';
import { FactureFournisseur } from '../domaine/domaine';
interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}


declare const PDFObject: any;
@Component({
  selector: 'app-reglement-facture-fournisseur',
  templateUrl: './reglement-facture-fournisseur.component.html',
  styleUrls: ['./reglement-facture-fournisseur.component.css', '.../../../src/assets/files/css/style.css'], providers: [ConfirmationService, MessageService]
})
export class ReglementFactureFournisseurComponent {
  dateFactureFournisseur: any;
  openModal!: boolean;
  IsLoading = true;
  DisPrint: boolean = true;

  numPiece:any;
  loading: boolean = true;

  constructor(public primengConfig: PrimeNGConfig, private datePipe: DatePipe, private router: Router, private encryptionService: EncryptionService, private loadingComponent: LoadingComponent, private depense_service: DepenseService, private CompteurService: CompteurService, private paramService: ParametrageService) {
    this.primengConfig.ripple = true;
    this.setLangAR();
  }

  setLangAR() {
    this.primengConfig.setTranslation(this.ar);
  }
  ar = {
    firstDayOfWeek: 6, // Sunday (Adjust based on your region's convention)
    dayNames: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    dayNamesShort: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    dayNamesMin: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    monthNames: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    monthNamesShort: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    today: 'اليوم',
    clear: 'مسح',
    apply: 'بحث',
    dateFormat: 'dd/mm/yy',
    weekHeader: 'أسبوع'
  };
  pdfData!: Blob;
  isLoading = false;
  DisDelete: boolean = false;
  DisModif: boolean = false;
  DisApprouv: boolean = false;
  items!: MenuItem[];
  playSoundError() {
    let audio = new Audio();
    // audio.src = "../assets/son/erro.mp3";
    audio.src = "../assets/son/1080p_hd_1_2.mp3";
    audio.load();
    audio.play();
  }
  playSoundSuccess() {
    let audio = new Audio();
    audio.src = "../assets/son/success.mp3";
    audio.load();
    audio.play();
  }

  first: number = 0;

  rows: number = 10;
  VisVoir: boolean = false;
  VisModif: boolean = true;
  visBtnSave: boolean = true;
  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
  }
  cols!: any[];

  ngOnInit(): void {
    this.items = [
      { label: 'إلغاء الإعتماد', icon: 'pi pi-fw pi-history', command: () => this.OpenPasswordModal('PasswordModal') },
    ];
    this.GelAllFactureFournisseur();
    this.getValued();

    this.cols = [
      { field: 'codeEtatApprouver', header: 'مأكد', width: '1%', filter: "false" },
      { field: 'codeSaisie', header: 'الرمز', width: '6%', filter: "true" },
      { field: 'fournisseurDTO.codeSaisie', header: 'رمز المورد', width: '6%', filter: "true" },
      { field: 'fournisseurDTO.designationAr', header: 'المورد', width: '10%', filter: "true" },
      { field: 'dateFactureFournisseur', header: 'تاريخ فاتورة المورد', width: '8%', filter: "true" },
      { field: 'montant', header: 'القيمة  ', width: '5%' },
      { field: 'numFactureFournisseur', header: 'رقم فاتورة المورد', width: '6%', filter: "true" },
      { field: 'deviseDTO.designationAr', header: 'العملة', width: '10%', filter: "false" },
      { field: 'dateCreate', header: 'التاريخ', width: '10%', filter: "true" },
      { field: 'dateCreate', header: ' 2 التاريخ', width: '10%', filter: "true" },
    ];

  }
  @ViewChild('dt1', { static: false }) dt1!: Table;
  filterTable(event: Event, field: string, matchMode: string) {
    const inputElement = event.target as HTMLInputElement;
    const filterValue = inputElement.value;
    this.dt1.filter(filterValue, field, matchMode);
  }



  @Output() closed: EventEmitter<string> = new EventEmitter();
  closeThisComponent() {
    const parentUrl = this.router.url.split('/').slice(0, -1).join('/');
    this.closed.emit(parentUrl);
    this.router.navigate([parentUrl]);
  }

  DataCodeSaisie = new Array<Compteur>();
  GetCodeSaisie() {
    this.CompteurService.GetcompteurCodeSaisie("CodeSaisieRF").
      subscribe((data: any) => {
        this.DataCodeSaisie = data;
        this.codeSaisie = data.prefixe + data.suffixe;
      })
  }

  RemplirePrint(code: any): void {


    // this.depense_service.GetEditionFactureFrounisseurPDFf(code).subscribe((blob: Blob) => {

    //   const reader = new FileReader();
    //   const binaryString = reader.readAsDataURL(blob);
    //   reader.onload = (event: any) => {
    //     this.pdfData = event.target.result;
    //     this.isLoading = false;
    //     if (this.pdfData) {
    //       this.handleRenderPdf(this.pdfData);
    //     }
    //   };

    //   reader.onerror = (event: any) => {
    //     console.log("File could not be read: " + event.target.error.code);

    //   };
    // });





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
    this.pdfData == null;

  }
  clearForm() {
    this.code == undefined;
    this.observation = '';
    this.montant = '';
    this.codeSaisie = '';
    this.pdfData = new Blob();
    // this.selectedFactureFournisseur = new Array<any>();
    this.selectedFournisseur = '';
    this.selectedDevise = '';
    this.selectedTypeDepense = '';
    this.Total = 0;
    this.selectedEtatApprouve = 1
    this.dateFactureFournisseur = '';
    this.MntFactFrs = '';
    this.NumFactFrs = '';
    // this.onRowUnselect(event);
    this.selectedFactureFournisseur = null
    this.FactureFournisseurTried = new Array<any>();


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
  codecostCenter: any;
  NumFactFrs: any;
  MntFactFrs: any;
  observation: string = 'NULL';
  montant: string = '0';
  TauxChange: number = 0;
  // montantEnDevise: any = 0;


  selectedFactureFournisseur: any;

  etatAprrouve: any;
  onRowSelect(event: any) {
    console.log("Data Selcted:", event.data)
    this.code = event.data.code;
    this.Total = event.data.montant;
    this.codeSaisie = event.data.codeSaisie;
    this.observation = event.data.observation;
    this.montant = event.data.montant;
    this.selectedDevise = event.data.codeDevise;
    this.selectedFournisseur = event.data.codeFournisseur;
    this.selectedTypeDepense = event.data.codeTypeDepense;
    this.DisPrint = false;
    this.selectedValue = event.data.codeEtatApprouver;
    this.NumFactFrs = event.data.numFactureFournisseur;
    this.MntFactFrs = event.data.montantFactureFrounisseur
    this.etatAprrouve = event.data.codeEtatApprouver;
    this.dateFactureFournisseur = event.data.dateFactureFournisseur;
    if (event.data.codeEtatApprouver == 2 || event.data.codeEtatApprouver == 3) {
      this.DisDelete = true;
      this.DisModif = true;
      this.DisApprouv = true;
      this.VisModif = false;
      this.VisVoir = true;


    } else {
      this.DisDelete = false;
      this.DisModif = false;
      this.DisApprouv = false;
      this.DisPrint = true;
      this.VisVoir = false;
      this.VisModif = true;
    }
  }
  onRowUnselect(event: any) {
    this.code = event.data = null;
    this.selectedFactureFournisseur == null;
    this.DisPrint = true;
    this.selectedFournisseur = '';
    this.selectedDevise = '';
    this.selectedTypeDepense = '';
    // this.montantEnDevise = 0;
    this.TauxChange = 0;
    this.observation = ""
    this.listDetailsTypeDepense = new Array<any>();
    this.selectedFactureFournisseur = null
  }



  DeleteFactureFournisseur() {
    this.depense_service.DeleteFactureFrounisseur(this.selectedFactureFournisseur.code).subscribe(
      (res: any) => {
        alertifyjs.set('notifier', 'position', 'top-left');
        alertifyjs.success('<i class="success fa fa-chevron-down" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + "Success Deleted");
        this.playSoundSuccess();
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
      this.formHeader = " إضافة إذن صرف"
      this.onRowUnselect(event);
      this.clearSelected();
      this.clearForm();
      this.visibleModal = true;
      this.code == undefined;
      this.GetCodeSaisie();
      // this.GetTypeDepense();
      this.GetFournisseur();
      this.GetDevise();
      this.columns();
    
      this.GetModeReglement();
      // this. GetCaisse();


    }
    if (mode === 'edit') {


      if (this.code == undefined || this.selectedFactureFournisseur == null) {
        // alert("Choise A row Please");

        //  
        this.selectedFactureFournisseur = null
        this.clearForm();
        this.onRowUnselect(event);
        alertifyjs.set('notifier', 'position', 'top-left');
        alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + ` الرجاء إختيار سطر `);
        this.visDelete == false && this.visibleModal == false
        this.playSoundError();
      } else if (this.selectedFactureFournisseur.codeEtatApprouver == 2) {
        alertifyjs.set('notifier', 'position', 'top-left');
        alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + ` إذن الصرف معتمد`);

      } else {

        button.setAttribute('data-target', '#Modal');
        this.formHeader = " تعديل إذن صرف"  

        this.visibleModal = true;
        this.onRowSelect;
        this.GetFournisseur();
        // this.GetTypeDepense();
        this.GetFactureFrounisseurByCode();
        this.GetDevise();
        this.GetBanque();
        this.GetModeReglement();
      this. GetCaisse();
      }

    }

    if (mode === 'Delete') {

      if (this.code == undefined) {
        this.onRowUnselect;
        alertifyjs.set('notifier', 'position', 'top-left');
        alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + ` الرجاء إختيار سطر `);
        this.playSoundError();
        this.visDelete == false && this.visibleModal == false
      } else if (this.selectedFactureFournisseur.codeEtatApprouver == 2) {
        alertifyjs.set('notifier', 'position', 'top-left');
        alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + ` إذن الصرف معتمد`);

      } else {

        {
          button.setAttribute('data-target', '#ModalDelete');
          this.formHeader = " حذف إذن صرف"
          this.visDelete = true;
          this.visibleModal = false;
          this.visbileModalPassword = false;
          this.visibleModalApprove = false;
          this.visibleModalPrint = false;

          // this.onRowUnselect(event);

        }
      }

    }

    if (mode === 'Print') {
      if (this.etatAprrouve == 1) {
        alertifyjs.set('notifier', 'position', 'top-left');
        alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + ` التحويل غير مأهل للطباعة `);
        this.playSoundError();
      } else {
        button.setAttribute('data-target', '#ModalPrint');
        this.formHeader = " طباعة إذن صرف"
        this.visibleModalPrint = true;
        this.RemplirePrint(this.selectedFactureFournisseur.code);

        this.onRowUnselect(event);
      }




    }

    if (mode === 'voir') {
      if (this.code == undefined) {
        // alert("Choise A row Please");

        //  
        this.clearForm();
        this.onRowUnselect(event);
        alertifyjs.set('notifier', 'position', 'top-left');
        alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + ` الرجاء إختيار سطر `);
        this.visDelete == false && this.visibleModal == false
        this.playSoundError();
      } else {

        button.setAttribute('data-target', '#Modal');
        this.formHeader = "عرض إذن صرف"

        this.visibleModal = true;
        this.visBtnSave = false;
        this.onRowSelect;
        this.GetFournisseur();
        this.GetTypeDepense();
        this.GetFactureFrounisseurByCode();
        this.GetDevise();
        this.GetBanque();
        this.GetModeReglement();
      this. GetCaisse();
      }
    }

  }

  GetDataFromTableEditor: any;
  final = new Array<any>();
  PostFactureFournisseur() {
    let userSession = sessionStorage.getItem("userName");
    if (!this.observation || !this.codeSaisie || !this.selectedFournisseur || !this.selectedDevise) {
      alertifyjs.set('notifier', 'position', 'top-left');
      alertifyjs.notify('<img  style="width: 30px; height: 30px; margin: 0px 0px 0px 15px" src="/assets/files/images/required.gif" alt="image" >' + "Field Required");
      this.playSoundError();

    } else {

      for (let y = 0; y < this.listDetailsTypeDepense.length; y++) {
        this.GetDataFromTableEditor = {
          codeTypeDepense: this.listDetailsTypeDepense[y].code,
          codeCategorieDepense: 3,
          montant: this.listDetailsTypeDepense[y].montant,
          userCreate: userSession
        }
        this.final.push(this.GetDataFromTableEditor);
      }

      let body = {
        codeSaisie: this.codeSaisie,
        observation: this.observation,
        userCreate: userSession,
        dateCreate: new Date().toISOString(), //
        code: this.code,
        montant: this.Total,
        codeFournisseur: this.selectedFournisseur,
        codeDevise: this.selectedDevise,
        codeEtatApprouver: 1,
        detailsFactureFournisseursDTOs: this.final,
        numFactureFournisseur: this.NumFactFrs,
        dateFactureFournisseur: this.dateFactureFournisseur,
        montantFactureFrounisseur: this.MntFactFrs,
        codeCategorieDepense: 3
      }
      if (this.code != null) {
        body['code'] = this.code;
        this.depense_service.UpdateFactureFrounisseur(body).subscribe(
          (res: any) => {
            alertifyjs.set('notifier', 'position', 'top-left');
                        alertifyjs.notify('<img  style="width: 30px; height: 30px; margin: 0px 0px 0px 15px" src="/assets/files/images/ok.png" alt="image" >' + "تم التحيين");

            this.visibleModal = false;
            this.playSoundSuccess();
            this.clearForm();
            this.ngOnInit();
            this.check_actif = true;
            this.check_inactif = false;
            this.onRowUnselect(event);
            this.clearSelected();
            this.final = new Array<any>();
          }
        );
      }
      else {
        this.depense_service.PostFactureFrounisseur(body).pipe(
          catchError((error: HttpErrorResponse) => {
            let errorMessage = '';
            this.final = new Array<any>();
            return throwError(errorMessage);
          })

        ).subscribe(
          (res: any) => {
            alertifyjs.set('notifier', 'position', 'top-left');
            alertifyjs.notify('<img  style="width: 30px; height: 30px; margin: 0px 0px 0px 15px" src="/assets/files/images/ok.png" alt="image" >' + "تم الحفظ بنجاح");
            this.visibleModal = false;
            this.playSoundSuccess();
            this.clearForm();
            this.ngOnInit();
            this.code;
            this.check_actif = true;
            this.check_inactif = false;
            this.onRowUnselect(event);
            this.clearSelected();
            // let NewCode = res.code;
            // this.RemplirePrint(NewCode);
            // this.visibleModalPrint = true;
            this.final = new Array<any>();

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
    this.listDetailsTypeDepense.splice(index, 1);
    console.log(index);
  }






  compteur: number = 0;
  listDesig = new Array<any>();

  // onCheckboxChange(event: any, taskId: number): void {
  //   const taskIndex = this.dataFactureFournisseur.findIndex(task => task.code === taskId);
  //   if (taskIndex !== -1) {
  //     this.dataFactureFournisseur[taskIndex].completed = event.checked;
  //     console.log("Data selected from tabs" ,taskIndex )
  //   }
  // }


  dataFactureFournisseur = new Array<FactureFournisseur>();
  listCodeSaisie = new Array<any>();
  codeSaisieSorted: any;
  GelAllFactureFournisseur() {
    this.loading = true;
    this.depense_service.GetAllFactFrs().subscribe((data: any) => {
      this.loadingComponent.IsLoading = false;
      this.IsLoading = false;
      this.loading = false;
      this.dataFactureFournisseur = data;
      this.listCodeSaisie = data;
      this.codeSaisieSorted = data.codeSaisie;
      this.onRowUnselect(event);
      this.selectedFactureFournisseur = null
      // this.dataFactureFournisseur.checked=false;

    })


  }




  selectedFournisseur: any;
  dataFournisseur = new Array<Fournisseur>();
  listFournisseurPushed = new Array<any>();
  listFournisseurRslt = new Array<any>();
  GetFournisseur() {
    this.paramService.GetFournisseur().subscribe((data: any) => {
      this.dataFournisseur = data;
      this.listFournisseurPushed = [];
      for (let i = 0; i < this.dataFournisseur.length; i++) {
        this.listFournisseurPushed.push({ label: this.dataFournisseur[i].designationAr, value: this.dataFournisseur[i].code })
      }
      this.listFournisseurRslt = this.listFournisseurPushed;
    })
  }



  selectedDevise: any;
  dataDevise = new Array<Devise>();
  listDevisePushed = new Array<any>();
  listDeviseRslt = new Array<any>();
  GetDevise() {
    this.paramService.GetDevise().subscribe((data: any) => {
      this.dataDevise = data;
      this.listDevisePushed = [];
      for (let i = 0; i < this.dataDevise.length; i++) {
        this.listDevisePushed.push({ label: this.dataDevise[i].designationAr, value: this.dataDevise[i].code })
      }
      this.listDeviseRslt = this.listDevisePushed;
    })
  }


  selectedTypeDepense: any;
  dataselectedTypeDepense = new Array<TypeDepense>();
  listselectedTypeDepensePushed = new Array<any>();
  listselectedTypeDepenseRslt = new Array<any>();
  GetTypeDepense() {
    this.paramService.GetTypeDepenseByCategorie(3).subscribe((data: any) => {
      this.dataselectedTypeDepense = data;
      this.listselectedTypeDepensePushed = [];
      for (let i = 0; i < this.dataselectedTypeDepense.length; i++) {
        this.listselectedTypeDepensePushed.push({ label: this.dataselectedTypeDepense[i].designationAr, value: this.dataselectedTypeDepense[i].code })
      }
      this.listselectedTypeDepenseRslt = this.listselectedTypeDepensePushed;
    })
  }




  GetFactureFrounisseurByCode() {
    this.depense_service.GetAllFactureFrounisseurByCode(this.selectedFactureFournisseur.code).subscribe((data: any) => {
      this.listDetailsTypeDepense = data.detailsFactureFournisseursDTOs;


      for (let i = 0; i < this.listDetailsTypeDepense.length; i++) {
        this.listDetailsTypeDepense[i].code = data.detailsFactureFournisseursDTOs[i].codeTypeDepense;
        this.listDetailsTypeDepense[i].designationArTypeDepense = data.detailsFactureFournisseursDTOs[i].designationArTypeDepense;
      }
      // this.selectedFrounisseur = data.codeFournisseur;
      // this.ValueMntChanged(data);
    })
  }

  CalculTaxEchange() {
    // taux echange devise selected 
    // taux echange * ngmodel montant 

  }


  getPicValider() {
    return "url('assets/files/images/etat_RCTotal.png')";
  }

  getPicRefuser() {
    return "url('assets/files/images/etat_NRCP.png')";
  }

  getPicNonEncore() {
    return "url('assets/files/images/etat_RCPPartiel.png')";
  }

  EtatApprouve!: any[];
  selectedEtatApprouve: any;
  getValued() {
    this.EtatApprouve = [
      { name: 'غير ماكد', code: '1', url: 'assets/files/images/etat_RCPPartiel.png' },
      { name: 'مرفوض', code: '3', url: 'assets/files/images/etat_NRCP.png' },
      { name: 'مأكد', code: '2', url: 'assets/files/images/etat_RCTotal.png' },
    ];
  }
  GetCodeEtatApprouver() {
    if (this.selectedEtatApprouve == undefined) {

    } else {
      this.depense_service.GetFactureFrounisseurByEtatApprouved(this.selectedEtatApprouve.code).subscribe((data: any) => {
        this.loadingComponent.IsLoading = false;
        this.IsLoading = false;

        this.dataFactureFournisseur = data;
        this.onRowUnselect(event);

      })

    }
  }


  clickDropDownUp(dropDownModUp: any) {
    if ((dropDownModUp.documentClickListener !== undefined && dropDownModUp.selectedOption !== null && dropDownModUp.itemClick) || dropDownModUp.itemClick) {
      dropDownModUp.focus();
      if (!dropDownModUp.overlayVisible) {
        dropDownModUp.show();
        event!.preventDefault();
      } else {
        dropDownModUp.hide();
        event!.preventDefault();
      }
    }
  }
  listDetailsTypeDepense = new Array<any>();
  Newcompteur: number = 0;
  NoAction() {

  }

  PushTableData() {
    var exist = false;

    for (var y = 0; y < this.listDetailsTypeDepense.length; y++) {
      if (this.selectedTypeDepense != this.listDetailsTypeDepense[y].codeTypeDepense && this.selectedTypeDepense != this.listDetailsTypeDepense[y].code) {
        exist = false;
        // this.listDetailsTypeDepense[y].montant=0;
      } else {
        exist = true;

        alertifyjs.set('notifier', 'position', 'top-left');

        alertifyjs.notify('<img  style="width: 30px; height: 30px; margin: 0px 0px 0px 15px" src="/assets/files/images/error.gif" alt="image" >' + ` Item Used`);

        this.playSoundError();
        break;
      }


    }
    // control remplire codeUnite + codeColoris + qte 


    if ((this.selectedTypeDepense != undefined) && (this.selectedTypeDepense != "") && (!exist)) {
      this.paramService.GetTypeDepenseByCode(this.selectedTypeDepense).subscribe((Newdata: any) => {
        this.Newcompteur = this.Newcompteur + 1;

        this.listDetailsTypeDepense.push(Newdata);
        this.listDetailsTypeDepense[y].montant = 0;
        // console.log(" PushTableData listDataDAWithDetails", this.listDetailsTypeDepense);


      })
    }

  }

  Total: number = 0;
  TotalEnDevisePrincipal: number = 0
  // montantDevise: number = 0;
  ValueMntChanged() {


    let x = 0;
    let z = 0;
    for (let list of this.listDetailsTypeDepense) {
      x += +list.montant;


    }
    this.Total = x;



  }
  visbileModalPassword: boolean = false;

  selectedValue: any = 1;
  visibleModalApprove: boolean = false;
  password: any;



  DesigDevise: any


  ApprouveFactureFournisseur() {
    // let userSession = sessionStorage.getItem("userName");

    if (this.selectedValue == 1) {
      let body = {
        code: this.code,
        codeUserApprouver: null,
        codeEtatApprouver: 1,
        dateApprouve: null,
        codeSaisie: this.codeSaisie

      }



      if (this.code != null) {
        body['code'] = this.code;
        this.depense_service.CancelApprouveFactFrs(body).subscribe(

          (res: any) => {
            alertifyjs.set('notifier', 'position', 'top-left');
            alertifyjs.success('<i class="success fa fa-chevron-down" aria-hidden="true" style="margin: 5px 5px 5px;"></i>' + "تم التحيين");
            this.playSoundSuccess();
            this.clearForm();
            this.ngOnInit();
            this.check_actif = true;
            this.check_inactif = false;
            this.onRowUnselect(event);
            this.clearSelected();
            this.visibleModal = false;
            this.visDelete = false;
            this.visibleModalPrint = false;
            this.clearSelected();
            this.visibleModalApprove = false;
            this.visbileModalPassword = false;
            this.visibleModalPrint = false;
            // this.selectedEtatApprouve = 1;
            this.GetDevise();
            this.selectedEtatApprouve = null;
            
          }
        );
      }
    } else {
      let body = {
        code: this.code,
        codeUserApprouver: "1",
        codeEtatApprouver: this.selectedValue,
        codeSaisie: this.codeSaisie
      }



      if (this.code != null) {
        body['code'] = this.code;
        this.depense_service.ApprouveFactFrs(body).subscribe(

          (res: any) => {
            alertifyjs.set('notifier', 'position', 'top-left');
            alertifyjs.success('<i class="success fa fa-chevron-down" aria-hidden="true" style="margin: 5px 5px 5px;"></i>' + "تم الإعتماد ");
            this.playSoundSuccess();
            this.clearForm();
            this.ngOnInit();
            this.check_actif = true;
            this.check_inactif = false;
            this.onRowUnselect(event);
            this.clearSelected();
            this.visDelete = false;
            this.visibleModalPrint = false;
            this.clearSelected();
            this.visibleModal = false;
            this.visibleModalApprove = false;
            this.visbileModalPassword = false;
            this.visibleModalPrint = false;
   
            this.selectedEtatApprouve = null;
          
          }
        );
      }

    }
  }


  decryptedValue: string = '';
  approveAC(mode: string) {


    const encryptedValue = sessionStorage.getItem('PassAnnullApprouveFF');
    if (encryptedValue) {

      this.decryptedValue = this.encryptionService.decrypt(encryptedValue);

    } else {
      this.decryptedValue = 'No value found in session storage';
    }
    if (this.password != this.decryptedValue) {
      alertifyjs.set('notifier', 'position', 'top-left');
      alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;"></i>' + " Password Error");

      this.playSoundError();



    } else {
      this.visbileModalPassword = false;
      const container = document.getElementById('main-container');
      const contextMenu = document.createElement('button');
      contextMenu.type = 'button';
      contextMenu.style.display = 'none';
      contextMenu.setAttribute('data-toggle', 'modal');
      if (mode === 'ApproveModal') {
        contextMenu.setAttribute('data-target', '#ModalApprove');
        this.formHeader = "إعتماد";
        this.visibleModalApprove = true;
        this.visDelete = false;
        this.visibleModal = false;
        this.visibleModalPrint = false;


        this.GetDevise();
        this.onRowSelect;

        this.GetFournisseur();
        this.GetTypeDepense();
        this.GetFactureFrounisseurByCode();

      } else if (mode === 'CancelApproveModal') {
        contextMenu.setAttribute('data-target', '#ModalApprove');
        this.formHeader = "إلغاء الإعتماد";
        this.visibleModalApprove = true;
        this.visDelete = false;
        this.visibleModal = false;
        this.visibleModalPrint = false;

        this.onRowSelect;
        this.GetFournisseur();
        this.GetTypeDepense();
        this.GetFactureFrounisseurByCode();
        this.GetDevise();

      }

    }

    this.password = '';
  }

  approveACDirect(mode: string) {
    if (this.selectedFactureFournisseur == undefined || this.selectedFactureFournisseur.code == undefined) {
      alertifyjs.set('notifier', 'position', 'top-left');
      alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + ` الرجاء إختيار سطر `);
      this.visibleModalApprove = false;
      this.playSoundError();
    } else

      if (this.selectedFactureFournisseur.codeEtatApprouver == 2) {
        alertifyjs.set('notifier', 'position', 'top-left');
        alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + ` إذن الصرف معتمد`);

      } else {


        this.visbileModalPassword = false;
        const container = document.getElementById('main-container');
        const contextMenu = document.createElement('button');
        contextMenu.type = 'button';
        contextMenu.style.display = 'none';
        contextMenu.setAttribute('data-toggle', 'modal');
        if (mode === 'ApproveModal') {
          contextMenu.setAttribute('data-target', '#ModalApprove');
          this.formHeader = "إعتماد";
          this.visibleModalApprove = true;
          this.visDelete = false;
          this.visibleModal = false;
          this.visibleModalPrint = false;


          this.onRowSelect;

          this.GetFournisseur();
          this.GetTypeDepense();
          this.GetFactureFrounisseurByCode();
          this.GetDevise();
          this.GetBanque();
          this.GetModeReglement();
          this.GetCaisse();

        }
      }




  }



  OpenPasswordModal(mode: string) {

    if (this.selectedFactureFournisseur == null) {
      alertifyjs.set('notifier', 'position', 'top-left');
      alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;"></i>' + "الرجاء إختبار سطر ");
      this.visibleModalApprove = false;
      this.visDelete = false;
      this.visibleModal = false;
      this.visibleModalPrint = false;
      this.visbileModalPassword = false;
      this.playSoundError();

    } else {


      if (this.selectedValue == 1) {
        alertifyjs.set('notifier', 'position', 'top-left');
        alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;"></i>' + "التحويل ليس مأكد");
        this.playSoundError();
      } else {


        const container = document.getElementById('main-container');
        const contextMenu = document.createElement('button');
        contextMenu.type = 'button';
        contextMenu.style.display = 'none';
        contextMenu.setAttribute('data-toggle', 'modal');
        if (mode === 'PasswordModal') {
          contextMenu.setAttribute('data-target', '#ModalPassword');
          this.formHeader = "كلمة السر";
          this.visibleModalApprove = false;
          this.visDelete = false;
          this.visibleModal = false;
          this.visibleModalPrint = false;
          this.visbileModalPassword = true;
        }

      }
    }





  }
  transformDateFormat() {
    this.dateFactureFournisseur = this.datePipe.transform(this.dateFactureFournisseur, "yyyy-MM-dd")

    console.log("  transformDateFormat  this.dateLivraison", this.dateFactureFournisseur)
  };
  CloseModalPassWord() {
    this.visbileModalPassword = false;
    this.clearSelected();
    this.password = '';
  }

  selectedFacture: FactureFournisseur[] = [];
  factureFrs: FactureFournisseur[] = [];
  selectAllCars() {
    if (this.selectedFacture.length === this.factureFrs.length) {
      this.selectedFacture = [];
    } else {
      this.selectedFacture = [...this.factureFrs];
    }
  }
  selectedFactures: FactureFournisseur | null = null;
  // Method to handle row selection
  onRowSelectFromTabs(event: any) {
    const selectedFactures = event.data;
    this.selectedFactures = selectedFactures; // Set the selectedFacture



    const car = event.data;
    if (this.selectedFacture.includes(car)) {
      this.selectedFacture = this.selectedFacture.filter(c => c !== car);
      console.log("5")
    } else {
      this.selectedFacture.push(car);
      console.log("selected from row ", car)

      console.log("data slected from row: ", event.data)
      this.listDetailsTypeDepense = event.data.detailsFactureFournisseursDTOs;


      for (let i = 0; i < this.listDetailsTypeDepense.length; i++) {
        this.listDetailsTypeDepense[i].code = event.data.detailsFactureFournisseursDTOs[i].codeTypeDepense;
        this.listDetailsTypeDepense[i].designationArTypeDepense = event.data.detailsFactureFournisseursDTOs[i].designationArTypeDepense;
      }
      this.ValueMntChanged();

    }

  }
  onRowUnselectFromTabs(event: any) {
    this.selectedFactures = null;
    const car = event.data;
    console.log("uncheck from selecetd row")
    this.listDetailsTypeDepense = new Array<any>();
    this.Total=0
    this.selectedFacture = this.selectedFacture.filter(c => c !== car);
  }
  // Method to handle checkbox change
  onCheckboxChange(car: FactureFournisseur) {
    if (this.selectedFacture.includes(car)) {
      this.selectedFacture = this.selectedFacture.filter(c => c !== car);
      console.log("select from checkbox")
    } else {
      this.selectedFacture.push(car);
      console.log("unselected from checkbox")
    }

  }

  // Method to check if a car is selected
  isCarSelected(car: FactureFournisseur): boolean {
    // console.log("v4")
    return this.selectedFactures === car;
    // return this.selectedFacture.includes(car);

  }

  columnTabs!: any[];
  columns() {
    this.columnTabs = [

      { field: '', header: ''  },
      { field: 'codeSaisie', header: 'الرمز' },
      { field: 'dateCreate', header: 'التاريخ' },
      { field: 'numFactureFournisseur', header: 'رقم فاتورة المورد', width: '60px' , fontSize:'12px !important  ' },
      { field: 'montant', header: 'القيمة  '   }


    ];
  }

  DisBanque: boolean = true;
  DisCaisse : boolean = true;
  FactureFournisseurTried = new Array<any>();
  LoadFactureFournisseur() {
    this.listDetailsTypeDepense = new Array<any>();
    this.Total=0
    this.depense_service.GetAllFactureFrounisseurByCodeFournisseurAndCodeDeviseAndPaidFalse(this.selectedFournisseur,this.selectedDevise).subscribe((data: any) => {
      this.FactureFournisseurTried = data;
 
      
    })
    };

    ClearData(){
 
    

      if(this.selectedDevise == "" || this.selectedDevise ==null || this.selectedDevise ==undefined){
        this.selectedFournisseur=null; 
        this.FactureFournisseurTried = new Array<any>();
        this.selectedCaisse=null;
        this.listDetailsTypeDepense = new Array<any>();
      }else{
        this.GetCaisse();
      }
    }


    
  selectedCaisse: any;
  dataCaisse = new Array<any>();
  listCaissePushed = new Array<any>();
  listCaisseRslt = new Array<any>();
  GetCaisse() {
    this.paramService.GetCaisseByCodeDevise(this.selectedDevise).subscribe((data: any) => {
      this.dataCaisse = data;
      this.listCaissePushed = [];
      for (let i = 0; i < this.dataCaisse.length; i++) {
        this.listCaissePushed.push({ label: this.dataCaisse[i].designationAr, value: this.dataCaisse[i].code })
      }
      this.listCaisseRslt = this.listCaissePushed;
    })
  }

  

    
  selectedModeReglement: any;
  dataModeReglement = new Array<any>();
  listModeReglementPushed = new Array<any>();
  listModeReglementRslt = new Array<any>();
  
  GetModeReglement() {
    this.paramService.GetModeReglement().subscribe((data: any) => {
      this.dataModeReglement = data;
      this.listModeReglementPushed = [];
      for (let i = 0; i < this.dataModeReglement.length; i++) {
        this.listModeReglementPushed.push({ label: this.dataModeReglement[i].designationAr, value: this.dataModeReglement[i].code })
      }
      this.listModeReglementRslt = this.listModeReglementPushed;
    })
  }


  
  selectedBanque: any;
  dataBanque = new Array<any>();
  listBanquePushed = new Array<any>();
  listBanqueRslt = new Array<any>();
  GetBanque() {
    this.paramService.GetBanque().subscribe((data: any) => {
      this.dataBanque = data;
      this.listBanquePushed = [];
      for (let i = 0; i < this.dataBanque.length; i++) {
        this.listBanquePushed.push({ label: this.dataBanque[i].designationAr, value: this.dataBanque[i].code })
      }
      this.listBanqueRslt = this.listBanquePushed;
    })
  }


  GetBanqueIfNeed(){
    console.log("modereg seletced", this.selectedModeReglement)
    this.paramService.GetModeReglementByCode(this.selectedModeReglement).subscribe((data: any) => {
    //  let dataTemp = data;

 

     if(data.reqBanque== true){
      this.GetBanque();
      this.DisBanque = false;
      this.DisCaisse = true
      this.selectedCaisse ='';
     }else{
      this.DisBanque = true;
      this.selectedBanque ='';

      this.numPiece='';
      this.DisCaisse = false
      this.GetCaisse();
     }
      
    })

   

  }

  }


  


 



