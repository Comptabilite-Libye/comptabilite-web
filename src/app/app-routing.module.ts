import { NgModule } from '@angular/core';
import { RouterModule, Routes ,PreloadAllModules } from '@angular/router'; 
import { HomeComponent } from './Authenfication/home/home.component';
import { LoginComponent } from './Authenfication/login/login.component'; 
import { RegisterComponent } from './Authenfication/register/register.component';
import { MenuParametrageComponent } from './MenuParametrage/menu-parametrage/menu-parametrage.component';
import { CaisseComponent } from './MenuParametrage/caisse/caisse.component';
import { TypeDepenseComponent } from './MenuParametrage/type-depense/type-depense.component';
import { TypeRecetteComponent } from './MenuParametrage/type-recette/type-recette.component';
import { MenuRecetteComponent } from './Recette/menu-recette/menu-recette.component';
import { EntreeCaisseComponent } from './Recette/entree-caisse/entree-caisse.component';
import { DeviseComponent } from './MenuParametrage/devise/devise.component';
import { BeneficiaireComponent } from './MenuParametrage/beneficiaire/beneficiaire.component';
import { FournisseurComponent } from './MenuParametrage/fournisseur/fournisseur.component';
import { BanqueComponent } from './MenuParametrage/banque/banque.component';
import { EditionRecetteComponent } from './Recette/edition-recette/edition-recette.component';
import { ErrorStatusComponent } from './Shared/error-status/error-status.component';
import { ModeReglementComponent } from './MenuParametrage/mode-reglement/mode-reglement.component';
import { TauxChangeComponent } from './MenuParametrage/taux-change/taux-change.component';

const routes: Routes = [
 
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },


  { path: 'menu_parametrage', component: MenuParametrageComponent },
 
  { path: 'menu_parametrage/caisse', component: CaisseComponent },
  { path: 'menu_parametrage/type_depense', component: TypeDepenseComponent },
  { path: 'menu_parametrage/type_recette', component: TypeRecetteComponent },
  { path: 'menu_parametrage/devise', component: DeviseComponent },
  { path: 'menu_parametrage/beneficiaire', component: BeneficiaireComponent },
  { path: 'menu_parametrage/fournisseur', component: FournisseurComponent },
  { path: 'menu_parametrage/banque', component: BanqueComponent },
  { path: 'menu_parametrage/mode_reglement', component: ModeReglementComponent },
  { path: 'menu_parametrage/taux_change', component: TauxChangeComponent },


  { path: 'menu_recette', component: MenuRecetteComponent },
  { path: 'menu_recette/entree_caisse', component: EntreeCaisseComponent },
  { path: 'menu_recette/edition', component: EditionRecetteComponent }, 
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
