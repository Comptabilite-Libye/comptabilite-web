import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuParametragesComponent } from './menu-parametrages.component';
import { TypeDepenseComponent } from './type-depense/type-depense.component';
import { CaisseComponent } from './caisse/caisse.component';
import { TypeRecetteComponent } from './type-recette/type-recette.component';
import { DeviseComponent } from './devise/devise.component';
import { BeneficiaireComponent } from './beneficiaire/beneficiaire.component';
import { BanqueComponent } from './banque/banque.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { ModeReglementComponent } from './mode-reglement/mode-reglement.component';
import { TauxChangeComponent } from './taux-change/taux-change.component';
import { TypeCaisseComponent } from './type-caisse/type-caisse.component';

const routes: Routes = [{ path: '', component: MenuParametragesComponent },

  {
    path: 'caisse',
    component: CaisseComponent ,
    data:{title:'  الخزائن' , icon :'fas fa-circle-dollar-to-slot'}
  },
  {
    path: 'type_depense',
    component: TypeDepenseComponent ,
    data:{title:' أنواع المصروافات',icon:'fas fa-list-ul'}
  }, {
    path: 'type_recette',
    component: TypeRecetteComponent ,
    data:{title:' أنواع الإيرادات ' ,icon:'fas fa-list-ul'},
     
  }
  , {
    path: 'devise',
    component: DeviseComponent ,
    data:{title:'العملات' , icon:'fas fa-rectangle-list'}
  }
  , 
  {
    path: 'beneficiaire',
    component: BeneficiaireComponent ,
    data:{title:'المستفيدين ',icon:'fas fa-elevator'}
  }, 
  {
    path: 'fournisseur',
    component: FournisseurComponent ,
    data:{title:'الموردين',icon:'fas fa-users'}
  },
   {
    path: 'banque',
    component: BanqueComponent ,
    data:{title:'المصارف',icon:'fas fa-landmark'}
  },
  {
    path: 'mode_reglement',
    component: ModeReglementComponent ,
    data:{title:' طريقة الدفع ',icon:'fas fa-money-bill-wave'}
  },
  {
    path: 'taux_change',
    component: TauxChangeComponent ,
    data:{title:'  سعر الصرف  ',icon:'fas fa-file-invoice-dollar'}
  },
  {
    path: 'type_caisse',
    component: TypeCaisseComponent ,
    data:{title:'أنواع الخزائن  ',icon:'fas fa-bars'}
  }




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuParametragesRoutingModule { }
