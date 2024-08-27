import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { HomeComponent } from './Authenfication/home/home.component';
import { LoginComponent } from './Authenfication/login/login.component'; 
import { RegisterComponent } from './Authenfication/register/register.component';
import { MenuParametrageComponent } from './MenuParametrage/menu-parametrage/menu-parametrage.component';
import { CaisseComponent } from './MenuParametrage/caisse/caisse.component';
import { TypeDepenseComponent } from './MenuParametrage/type-depense/type-depense.component';
import { TypeRecetteComponent } from './MenuParametrage/type-recette/type-recette.component';
import { MenuRecetteComponent } from './Recette/menu-recette/menu-recette.component';
import { EntreeCaisseComponent } from './Recette/entree-caisse/entree-caisse.component';

const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },


  { path: 'menu_parametrage', component: MenuParametrageComponent },
  { path: 'menu_parametrage/caisse', component: CaisseComponent },
  { path: 'menu_parametrage/type_depense', component: TypeDepenseComponent },
  { path: 'menu_parametrage/type_recette', component: TypeRecetteComponent },


  { path: 'menu_recette', component: MenuRecetteComponent },
  { path: 'menu_recette/entree_caisse', component: EntreeCaisseComponent },

 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
