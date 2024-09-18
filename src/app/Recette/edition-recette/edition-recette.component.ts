import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import * as alertifyjs from 'alertifyjs'

import { ParametrageService } from 'src/app/MenuParametrage/menu-parametrages/WService/parametrage.service';
import { TypeRecette } from 'src/app/MenuParametrage/menu-parametrages/domaine/domaine';
import { MessageService, ConfirmationService, PrimeNGConfig, SelectItem } from 'primeng/api';
import { DatePipe } from '@angular/common'; 
import { Calendar } from 'primeng/calendar';
import { ErrorHandlerService } from 'src/app/Shared/TranslateError/error-handler-service.service';
   
declare const PDFObject: any;

@Component({
  selector: 'app-edition-recette',
  templateUrl: './edition-recette.component.html',
  styleUrls: ['./edition-recette.component.css', '.../../../src/assets/files/css/StyleMenu.css', '.../../../src/assets/files/css/style.css'], providers: [ConfirmationService, MessageService]
})


export class EditionRecetteComponent implements OnInit {
  constructor(private errorHandler: ErrorHandlerService,public primengConfig: PrimeNGConfig, private param_service: ParametrageService, private datePipe: DatePipe) {
    this.setLangAR();
    this.primengConfig.translationObserver.subscribe(res => console.log(res));
  }

  @ViewChild('calendar') calendar!: Calendar;
  ngOnInit(): void {
  }  
  setLangAR() {
    this.primengConfig.setTranslation(this.ar);
  } 
  ar = {
    firstDayOfWeek:6, // Sunday (Adjust based on your region's convention)
    dayNames: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    dayNamesShort: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    dayNamesMin:['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    monthNames: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو','يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    monthNamesShort: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو','يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    today: 'اليوم',
    clear: 'مسح',
    dateFormat: 'dd/mm/yy',
    weekHeader: 'أسبوع'
  };



  visibleModalAlimentationCaisse: boolean = false; 
  visibleModalPrint : boolean = false; 
  formHeader: string = ""; 
  dateDeb: any;
  dateFin:any;
  selectedTypeRectte: any;
  


  closeForm() {
    this.visibleModalAlimentationCaisse = false;
    this.visibleModalPrint = false;
  }

  pdfData!: Blob;
  isLoading = false;
  RemplirePrint(): void { 
    this.param_service.getPDFf().subscribe((blob: Blob) => {
      const reader = new FileReader();
      const binaryString = reader.readAsDataURL(blob);
      reader.onload = (event: any) => {
        this.pdfData = event.target.result;
        this.isLoading = false;
        if (this.pdfData) {
          this.handleRenderPdf(this.pdfData);
          this.selectedTypeRectte = '';
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


  public onOpenModal(mode: string) {

    this.visibleModalAlimentationCaisse = false;
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#Modal');
      this.formHeader = "دخول أموال في فترة"
      this.GetTypeRecette();
      this.visibleModalAlimentationCaisse = true;

    }
    if (mode === 'Print') {
      button.setAttribute('data-target', '#ModalPrint');
      this.formHeader = " xxxx "
      this.visibleModalPrint = true;
      this.RemplirePrint();
    }
    if (mode === 'edit') {




    }

    if (mode === 'Delete') {



    }



  }

  dataTypeRecetteDde = new Array<TypeRecette>();
  listTypeRecettePushed = new Array<any>();
  listTypeRecette = new Array<any>();
  GetTypeRecette() {
    this.param_service.GetTypeRecette().pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        this.errorHandler.handleError(error); 
        return throwError(errorMessage);
      })

    ).subscribe((data: any) => {
      this.dataTypeRecetteDde = data;
      this.listTypeRecettePushed = [];
      for (let i = 0; i < this.dataTypeRecetteDde.length; i++) {
        this.listTypeRecettePushed.push({ label: this.dataTypeRecetteDde[i].designationAr, value: this.dataTypeRecetteDde[i].code })
      }
      this.listTypeRecette = this.listTypeRecettePushed;
    })
  }

}