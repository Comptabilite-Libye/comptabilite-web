
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';
import { Table } from 'primeng/table';
import { DomSanitizer } from '@angular/platform-browser';
import * as alertifyjs from 'alertifyjs'
import { User } from '../../domaine/user';
import { UserService } from '../../_services/user.service';
import { LoadingComponent } from 'src/app/Shared/loading/loading.component';


declare const PDFObject: any;
@Component({
  selector: 'app-signature-user',
  templateUrl: './signature-user.component.html',
  styleUrls: ['./signature-user.component.css', '.../../../src/assets/files/css/style.css'], providers: [ConfirmationService, MessageService]
})

export class SignatureUserComponent {

  openModal!: boolean;
  IsLoading = true;

  constructor(private loadingComponent: LoadingComponent, private _sanitizer: DomSanitizer, private confirmationService: ConfirmationService, private accessService: UserService, private messageService: MessageService, private http: HttpClient, private fb: FormBuilder, private cdr: ChangeDetectorRef) {


  }
  pdfData!: Blob;
  isLoading = false;
  ngOnInit(): void {

    this.GelAllUser();





  }





  clear(table: Table) {
    table.clear();
    this.searchTerm = '';
  }

  clearForm() {
    this.id == undefined;
    this.userName = '';
    this.password = '';
    this.actif = false;
    this.fullName = '';
    this.onRowUnselect(event);

  }
  check_actif = false;
  check_inactif = false;

  formHeader = ".....";
  searchTerm = '';
  visibleModal: boolean = false;
  visibleModalPrint: boolean = false;
  visDelete: boolean = false;

  id!: number | null;
  userName: any;
  password!: string;
  actif!: boolean;
  fullName!: string;
  signature!: any;

  selectedUser: any;

