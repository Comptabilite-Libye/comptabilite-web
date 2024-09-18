import { Injectable } from '@angular/core';

@Injectable()
export class MenuService {

  constructor() { }

  getMenu(): Array<any> {
    const menu = [
      // { name: 'home', path: './menu_recette', children: [] },
      { 
        name: 'menu_recette', 
        path: '', 
        children: [
          {
            name: 'mvtCaisse',
            path: './mvt_caisse',
                         
            
          }
        ] 
      },
    ];

    return menu;
  }

}