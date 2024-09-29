import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'; 
import { Location } from '@angular/common';
 
import { AuthService } from 'src/app/Authenfication/_services/auth.service';
import { TokenStorageService } from 'src/app/Authenfication/_services/token-storage.service';
import { Router } from '@angular/router';

import * as alertifyjs from 'alertifyjs'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-Session',
  templateUrl: './Session.component.html',
  styleUrls: ['./Session.component.scss'],

})
export class SessionComponent implements OnInit {
  constructor(  private modalService: BsModalService, location: Location,
    public dialogRef: MatDialogRef<SessionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {this.location = location; }
  location: Location;
  ngOnInit(): void {
    // You can access the error data passed from the component that called this modal
    console.log('Error data:', this.data); 
  }
  form: any = {
    userName: null,
    password: null
  };
  alerte = "";
  // Close the modal
  close(): void {
    this.dialogRef.close();
  }

  afficheInput = true;
  name = sessionStorage.getItem('userName');
  mess = "Vous n'êtes pas " + this.name + " ?";
  routing() {
    this.modalService.hide();
  }
}