import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api'; 

@Component({
  selector: 'app-menu-parametrages',
  templateUrl: './menu-parametrages.component.html',
  styleUrls: ['./menu-parametrages.component.css', '.../../../src/assets/files/css/StyleMenu.css'] 
})
export class MenuParametragesComponent implements OnInit{
  ngOnInit(): void {
    
   
  }
 
  // items: MenuItem[] | undefined;
  showCaisse :boolean= true;

  closeCaisse() {
    this.showCaisse = false;
  }
 
}
