import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuParametragesRoutingModule } from './menu-parametrages-routing.module';
import { MenuParametragesComponent } from './menu-parametrages.component';
 


@NgModule({
  declarations: [
    MenuParametragesComponent
  ],
  imports: [
    CommonModule,
    MenuParametragesRoutingModule
  ]
})
export class MenuParametragesModule { }
