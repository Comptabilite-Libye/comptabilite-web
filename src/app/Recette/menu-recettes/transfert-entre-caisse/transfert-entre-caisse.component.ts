import { HttpErrorResponse } from '@angular/common/http';
import { Component, } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { catchError, take, throwError } from 'rxjs';
import { Table } from 'primeng/table';

import * as alertifyjs from 'alertifyjs'
import { TransfertCaisse } from '../domaine/domaine';
import { RecetteServiceService } from '../../WsRecette/recette-service.service';
import { ParametrageService } from '../../../MenuParametrage/WService/parametrage.service'
import { Caisse, Devise } from '../../../MenuParametrage/domaine/domaine';
import { LoadingComponent } from 'src/app/Shared/loading/loading.component';
import { CompteurService } from 'src/app/Shared/Compteur/CompteurService';
import { Compteur } from 'src/app/Shared/Compteur/domaine';
import { EncryptionService } from 'src/app/Shared/EcrypteService/EncryptionService';
import { ErrorHandlerService } from 'src/app/Shared/TranslateError/error-handler-service.service';
declare const PDFObject: any;
@Component({
  selector: 'app-transfert-entre-caisse',
  templateUrl: './transfert-entre-caisse.component.html',
  styleUrls: ['./transfert-entre-caisse.component.css', '.../../../src/assets/files/css/style.css'], providers: [ConfirmationService, MessageService]
})
export class TransfertEntreCaisseComponent {

