import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';

import * as alertifyjs from 'alertifyjs'
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { catchError, throwError } from 'rxjs';
import { Caisse, Devise, Fournisseur } from 'src/app/MenuParametrage/menu-parametrages/domaine/domaine';
import { ParametrageService } from 'src/app/MenuParametrage/menu-parametrages/WService/parametrage.service';
  import { Compteur } from 'src/app/Shared/Compteur/domaine';
import { EncryptionService } from 'src/app/Shared/EcrypteService/EncryptionService';
import { LoadingComponent } from 'src/app/Shared/loading/loading.component';
import { CompteurService } from 'src/app/Shared/Compteur/CompteurService';
import { DepenseService } from '../services/depense.service';
 
import { DatePipe } from '@angular/common';
import { FilterMetadata } from 'primeng/api'; 
interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}


declare const PDFObject: any;
@Component({
  selector: 'app-facture-fournisseur',
  templateUrl: './facture-fournisseur.component.html',
  styleUrls: ['./facture-fournisseur.component.css', '.../../../src/assets/files/css/style.css'], providers: [ConfirmationService, MessageService]
})
export class FactureFournisseurComponent {
  dateFactureFournisseur: any;
  openModal!: boolean;
  IsLoading = true;
  DisPrint: boolean = true;

 
  loading: boolean = true;
 
  constructor(public primengConfig: PrimeNGConfig, private datePipe: DatePipe, private router: Router, private encryptionService: EncryptionService, private loadingComponent: LoadingComponent, private depense_service: DepenseService, private CompteurService: CompteurService, private paramService: ParametrageService) {

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
  VisVoir:boolean = false;
  VisModif :boolean = true;
  visBtnSave:boolean =true;
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
      { field: 'codeEtatApprouver', header: 'مأكد',  filter: "false" },
      { field: 'codeSaisie', header: 'الرمز', filter: "true" },
      { field: 'fournisseurDTO.codeSaisie', header: 'رمز المورد' , filter: "true" },
      { field: 'fournisseurDTO.designationAr', header: 'المورد' , filter: "true" },
      { field: 'dateFactureFournisseur', header: 'تاريخ فاتورة المورد' , filter: "true" },
      { field: 'montant', header: 'القيمة  ' },
      { field: 'numFactureFournisseur', header: 'رقم فاتورة المورد'   , filter: "true" },
      { field: 'deviseDTO.designationAr', header: 'العملة' , filter: "false" },
      { field: 'dateCreate', header: 'التاريخ' , filter: "true" }, 
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
    this.CompteurService.GetcompteurCodeSaisie("CodeSaisieFF").
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
    this.selectedFactureFournisseur = new Array<any>();
    this.selectedFournisseur = '';
    this.selectedDevise = '';
    this.selectedTypeDepense = '';
    this.Total = 0;
    this.selectedEtatApprouve = 1
    this.dateFactureFournisseur = '';
    this.MntFactFrs = '';
    this.NumFactFrs = '';
    this.selectedCostCentre = '';
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
    this.selectedCostCentre = event.data.codeCostProfitCentre;
    if (event.data.codeEtatApprouver == 2 || event.data.codeEtatApprouver == 3) {
      this.DisDelete = true;
      this.DisModif = true;
      this.DisApprouv = true;
      this.VisModif=false;
      this.VisVoir=true;


    } else {
      this.DisDelete = false;
      this.DisModif = false;
      this.DisApprouv = false;
      this.DisPrint = true;
      this.VisVoir=false;
      this.VisModif=true;
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
      this.formHeader = "إضافة"
      this.onRowUnselect(event);
      this.clearSelected();
      this.clearForm();
      this.visibleModal = true;
      this.code == undefined;
      this.GetCodeSaisie();
      this.GetTypeDepense();
      this.GetFournisseur();
      this.GetDevise();
      this.GetCostCentre();


    }
    if (mode === 'edit') {


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
        this.formHeader = "تعديل"

        this.visibleModal = true;
        this.onRowSelect;
        this.GetFournisseur();
        this.GetTypeDepense();
        this.GetFactureFrounisseurByCode();
        this.GetDevise();
        
      this.GetCostCentre();
      }

    }

    if (mode === 'Delete') {

      if (this.code == undefined) {
        this.onRowUnselect;
        alertifyjs.set('notifier', 'position', 'top-left');
        alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + ` الرجاء إختيار سطر `);
        this.playSoundError();
        this.visDelete == false && this.visibleModal == false
      } else {

        {
          button.setAttribute('data-target', '#ModalDelete');
          this.formHeader = "حذف"
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
        this.formHeader = "طباعة"
        this.visibleModalPrint = true;
        this.RemplirePrint(this.selectedFactureFournisseur.code);

        this.onRowUnselect(event);
      }




    }

    if(mode ==='voir'){
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
        this.formHeader = "عرض"

        this.visibleModal = true;
        this.visBtnSave = false;
        this.onRowSelect;
        this.GetFournisseur();
        this.GetTypeDepense();
        this.GetFactureFrounisseurByCode();
        this.GetDevise();
        
      this.GetCostCentre();
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
        codeCategorieDepense: 3,
        codeCostProfitCentre : this.selectedCostCentre,
        paid:0
      }
      if (this.code != null) {
        body['code'] = this.code;
        this.depense_service.UpdateFactureFrounisseur(body).pipe(
          catchError((error: HttpErrorResponse) => {
            let errorMessage = '';
            this.final = new Array<any>();
            return throwError(errorMessage);
            
          })

        ).subscribe(
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

  // cars!: Array<Matiere>;
  // brands!: SelectItem[];
  // clonedCars: { [s: string]: Matiere } = {}; 
  dataFactureFournisseur = new Array<any>();
  listCodeSaisie= new Array<any>();
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
      this.selectedFactureFournisseur =null
      
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
  dataselectedTypeDepense = new Array<Caisse>();
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
        this.listDetailsTypeDepense[i].designationArTypeDepense  = data.detailsFactureFournisseursDTOs[i].designationArTypeDepense;
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
    
            // this.selectedEtatApprouve = 1;
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
        this.GetCostCentre();

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
        
        this.GetCostCentre();

      }

    }

    this.password = '';
  }

  approveFFDirect(mode: string) {
    if (this.selectedFactureFournisseur == undefined || this.selectedFactureFournisseur.code == undefined) {
      alertifyjs.set('notifier', 'position', 'top-left');
      alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + ` الرجاء إختيار سطر `);
      this.visibleModalApprove = false;
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


        this.onRowSelect;
 
        this.GetCostCentre();
        this.GetFournisseur();
        this.GetTypeDepense();
        this.GetFactureFrounisseurByCode();
        this.GetDevise();

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

  selectedCostCentre: any;
  dataCostCentre = new Array<Fournisseur>();
  listCostCentrePushed = new Array<any>();
  listCostCentreRslt = new Array<any>();
  GetCostCentre() {
    this.paramService.GetCostCentre().subscribe((data: any) => {
      this.dataCostCentre = data;
      this.listCostCentrePushed = [];
      for (let i = 0; i < this.dataCostCentre.length; i++) {
        this.listCostCentrePushed.push({ label: this.dataCostCentre[i].designationAr, value: this.dataCostCentre[i].code })
      }
      this.listCostCentreRslt = this.listCostCentrePushed;
    })
  }
}



