import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuRecettesComponent } from './menu-recettes.component'; 
import { MouvementCaisseComponent } from './mouvement-caisse/mouvement-caisse.component';
import { EntreeCaisseComponent } from './entree-caisse/entree-caisse.component';
import { EditionRecetteComponent } from '../edition-recette/edition-recette.component';
import { TransfertEntreCaisseComponent } from './transfert-entre-caisse/transfert-entre-caisse.component';
import { SoldeCaisseComponent } from './solde-caisse/solde-caisse.component';

const routes: Routes = [{ path: '', component: MenuRecettesComponent },

  {
    path: 'mouvemenet_caisse',
    component: MouvementCaisseComponent ,
    data:{title:'حركة الخزينة' , icon :'fas fa-right-left'}
  },
  {
    path: 'entree_caisse',
    component: EntreeCaisseComponent ,
    data:{title:'دخول أموال',icon:'fas fa-download'}
  }, {
    path: 'edition',
    component: EditionRecetteComponent ,
    data:{title:'يبانات' ,icon:'fas fa-tablet'},
     
  }
  , {
    path: 'transfert_caisse',
    component: TransfertEntreCaisseComponent ,
    data:{title:' تحويل بين الخزائن ' , icon:'fas fa-money-bill-transfer'}
  }
  , {
    path: 'solde_caisse',
    component: SoldeCaisseComponent ,
    data:{title:'أرصدة الخزائن',icon:'fas fa-bars'}
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRecettesRoutingModule { }
