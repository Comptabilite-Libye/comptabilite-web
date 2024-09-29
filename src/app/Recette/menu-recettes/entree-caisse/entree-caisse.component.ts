import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Output, } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { catchError, take, throwError, timeout } from 'rxjs';
import { Table } from 'primeng/table';
import * as alertifyjs from 'alertifyjs'
import { AlimentationCaisse } from '../domaine/domaine'; 
import { ParametrageService } from '../../../MenuParametrage/menu-parametrages/WService/parametrage.service'
import { Caisse, Devise } from '../../../MenuParametrage/menu-parametrages/domaine/domaine';
import { LoadingComponent } from 'src/app/Shared/loading/loading.component';
import { CompteurService } from 'src/app/Shared/Compteur/CompteurService';
import { Compteur } from 'src/app/Shared/Compteur/domaine';
import { EncryptionService } from 'src/app/Shared/EcrypteService/EncryptionService'; 
import { RecetteServiceService } from '../WsRecette/recette-service.service';
import { Router } from '@angular/router';
declare const PDFObject: any;
interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-entree-caisse',
  templateUrl: './entree-caisse.component.html',
  styleUrls: ['./entree-caisse.component.css', '.../../../src/assets/files/css/style.css'], providers: [ConfirmationService, MessageService]
})
export class EntreeCaisseComponent {

  openModal!: boolean;
  IsLoading = true;
  DisPrint: boolean = true;
  constructor(private router: Router  , private encryptionService: EncryptionService, private loadingComponent: LoadingComponent, private recette_service: RecetteServiceService, private CompteurService: CompteurService, private paramService: ParametrageService) {
  }
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

  onPageChange(event: PageEvent) {
      this.first = event.first;
      this.rows = event.rows;
  }
  ngOnInit(): void {
    this.items = [
      // { label: 'Validation', icon: 'pi pi-fw pi-check-square', command: () => this.OpenPasswordModal('PasswordModal') },
      { label: 'إلغاء الإعتماد', icon: 'pi pi-fw pi-history', command: () => this.OpenPasswordModal('PasswordModal') },
    ];
    this.GelAllAlimentationCaisse();
    this.getValued();

  }

  @Output() closed: EventEmitter<string> = new EventEmitter();
  closeThisComponent() { 
      const parentUrl = this.router.url.split('/').slice(0, -1).join('/'); 
      this.closed.emit(parentUrl); 
      this.router.navigate([parentUrl]);
  }

  DataCodeSaisie = new Array<Compteur>();
  GetCodeSaisie() {
    this.CompteurService.GetcompteurCodeSaisie("CodeSaisieAC") .
      subscribe((data: any) => {
        this.DataCodeSaisie = data;
        this.codeSaisie = data.prefixe + data.suffixe;
      })
      this.GetCaisse();
      this.GetTypeRecette(); 
      this.GetModeReglement();

  }

  RemplirePrint(code: any): void {


    this.recette_service.GetEditionAlimentCaissePDFf(code).subscribe((blob: Blob) => {

      const reader = new FileReader();
      const binaryString = reader.readAsDataURL(blob);
      reader.onload = (event: any) => {
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
    this.pdfData == null;

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
    this.selectedModeReglement = '';
    this.Total = 0;
    this.selectedEtatApprouve = 1
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
  TauxChange: number = 0;
  montantEnDevise: any = 0;


  selectedAlimentationCaisse: any;

  etatAprrouve: any;
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
    this.selectedValue = event.data.codeEtatApprouver;
    this.TauxChange = event.data.tauxChange;
    this.etatAprrouve = event.data.codeEtatApprouver;
    if (event.data.codeEtatApprouver == 2 || event.data.codeEtatApprouver == 3) {
      this.DisDelete = true;
      this.DisModif = true;
      this.DisApprouv = true;


    } else {
      this.DisDelete = false;
      this.DisModif = false;
      this.DisApprouv = false;
      this.DisPrint = true;
    }
  }
  onRowUnselect(event: any) {
    this.code = event.data = null;
    this.selectedAlimentationCaisse == null;
    this.DisPrint = true;
    this.selectedCaisse = '';
    this.selectedDevise = '';
    this.selectedModeReglement = '';
    this.selectedTypeRecette = '';
    this.montantEnDevise = 0;
    this.TauxChange = 0;
    this.observation = ""
    this.listDetailsTypeRecette = new Array<any>();
  }



  DeleteAlimentationCaisse() {
    this.recette_service.DeleteAlimentationCaisse(this.selectedAlimentationCaisse.code) .subscribe(
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
      this.visibleModal = true;
      this.code == undefined; 
      this.GetCodeSaisie(); 


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
        this.GetCaisse();
        this.GetTypeRecette();
        this.GetModeReglement();
        this.GetAlimentationCaisseByCode();
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
        this.RemplirePrint(this.selectedAlimentationCaisse.code);

        this.onRowUnselect(event);
      }




    }

  }


  // approveDA(mode: string) {

  //   const container = document.getElementById('main-container');
  //   const contextMenu = document.createElement('button');
  //   contextMenu.type = 'button';
  //   contextMenu.style.display = 'none';
  //   contextMenu.setAttribute('data-toggle', 'modal');
  //   if (mode === 'ApproveModal') {
  //     contextMenu.setAttribute('data-target', '#ModalApprove');
  //     this.formHeader = "إعتماد ";
  //     this.visibleModalApprove = true;
  //     this.visDelete = false;
  //     this.visibleModal = false;
  //     this.visibleModalPrint = false; 


  //     this.onRowSelect; 
  //     this.GetCaisse();
  //     this.GetTypeRecette();
  //     this.GetModeReglement();
  //     this.GetDevise();
  //     this.GetAlimentationCaisseByCode();

  //   }
  // }


  // userCreate = "";
  GetDataFromTableEditor: any;
  final = new Array<any>();
  PostAlimentationCaisse() {
    let userSession = sessionStorage.getItem("userName");
    if (!this.observation || !this.codeSaisie || !this.selectedCaisse || !this.selectedDevise || !this.selectedModeReglement) {
      alertifyjs.set('notifier', 'position', 'top-left');
      alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + " Field Required");
      this.playSoundError();

    } else {

      for (let y = 0; y < this.listDetailsTypeRecette.length; y++) {
        this.GetDataFromTableEditor = {
          codeTypeRecette: this.listDetailsTypeRecette[y].code,
          typeRecetteDTO: { code: this.listDetailsTypeRecette[y].code },
          montant: this.listDetailsTypeRecette[y].montant,
          userCreate: userSession,
          montantDevise: this.listDetailsTypeRecette[y].montantDevise
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
        tauxChange: this.TauxChange,
        montantEnDevise: this.montantEnDevise,
        codeCaisse: this.selectedCaisse,
        codeDevise: this.selectedDevise,
        codeModeReglement: this.selectedModeReglement,
        codeEtatApprouver: 1,
        detailsAlimentationCaisseDTOs: this.final
      }
      if (this.code != null) {
        body['code'] = this.code;
        this.recette_service.UpdateAlimentationCaisse(body).subscribe(
          (res: any) => {
            alertifyjs.set('notifier', 'position', 'top-left');
            alertifyjs.success('<i class="success fa fa-chevron-down" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + "Success Updated");
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
        this.recette_service.PostAlimentationCaisse(body) .subscribe(
          (res: any) => {
            alertifyjs.set('notifier', 'position', 'top-left');
            alertifyjs.success('<i class="success fa fa-chevron-down" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + "Success Saved");
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
    this.listDetailsTypeRecette.splice(index, 1);
    console.log(index);
  }






  compteur: number = 0;
  listDesig = new Array<any>();

  // cars!: Array<Matiere>;
  // brands!: SelectItem[];
  // clonedCars: { [s: string]: Matiere } = {}; 
  dataAlimentationCaisse = new Array<AlimentationCaisse>();
  codeSaisieSorted: any;
  GelAllAlimentationCaisse() {

    this.recette_service.GetAllAlimentationCaisse() .subscribe((data: any) => {
      this.loadingComponent.IsLoading = false;
      this.IsLoading = false;
      this.dataAlimentationCaisse = data;
      this.codeSaisieSorted = data.codeSaisie;
      this.onRowUnselect(event);
    })


  }

  selectedCaisse: any;
  dataCaisseDde = new Array<Caisse>();
  listCaissePushed = new Array<any>();
  listCaisseRslt = new Array<any>();
  GetCaisse() {
    this.paramService.GetCaisse().subscribe((data: any) => {
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
    this.paramService.GetTypeRecette().subscribe((data: any) => {
      this.dataTypeRecetteDde = data;
      this.listTypeRecettePushed = [];
      for (let i = 0; i < this.dataTypeRecetteDde.length; i++) {
        this.listTypeRecettePushed.push({ label: this.dataTypeRecetteDde[i].designationAr, value: this.dataTypeRecetteDde[i].code })
      }
      this.listTypeRecetteRslt = this.listTypeRecettePushed;
    })
  }




  selectedModeReglement: any;
  dataModeReglement = new Array<Caisse>();
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


  GetAlimentationCaisseByCode() {
    this.recette_service.GetAllAlimentationCaisseByCode(this.selectedAlimentationCaisse.code).subscribe((data: any) => {
      this.listDetailsTypeRecette = data.detailsAlimentationCaisseDTOs;


      for (let i = 0; i < this.listDetailsTypeRecette.length; i++) {
        this.listDetailsTypeRecette[i].code = data.detailsAlimentationCaisseDTOs[i].codeTypeRecette;
      }
      this.ValueMntChanged(data);
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
      { name: 'EnCours', code: '1', url: 'assets/files/images/etat_RCPPartiel.png' },
      { name: 'Refuser', code: '3', url: 'assets/files/images/etat_NRCP.png' },
      { name: 'Valider', code: '2', url: 'assets/files/images/etat_RCTotal.png' },
    ];
  }
  GetCodeEtatApprouver() {
    if (this.selectedEtatApprouve == undefined) {

    } else {
      this.recette_service.GetAlimentationCaisseByEtatApprouved(this.selectedEtatApprouve.code).subscribe((data: any) => {
        this.loadingComponent.IsLoading = false;
        this.IsLoading = false;

        this.dataAlimentationCaisse = data;
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
  listDetailsTypeRecette = new Array<any>();
  Newcompteur: number = 0;
  PushTableData() {
    var exist = false;

    for (var y = 0; y < this.listDetailsTypeRecette.length; y++) {
      if (this.selectedTypeRecette != this.listDetailsTypeRecette[y].codeTypeRecette) {
        exist = false;
      } else {
        exist = true;

        alertifyjs.set('notifier', 'position', 'top-right');
        alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;"></i>' + " Item Used");
        this.playSoundError();
        break;
      }


    }
    // control remplire codeUnite + codeColoris + qte 


    if ((this.selectedTypeRecette != undefined) && (this.selectedTypeRecette != "") && (!exist)) {
      this.paramService.GetTypeRecetteByCode(this.selectedTypeRecette).subscribe((Newdata: any) => {
        // this.ListMatiere[this.Newcompteur] = Newdata;
        this.Newcompteur = this.Newcompteur + 1;

        this.listDetailsTypeRecette.push(Newdata);
        console.log(" PushTableData listDataDAWithDetails", this.listDetailsTypeRecette);

        // console.log(" PushTableData articles", this.ListMatiere);
        // this.disp = true;
      })
    }

  }

  Total: number = 0;
  TotalEnDevisePrincipal: number = 0
  montantDevise: number = 0;
  ValueMntChanged(index: number) {

    if (this.selectedDevise == '' || this.TauxChange == 0) {
      alertifyjs.set('notifier', 'position', 'top-left');
      alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + `الرجاء إختر عملة أو تاكد من سعر الصرف`);
      this.playSoundError();
      this.remove(index);
    } else {

      let x = 0;
      let z = 0;
      for (let list of this.listDetailsTypeRecette) {
        x += +list.montant;


      }
      this.Total = x;
      let y = this.Total * this.TauxChange;
      this.montantEnDevise = y.toFixed(3);

      for (var int = 0; int < this.listDetailsTypeRecette.length; int++) {
        if (this.listDetailsTypeRecette[int].montant > 0) {
          let mntDevise;
          mntDevise = this.listDetailsTypeRecette[int].montant * this.TauxChange;
          this.listDetailsTypeRecette[int].montantDevise = mntDevise.toFixed(3);

        }
      }

    }



  }
  myNumber: number = 0;
  GetTauxDeChange(code: number) {
    this.paramService.GetTauxDeChangeByCodeDevise(code).pipe(

      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error?.detail == "Cannot invoke \"com.DevPointSystem.Comptabilite.Parametrage.domaine.TauxDeChange.getCode()\" because \"domaine\" is null") {

          alertifyjs.set('notifier', 'position', 'top-left');
          alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + ` لا يوجد سعر صرف للعملة`);
          this.TauxChange = 0;
          this.playSoundError();
        } else {


         
        }

        return throwError(errorMessage);
      })
    ).subscribe((data: any) => {
      this.TauxChange = data.tauxChange;
    })


  }

  visbileModalPassword: boolean = false;

  selectedValue: any = 1;
  visibleModalApprove: boolean = false;
  password: any;


  LoadDeviseCaisse() {
    this.paramService.GetCaisseByCode(this.selectedCaisse) .subscribe((data: any) => {

      this.DesigDevise = data.deviseDTO.designationAr;
      this.selectedDevise = data.deviseDTO.code;

      this.GetTauxDeChange(data.deviseDTO.code);
    })




  }
  selectedDevise: any;
  DesigDevise: any
  dataDevise = new Array<Devise>();
  listDevisePushed = new Array<any>();
  listDeviseRslt = new Array<any>();



  ApprouveAlimentationCaisse() {
    let userSession = sessionStorage.getItem("userName");

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
        this.recette_service.CancelApprouveAC(body).subscribe(

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
            this.selectedEtatApprouve = 1;
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
        this.recette_service.ApprouveAc(body) .subscribe(

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

            this.selectedEtatApprouve = 1;

          }
        );
      }

    }
  }


  decryptedValue: string = '';
  approveAC(mode: string) {


    const encryptedValue = sessionStorage.getItem('PasswordAnnuleApprouve');
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


        this.onRowSelect;

        this.GetCaisse();
        this.GetTypeRecette();
        this.GetModeReglement();
        this.GetAlimentationCaisseByCode();

      } else if (mode === 'CancelApproveModal') {
        contextMenu.setAttribute('data-target', '#ModalApprove');
        this.formHeader = "إلغاء الإعتماد";
        this.visibleModalApprove = true;
        this.visDelete = false;
        this.visibleModal = false;
        this.visibleModalPrint = false;

        this.onRowSelect;
        this.GetCaisse();
        this.GetTypeRecette();
        this.GetModeReglement();
        this.GetAlimentationCaisseByCode();

      }

    }

    this.password = '';
  }

  approveACDirect(mode: string) {
    if (this.selectedAlimentationCaisse == undefined || this.selectedAlimentationCaisse.code == undefined) {
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

        this.GetCaisse();
        this.GetTypeRecette();
        this.GetModeReglement();
        this.GetAlimentationCaisseByCode();

      }
    }




  }



  OpenPasswordModal(mode: string) {

    if (this.selectedAlimentationCaisse == null) {
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

  CloseModalPassWord() {
    this.visbileModalPassword = false;
    this.clearSelected();
    this.password = '';
  }
}