  openModal!: boolean;
  IsLoading = true;
  DisPrint: boolean = true;
  constructor(private errorHandler: ErrorHandlerService, private encryptionService: EncryptionService, private loadingComponent: LoadingComponent, private recette_service: RecetteServiceService, private CompteurService: CompteurService, private paramService: ParametrageService) {
  }
  pdfData!: Blob;
  isLoading = false;
  DisDelete: boolean = false;
  DisModif: boolean = false;
  DisApprouv: boolean = false;
  items!: MenuItem[];
  ngOnInit(): void {
    this.items = [
      // { label: 'Validation', icon: 'pi pi-fw pi-check-square', command: () => this.OpenPasswordModal('PasswordModal') },
      { label: 'إلغاء الإعتماد', icon: 'pi pi-fw pi-history', command: () => this.OpenPasswordModal('PasswordModal') },
    ];
    this.GelAllTransfertCaisse();
    this.getValued();

  }
  DataCodeSaisie = new Array<Compteur>();
  GetCodeSaisie() {
    this.CompteurService.GetcompteurCodeSaisie("CodeSaisieAC").pipe(
      take(2),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        this.errorHandler.handleError(error);
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
    this.selectedTransfertCaisse = new Array<any>();
    this.soldeCaisseEntree = '';
    this.selectedDevise = '';
    this.sodleCaisseSortie = '';
    this.codeDevise=0;
    this.DeviseCaisse="";
    this.TauxChange=0;

    this.onRowUnselect(event);


  }
  // check_actif = false;
  // check_inactif = false;

  formHeader = ".....";
  searchTerm = '';
  visibleModal: boolean = false;
  visibleModalPrint: boolean = false;
  visDelete: boolean = false;
  code!: number | null;
  codeSaisie: any;
  observation: string = 'NULL';
  montant: any = '0';
  TauxChange: number = 0;
  montantEnDevise: any = 0;
  soldeCaisseEntree: any;
  sodleCaisseSortie: any;

  selectedTransfertCaisse: any;


  onRowSelect(event: any) {
    this.code = event.data.code;
    this.montant = event.data.montant;
    this.codeSaisie = event.data.codeSaisie;
    this.observation = event.data.observation;
    this.montant = event.data.montant;
    this.selectedDevise = event.data.codeDevise;
    this.soldeCaisseEntree = event.data.codeCaisseTr;
    this.DisPrint = false;
    this.sodleCaisseSortie = event.data.codeCaisse;
    this.selectedValue = event.data.codeEtatApprouver;
    this.TauxChange = event.data.tauxChange

    if (event.data.codeEtatApprouver == 2 || event.data.codeEtatApprouver == 3) {
      this.DisDelete = true;
      this.DisModif = true;
      this.DisApprouv = true;


    } else {
      this.DisDelete = false;
      this.DisModif = false;
      this.DisApprouv = false;
    }
  }
  onRowUnselect(event: any) {
    this.code = event.data = null;
    this.selectedTransfertCaisse == null;
    this.DisPrint = true;
    this.soldeCaisseEntree = '';
    this.selectedDevise = '';
    this.sodleCaisseSortie = '';
    this.soldeCaisseEntree = 0;
    this.sodleCaisseSortie = 0;
    this.TauxChange = 0;
    this.observation = ""
  }



  DeleteTransfertCaisse() {
    // this.recette_service.DeleteTransfertCaisse(this.selectedTransfertCaisse.code).pipe(
    //   catchError((error: HttpErrorResponse) => {
    //     let errorMessage = '';

    // this.errorHandler.handleError(error); 
    //     return throwError(errorMessage);
    //   })

    // ).subscribe(
    //   (res: any) => {
    //     alertifyjs.set('notifier', 'position', 'top-left');
    //     alertifyjs.success('<i class="success fa fa-chevron-down" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + "Success Deleted");

    //     this.ngOnInit();
    //     this.check_actif = true;
    //     this.check_inactif = false;
    //     this.visDelete = false;
    //     this.clearForm();

    //   }
    // )
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
      this.GetCaisseSortie();
      this.GetModeReglement();
      this.GetDevise();
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
      } else {

        button.setAttribute('data-target', '#Modal');
        this.formHeader = "تعديل"

        this.visibleModal = true;
        this.onRowSelect;
        this.GetCaisseSortie();
        this.GetCaisseEntree();
        this.GetDevise();
        this.GetModeReglement();
        this.GetTransfertCaisseByCode();
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
          this.visibleModal = false;
          this.visbileModalPassword = false;
          this.visibleModalApprove = false;
          this.visibleModalPrint = false;

          // this.onRowUnselect(event);

        }
      }

    }

    if (mode === 'Print') {


      button.setAttribute('data-target', '#ModalPrint');
      this.formHeader = "طباعة"
      this.visibleModalPrint = true;
      this.RemplirePrint(this.selectedTransfertCaisse.code);

      this.onRowUnselect(event);

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
  //     this.GetCaisseEntree();
  //     this.GetDevise();
  //     this.GetTransfertCaisseByCode();

  //   }
  // }


  // userCreate = "";
  GetDataFromTableEditor: any;
  final = new Array<any>();
  PostTransfertCaisse() {
    let userSession = sessionStorage.getItem("userName");
    if (!this.observation || !this.codeSaisie || !this.selectedCaisseEntree || !this.selectedDevise || !this.selectedCaisseSortie) {
      alertifyjs.set('notifier', 'position', 'top-left');
      alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + " Field Required");


    } else {


      let body = {
        codeSaisie: this.codeSaisie,
        observation: this.observation,
        userCreate: userSession,
        dateCreate: new Date().toISOString(), //
        code: this.code,
        montant: this.Total,
        tauxChange: this.TauxChange,
        montantEnDevise: this.montantEnDevise,
        codeCaisseTr: this.selectedCaisseSortie,
        codeDevise: this.selectedDevise,
        codeCaisse: this.soldeCaisseEntree,
        codeEtatApprouver: this.selectedValue,
      }
      if (this.code != null) {
        body['code'] = this.code;
        // this.recette_service.UpdateTransfertCaisse(body).pipe(
        //   catchError((error: HttpErrorResponse) => {
        //     this.final = new Array<any>();
        //     let errorMessage = '';

        // this.errorHandler.handleError(error); 
        //     return throwError(errorMessage);
        //   })
        // ).subscribe(
        //   (res: any) => {
        //     alertifyjs.set('notifier', 'position', 'top-left');
        //     alertifyjs.success('<i class="success fa fa-chevron-down" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + "Success Updated");
        //     this.visibleModal = false;
        //     this.clearForm();
        //     this.ngOnInit();
        //     this.check_actif = true;
        //     this.check_inactif = false;
        //     this.onRowUnselect(event);
        //     this.clearSelected();
        //     this.final = new Array<any>();
        //   }
        // );
      }
      else {
        // this.recette_service.PostTransfertCaisse(body).pipe(
        //   catchError((error: HttpErrorResponse) => {
        //     this.final = new Array<any>();
        //     let errorMessage = '';

        // this.errorHandler.handleError(error); 
        //     return throwError(errorMessage);
        //   })

        // ).subscribe(
        //   (res: any) => {
        //     alertifyjs.set('notifier', 'position', 'top-left');
        //     alertifyjs.success('<i class="success fa fa-chevron-down" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + "Success Saved");
        //     this.visibleModal = false;
        //     this.clearForm();
        //     this.ngOnInit();
        //     this.code;
        //     this.check_actif = true;
        //     this.check_inactif = false;
        //     this.onRowUnselect(event);
        //     this.clearSelected();
        //     // let NewCode = res.code;
        //     // this.RemplirePrint(NewCode);
        //     // this.visibleModalPrint = true;
        //     this.final = new Array<any>();

        //   }
        // )
      }
    }
  }


  Voids(): void {
    // this.cars = [

    // ].sort((car1, car2) => {
    //   return 0;
    // });

  }









  compteur: number = 0;
  listDesig = new Array<any>();

  // cars!: Array<Matiere>;
  // brands!: SelectItem[];
  // clonedCars: { [s: string]: Matiere } = {}; 
  dataTransfertCaisse = new Array<TransfertCaisse>();
  codeSaisieSorted: any;
  GelAllTransfertCaisse() {
    // this.recette_service.GetAllTransfertCaisse().pipe(
    //   catchError((error: HttpErrorResponse) => {
    //     let errorMessage = '';

    // this.errorHandler.handleError(error); 
    //     return throwError(errorMessage);
    //   })

    // ).subscribe((data: any) => {

    this.loadingComponent.IsLoading = false;
    this.IsLoading = false;

    //   this.dataTransfertCaisse = data;
    //   this.codeSaisieSorted = data.codeSaisie;
    //   this.onRowUnselect(event);

    // })
  }

  selectedCaisseSortie: any;
  dataCaisseSortie = new Array<Caisse>();
  listCaisseSortiePushed = new Array<any>();
  listCaisseSortieRslt = new Array<any>();
  GetCaisseSortie() {
    this.paramService.GetCaisse().pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        this.errorHandler.handleError(error);
        return throwError(errorMessage);
      })

    ).subscribe((data: any) => {
      this.dataCaisseSortie = data;
      this.listCaisseSortiePushed = [];
      for (let i = 0; i < this.dataCaisseSortie.length; i++) {
        this.listCaisseSortiePushed.push({ label: this.dataCaisseSortie[i].designationAr, value: this.dataCaisseSortie[i].code })
      }
      this.listCaisseSortieRslt = this.listCaisseSortiePushed;
    })
  }



  selectedCaisseEntree: any;
  dataCaisseEntree = new Array<Caisse>();
  listCaisseEntreePushed = new Array<any>();
  listCaisseEntreeRslt = new Array<any>();
  DeviseCaisse: string="";
  codeDevise:number=0;
 
  GetCaisseEntree() {
    if (this.selectedCaisseSortie == null) {
      
    } else {

 
      this.paramService.GetCaisseNotIn(this.selectedCaisseSortie).pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';

          this.errorHandler.handleError(error);
          return throwError(errorMessage);
        })

      ).subscribe((data: any) => {
        this.dataCaisseEntree = data;
        this.listCaisseEntreePushed = [];
        for (let i = 0; i < this.dataCaisseEntree.length; i++) {
          this.listCaisseEntreePushed.push({ label: this.dataCaisseEntree[i].designationAr, value: this.dataCaisseEntree[i].code })
        }
        this.listCaisseEntreeRslt = this.listCaisseEntreePushed;
      });


      this.paramService.GetCaisseByCode(this.selectedCaisseSortie).pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';

          this.errorHandler.handleError(error);
          return throwError(errorMessage);
        })

      ).subscribe((data: any) => { 
       
        this.DeviseCaisse  = data.deviseDTO.designationAr;
        this.codeDevise = data.deviseDTO.code;


        this.paramService.GetTauxDeChangeByCodeDevise(data.deviseDTO.code).pipe(
          catchError((error: HttpErrorResponse) => {
            let errorMessage = '';
  
            this.errorHandler.handleError(error);
            return throwError(errorMessage);
          })
  
        ).subscribe((data: any) => { 
          
          this.TauxChange = data.tauxChange;
  
        });

        
      });

      





  
    }
  }



  GetSoldeCaisse(codeCaisse:number){ 
      this.recette_service.GetSoldeCaisseByCodeCaisse(codeCaisse).pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
  
          this.errorHandler.handleError(error);
          return throwError(errorMessage);
        })
  
      ).subscribe((data: any) => { 
        let debit = data.debit;
        let credit = data.credit;
  
        this.sodleCaisseSortie = debit - credit;
  
      });
 
    } 

    
    GetSoldeCaisseEntree(codeCaisse:number){
 
        this.recette_service.GetSoldeCaisseByCodeCaisse(codeCaisse).pipe(
          catchError((error: HttpErrorResponse) => {
            let errorMessage = '';
    
            this.errorHandler.handleError(error);
            return throwError(errorMessage);
          })
    
        ).subscribe((data: any) => { 
          let debit = data.debit;
          let credit = data.credit;
    
          this.soldeCaisseEntree = debit - credit;
    
        });
    }
 
  // selectedTypeRecette: any;
  // dataTypeRecetteDde = new Array<Caisse>();
  // listTypeRecettePushed = new Array<any>();
  // listTypeRecetteRslt = new Array<any>();
  // GetTypeRecette() {
  //   this.paramService.GetTypeRecette().pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       let errorMessage = '';

  // this.errorHandler.handleError(error); 
  //       return throwError(errorMessage);
  //     })
  //   ).subscribe((data: any) => {
  //     this.dataTypeRecetteDde = data;
  //     this.listTypeRecettePushed = [];
  //     for (let i = 0; i < this.dataTypeRecetteDde.length; i++) {
  //       this.listTypeRecettePushed.push({ label: this.dataTypeRecetteDde[i].designationAr, value: this.dataTypeRecetteDde[i].code })
  //     }
  //     this.listTypeRecetteRslt = this.listTypeRecettePushed;
  //   })
  // }

  selectedDevise: any;
  dataDevise = new Array<Devise>();
  listDevisePushed = new Array<any>();
  listDeviseRslt = new Array<any>();
  GetDevise() {
    this.paramService.GetDevise().pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        this.errorHandler.handleError(error);
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




  GetTransfertCaisseByCode() {
    // this.recette_service.GetAllTransfertCaisseByCode(this.selectedTransfertCaisse.code).pipe(
    //   catchError((error: HttpErrorResponse) => {
    //     let errorMessage = '';

    // this.errorHandler.handleError(error); 
    //     return throwError(errorMessage);
    //   })
    // ).subscribe((data: any) => {
    //   this.listDetailsTypeRecette = data.detailsTransfertCaisseDTOs;


    //   for (let i = 0; i < this.listDetailsTypeRecette.length; i++) {
    //     this.listDetailsTypeRecette[i].code = data.detailsTransfertCaisseDTOs[i].codeTypeRecette;
    //   }
    //   this.ValueMntChanged(data);
    // })
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
      // this.recette_service.GetTransfertCaisseByEtatApprouved(this.selectedEtatApprouve.code).pipe(
      //   catchError((error: HttpErrorResponse) => {
      //     let errorMessage = '';

      // this.errorHandler.handleError(error); 
      //     return throwError(errorMessage);
      //   })
      // ).subscribe((data: any) => {
      //   this.loadingComponent.IsLoading = false;
      //   this.IsLoading = false;

      //   this.dataTransfertCaisse = data;
      //   this.onRowUnselect(event);

      // })

    }
  }



  Total: number = 0;
  TotalEnDevisePrincipal: number = 0
  montantDevise: number = 0;
  ValueMntChanged(index: number) {

    if (this.selectedDevise == '' || this.TauxChange == 0) {
      alertifyjs.set('notifier', 'position', 'top-left');
      alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + `الرجاء إختر عملة أو تاكد من سعر الصرف`);

    } else {



      let y = this.montant * this.TauxChange;
      this.montantEnDevise = y.toFixed(3);



    }



  }
  // myNumber: number = 0;
  GetTauxDeChange() {
    this.paramService.GetTauxDeChangeByCodeDevise(this.selectedDevise).pipe(

      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error?.detail == "Cannot invoke \"com.DevPointSystem.Comptabilite.Parametrage.domaine.TauxDeChange.getCode()\" because \"domaine\" is null") {

          alertifyjs.set('notifier', 'position', 'top-left');
          alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + ` لا يوجد سعر صرف للعملة`);
          this.TauxChange = 0;
        } else {


          this.errorHandler.handleError(error);
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
  ApprouveTransfertCaisse() {
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
        this.recette_service.CancelApprouveAC(body).pipe(
          catchError((error: HttpErrorResponse) => {
            let errorMessage = '';


            this.errorHandler.handleError(error);

            return throwError(errorMessage);
          })

        ).subscribe(

          (res: any) => {
            alertifyjs.set('notifier', 'position', 'top-left');
            alertifyjs.success('<i class="success fa fa-chevron-down" aria-hidden="true" style="margin: 5px 5px 5px;"></i>' + "تم التحيين");

            this.clearForm();
            this.ngOnInit();
            this.onRowUnselect(event);
            this.clearSelected();
            this.visibleModal = false;
            this.visDelete = false;
            this.visibleModalPrint = false;
            this.clearSelected();
            this.visibleModalApprove = false;
            this.visbileModalPassword = false;
            this.visibleModalPrint = false;
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
        this.recette_service.ApprouveAc(body).pipe(
          catchError((error: HttpErrorResponse) => {
            let errorMessage = '';


            this.errorHandler.handleError(error);

            return throwError(errorMessage);
          })

        ).subscribe(

          (res: any) => {
            alertifyjs.set('notifier', 'position', 'top-left');
            alertifyjs.success('<i class="success fa fa-chevron-down" aria-hidden="true" style="margin: 5px 5px 5px;"></i>' + "تم الإعتماد ");

            this.clearForm();
            this.ngOnInit();
            this.onRowUnselect(event);
            this.clearSelected();
            this.visDelete = false;
            this.visibleModalPrint = false;
            this.clearSelected();
            this.visibleModal = false;
            this.visibleModalApprove = false;
            this.visbileModalPassword = false;
            this.visibleModalPrint = false;

          }
        );
      }

    }
  }


  decryptedValue: string = '';
  approveAC(mode: string) {


    const encryptedValue = sessionStorage.getItem('PassAnnApprouveTC');
    if (encryptedValue) {

      this.decryptedValue = this.encryptionService.decrypt(encryptedValue);

    } else {
      this.decryptedValue = 'No value found in session';
    }
    if (this.password != this.decryptedValue) {
      alertifyjs.set('notifier', 'position', 'top-left');
      alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;"></i>' + " Password Error");

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

        this.GetCaisseEntree();
        this.GetCaisseSortie();
        this.GetDevise();
        this.GetTransfertCaisseByCode();

      } else if (mode === 'CancelApproveModal') {
        contextMenu.setAttribute('data-target', '#ModalApprove');
        this.formHeader = "إلغاء الإعتماد";
        this.visibleModalApprove = true;
        this.visDelete = false;
        this.visibleModal = false;
        this.visibleModalPrint = false;

        this.onRowSelect;
        this.GetCaisseEntree();
        this.GetCaisseSortie();
        this.GetDevise();
        this.GetTransfertCaisseByCode();

      }

    }


  }

  approveACDirect(mode: string) {
    if (this.selectedTransfertCaisse == undefined || this.selectedTransfertCaisse.code == undefined) {
      alertifyjs.set('notifier', 'position', 'top-left');
      alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + ` الرجاء إختيار سطر `);
      this.visibleModalApprove = false;
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

        this.GetCaisseEntree();
        this.GetCaisseSortie();
        this.GetDevise();
        this.GetTransfertCaisseByCode();

      }
    }




  }



  OpenPasswordModal(mode: string) {

    if (this.selectedTransfertCaisse == null) {
      alertifyjs.set('notifier', 'position', 'top-left');
      alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;"></i>' + "الرجاء إختبار سطر ");
      this.visibleModalApprove = false;
      this.visDelete = false;
      this.visibleModal = false;
      this.visibleModalPrint = false;
      this.visbileModalPassword = false;
    } else {


      if (this.selectedValue == 1) {
        alertifyjs.set('notifier', 'position', 'top-left');
        alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;"></i>' + "التحويل ليس مأكد");

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
  }


  selectedModeReglement: any;
  dataModeReglement = new Array<Caisse>();
  listModeReglementPushed = new Array<any>();
  listModeReglementRslt = new Array<any>();
  GetModeReglement() {
    this.paramService.GetModeReglement().pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        this.errorHandler.handleError(error);
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

}