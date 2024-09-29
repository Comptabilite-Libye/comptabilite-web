import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRecettesRoutingModule } from './menu-recettes-routing.module';
import { MenuRecettesComponent } from './menu-recettes.component'; 
import { TableModule } from 'primeng/table';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MaterialModule } from 'src/app/Shared/material.module';
@NgModule({
  declarations: [
    MenuRecettesComponent
  ],
  imports: [
    CommonModule,     MaterialModule,
    MenuRecettesRoutingModule,TableModule,MatIconModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class MenuRecettesModule { }
