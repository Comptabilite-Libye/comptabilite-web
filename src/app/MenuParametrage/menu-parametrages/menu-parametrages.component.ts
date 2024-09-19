import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-parametrages',
  templateUrl: './menu-parametrages.component.html',
  styleUrls: ['./menu-parametrages.component.css', '.../../../src/assets/files/css/StyleMenu.css']
})
export class MenuParametragesComponent implements OnInit{
  ngOnInit(): void {
   
  }
  showCaisse :boolean= true;

  closeCaisse() {
    this.showCaisse = false;
  }
}
