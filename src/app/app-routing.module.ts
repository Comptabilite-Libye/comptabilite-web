import { NgModule } from '@angular/core';
import { RouterModule, Routes ,PreloadAllModules } from '@angular/router'; 
import { HomeComponent } from './Authenfication/home/home.component';
import { LoginComponent } from './Authenfication/login/login.component'; 
import { RegisterComponent } from './Authenfication/register/register.component'; 
const routes: Routes = [
 
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },


  // { path: 'menu_access', component: AccessComponent },

  // { path: 'first-module', loadChildren: () => import('./modules/first-module/first-module.module').then(m => m.FirstModuleModule) },

  { path: 'menu_access', loadChildren: () => import('../app/Authenfication/access/access.module').then(m => m.AccessModule) },
  // { path: 'menu_parametrage', component: MenuParametrageComponent },
 
  // { path: 'menu_parametrage/caisse', component: CaisseComponent },
  // { path: 'menu_parametrage/type_depense', component: TypeDepenseComponent },
  // { path: 'menu_parametrage/type_recette', component: TypeRecetteComponent },
  // { path: 'menu_parametrage/devise', component: DeviseComponent },
  // { path: 'menu_parametrage/beneficiaire', component: BeneficiaireComponent },
  // { path: 'menu_parametrage/fournisseur', component: FournisseurComponent },
  // { path: 'menu_parametrage/banque', component: BanqueComponent },
  // { path: 'menu_parametrage/mode_reglement', component: ModeReglementComponent },
  // { path: 'menu_parametrage/taux_change', component: TauxChangeComponent },
  // { path: 'menu_parametrage/type_caisse', component: TypeCaisseComponent },


  // { path: 'menu_recette', component: MenuRecettesComponent },
  // { path: 'menu_recette/entree_caisse', component: EntreeCaisseComponent },
  // { path: 'menu_recette/edition', component: EditionRecetteComponent }, 
  // { path: 'menu_recette/transfert_caisse', component: TransfertEntreCaisseComponent }, 
  // { path: 'menu_recette/solde_caisse', component: SoldeCaisseComponent }, 
  // { path: 'menu_recette/mouvemenet_caisse', component: MouvementCaisseComponent },
 
  { path: 'menu_recette', loadChildren: () => import('./Recette/menu-recettes/menu-recettes.module').then(m => m.MenuRecettesModule), data:{title:'الإيرادات',icon:'fas fa-square-caret-down'}},
 
  { path: 'menu_parametrage', loadChildren: () => import('./MenuParametrage/menu-parametrages/menu-parametrages.module').then(m => m.MenuParametragesModule) , data:{title:'الإعدادات العامة',icon:'fas fa-gear'}},
 
  { path: 'menu_depense', loadChildren: () => import('./menu-depenses/menu-depenses.module').then(m => m.MenuDepensesModule) , data:{title:' المصروفات',icon:'fas fa-square-caret-up'}}, 
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