  onRowSelect(event: any) {
    this.id = event.data.id;
    this.actif = event.data.actif;
    this.userName = event.data.userName;
    this.password = event.data.passwordDecry;
    this.fullName = event.data.fullName;
    this.signature = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
      + event.data.signature);
    console.log('vtData : ', event);
  }
  onRowUnselect(event: any) {
    console.log('row unselect : ', event);
    this.id = event.data = null;
  }

  removeWhitespaceUsingReplaceMethod() {
    let inputString: string = this.userName;
    let outputString: string = inputString
      .split("")
      .filter((char) => char !== " ")
      .join("");
    this.userName = outputString;
  }


  clearSelected(): void {
    this.id == undefined;
    this.userName = '';
    this.password = '';
    this.fullName = '';
    this.signature = '';
    this.actif = false;
  }

  dis: boolean = false;
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
      this.visibleModal = true;
      this.id == undefined;
      this.dis = false;

    }
    if (mode === 'edit') {


      if (this.id == undefined) {
        // alert("Choise A row Please");

        //  
        this.clearForm();
        this.onRowUnselect(event);
        alertifyjs.set('notifier', 'position', 'top-left');
        alertifyjs.error("Choise A row Please");
        this.visDelete == false && this.visibleModal == false
      } else {

        button.setAttribute('data-target', '#Modal');
        this.formHeader = "تعديل "

        this.dis = true;
        this.visibleModal = true;
        this.onRowSelect;

      }

    }



  }


  fileReaderRst!: string;
  defaultSignature = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
  PostUser(event: any) {
    let UserSession = sessionStorage.getItem("userName")
    if (!this.userName || !this.password || !this.fullName) {
      alertifyjs.set('notifier', 'position', 'top-left');
      alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;"></i>' + " Field Required");

    } else {
      if (this.fileReaderRst == null) {
        this.fileReaderRst = this.defaultSignature
      } else {

      }

      let body = {
        userName: this.userName,
        password: this.password,
        passwordDecry: this.password,
        actif: this.actif,
        userCreate: UserSession,
        fullName: this.fullName,
        dateCreate: new Date().toISOString(), //
        id: this.id,

        sig: this.fileReaderRst,


      }
      if (this.id != null) {
        body['id'] = this.id;

        this.accessService.UpdateUser(body).pipe(
          catchError((error: HttpErrorResponse) => {
            let errorMessage = '';
            alertifyjs.set('notifier', 'position', 'top-left');
            alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + ` ${error.error?.detail}`);

            return throwError(errorMessage);
          })


        ).subscribe(

          (res: any) => {
            alertifyjs.set('notifier', 'position', 'top-left');
            alertifyjs.success('<i class="success fa fa-chevron-down" aria-hidden="true" style="margin: 5px 5px 5px;"></i>' + "تم التحيين");
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
        this.accessService.PostUser(body).pipe(
          catchError((error: HttpErrorResponse) => {
            let errorMessage = '';
            alertifyjs.set('notifier', 'position', 'top-left');
            alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + ` ${error.error?.detail}`);

            return throwError(errorMessage);
          })

        ).subscribe(
          (res: any) => {
            alertifyjs.set('notifier', 'position', 'top-left');
            alertifyjs.success('<i class="success fa fa-chevron-down" aria-hidden="true" style="margin: 5px 5px 5px;"></i>' + "Success Saved");
            this.visibleModal = false;
            this.clearForm();
            this.ngOnInit();
            this.id;
            this.check_actif = true;
            this.check_inactif = false;
            this.onRowUnselect(event);
            this.clearSelected();

          }
        )
      }
    }


  }

  // departements!: Array<Departement>;
  // Voids(): void {
  //   // this.departements = [

  //   // ].sort((car1, car2) => {
  //   //   return 0;
  //   // });

  // }


  public remove(index: number): void {
    this.listDesig.splice(index, 1);
    console.log(index);
  }
  compteur: number = 0;
  listDesig = new Array<any>();

  dataUser = new Array<User>();
  // banque: any;
  GelAllUser() {
    this.accessService.GetUserWithPassword().pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        alertifyjs.set('notifier', 'position', 'top-left');
        alertifyjs.error('<i class="error fa fa-exclamation-circle" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + ` ${error.error?.detail}`);

        return throwError(errorMessage);
      })


    ).subscribe((data: any) => {

      this.loadingComponent.IsLoading = false;
      this.IsLoading = false;

      this.dataUser = data;
      this.onRowUnselect(event);

    })
  }

  FileUploaded!: any;
  uploadedFiles: any[] = [];
  fil64: any;
  // click(event: any) { 
  // }

  onUpload(event: any) {
    let fileReader = new FileReader();
    for (let file of event.files) {
      fileReader.readAsDataURL(file);
      fileReader.onload = function () {
        // Will print the base64 here.
        console.log(fileReader.result);
      };
    }
  }

  postmethodeSig(event: any) {
    let fileReader = new FileReader();
    for (let file of event.files) {
      fileReader.readAsDataURL(file);
      fileReader.onload = function () {
        // Will print the base64 here.
        console.log(fileReader.result);
      };
    }

  }

  getBase64(file: File) {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject('file object is null');
      }

      var reader = new FileReader();

      reader.onloadend = function () {
        resolve({ res: reader.result, name: file.name });
      };
      reader.readAsDataURL(file);
    });
  }




  selectedFile2!: File;
  retrievedImage2: any;
  base64Data2: any;
  retrieveResonse2: any;
  message2!: string;
  imageName2: any;
  //Gets called when the user selects an image
  imagePreview!: string;
  public onFileChanged(event: any) {
    //Select File
    this.selectedFile2 = event.target.files[0];
    let file = event.target.files[0];
    let fileReader = new FileReader();

    fileReader.onloadend = () => {
      const base64String = fileReader.result as string;
      console.log("base64String", base64String);
      this.fileReaderRst = base64String;
      console.log("fileReaderRst", this.fileReaderRst);
      this.signature = this.fileReaderRst;
    }
    if (file) {
      fileReader.readAsDataURL(file);

    }

  }
}
