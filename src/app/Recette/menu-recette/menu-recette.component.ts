import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-recette',
  templateUrl: './menu-recette.component.html',
  styleUrls: ['./menu-recette.component.css',  '.../../../src/assets/files/css/StyleMenu.css'] 
})
export class MenuRecetteComponent implements OnInit {
  items: MenuItem[] | undefined;
  ngOnInit(): void {
    this.items = [
      {
          label: 'Options',
          items: [
              {
                  label: 'Refresh',
                  icon: 'pi pi-refresh'
              },
              {
                  label: 'Export',
                  icon: 'pi pi-upload'
              }
          ]
      }
  ];
  }
}
