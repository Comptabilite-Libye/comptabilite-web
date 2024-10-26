import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuParametragesRoutingModule } from './menu-parametrages-routing.module';
import { MenuParametragesComponent } from './menu-parametrages.component';
import { MatIconModule } from '@angular/material/icon'
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';

@NgModule({
  declarations: [
    MenuParametragesComponent
  ],
  imports: [
    CommonModule,BadgeModule,
    MenuParametragesRoutingModule,MatIconModule,MenuModule,ButtonModule
  ]
})
export class MenuParametragesModule { }
