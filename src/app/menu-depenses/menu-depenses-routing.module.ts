import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuDepensesComponent } from './menu-depenses.component';
import { EditionDepenseComponent } from './edition-depense/edition-depense.component';
import { DepenseDiversComponent } from './depense-divers/depense-divers.component';
import { FacturePrestationComponent } from './facture-prestation/facture-prestation.component';
import { FactureFournisseurComponent } from './facture-fournisseur/facture-fournisseur.component';
import { ReglementFactureFournisseurComponent } from './reglement-facture-fournisseur/reglement-facture-fournisseur.component';
import { ReglementFacturePrestationComponent } from './reglement-facture-prestation/reglement-facture-prestation.component';

const routes: Routes = [{ path: '', component: MenuDepensesComponent },

  {
    path: 'edition',
    component: EditionDepenseComponent ,
    data:{title:'  البيانات' , icon :'fas fa-print'}
  },
  {
    path: 'depense_divers',
    component: DepenseDiversComponent ,
    data:{title:' مصروفات نثرية',icon:'fas fa-window-restore'}
  }, {
    path: 'facture_prestation',
    component: FacturePrestationComponent ,
    data:{title:' فواتير خدمي' ,icon:'fas fa-file-invoice'},
     
  }
  , {
    path: 'facture_fournisseur',
    component: FactureFournisseurComponent ,
    data:{title:'فاتورة' , icon:'fas fa-receipt'}
  }
  , 
  {
    path: 'reglement_facture_fournisseur',
    component: ReglementFactureFournisseurComponent ,
    data:{title:'سداد الموردين ',icon:'fas fa-file-invoice-dollar'}
  }, 
  {
    path: 'reglement_facture_prestation',
    component: ReglementFacturePrestationComponent ,
    data:{title:'سداد الفواتير الخدمية',icon:'fas fa-money-check-dollar'}
  },
  //  {
  //   path: 'banque',
  //   component: BanqueComponent ,
  //   data:{title:'المصارف',icon:'fas fa-landmark'}
  // },
  // {
  //   path: 'mode_reglement',
  //   component: ModeReglementComponent ,
  //   data:{title:' طريقة الدفع ',icon:'fas fa-money-bill-wave'}
  // },
  // {
  //   path: 'taux_change',
  //   component: TauxChangeComponent ,
  //   data:{title:'  سعر الصرف  ',icon:'fas fa-file-invoice-dollar'}
  // },
  // {
  //   path: 'type_caisse',
  //   component: TypeCaisseComponent ,
  //   data:{title:'أنواع الخزائن  ',icon:'fas fa-bars'}
  // }




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuDepensesRoutingModule { }
