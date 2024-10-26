import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuDepensesRoutingModule } from './menu-depenses-routing.module';
import { MenuDepensesComponent } from './menu-depenses.component';
import { EditionDepenseComponent } from './edition-depense/edition-depense.component';
import { FactureFournisseurComponent } from './facture-fournisseur/facture-fournisseur.component';
import { FacturePrestationComponent } from './facture-prestation/facture-prestation.component';
import { DepenseDiversComponent } from './depense-divers/depense-divers.component';
import { ReglementFactureFournisseurComponent } from './reglement-facture-fournisseur/reglement-facture-fournisseur.component';
import { ReglementFacturePrestationComponent } from './reglement-facture-prestation/reglement-facture-prestation.component';
import { BadgeModule } from 'primeng/badge';


@NgModule({
  declarations: [
    MenuDepensesComponent, 
  ],
  imports: [
    CommonModule,
    MenuDepensesRoutingModule,BadgeModule
  ]
})
export class MenuDepensesModule { }
