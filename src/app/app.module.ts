
import { NgModule, ViewEncapsulation } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MatIconModule } from '@angular/material/icon'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DialogModule } from 'primeng/dialog';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import {MatTreeModule} from '@angular/material/tree';

import { TreeModule } from 'primeng/tree';
/////////////////////////////// 

import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ContextMenuModule } from 'primeng/contextmenu';
import { LoginComponent } from './Authenfication/login/login.component';
import { RegisterComponent } from './Authenfication/register/register.component';
import { authInterceptorProviders, AuthInterceptor } from './Authenfication/_helpers/auth.interceptor';
import { BarTimeComponent } from './Authenfication/bar-time/bar-time.component';
import { HomeComponent } from './Authenfication/home/home.component';
import { NavbarComponent } from './Authenfication/navbar/navbar.component';
import { BanqueComponent } from './MenuParametrage/menu-parametrages/banque/banque.component';
import { BeneficiaireComponent } from './MenuParametrage/menu-parametrages/beneficiaire/beneficiaire.component';
import { CaisseComponent } from './MenuParametrage/menu-parametrages/caisse/caisse.component';
import { DeviseComponent } from './MenuParametrage/menu-parametrages/devise/devise.component';
import { FournisseurComponent } from './MenuParametrage/menu-parametrages/fournisseur/fournisseur.component';
import { TypeDepenseComponent } from './MenuParametrage/menu-parametrages/type-depense/type-depense.component';
import { EntreeCaisseComponent } from './Recette/menu-recettes/entree-caisse/entree-caisse.component';
import { LoadingComponent } from './Shared/loading/loading.component';
import { EditionListAlimentationCaisseComponent } from './Recette/menu-recettes/edition-recette/edition-list-alimentation-caisse/edition-list-alimentation-caisse.component';
import { CommonModule, DatePipe } from '@angular/common';
import { ModeReglementComponent } from './MenuParametrage/menu-parametrages/mode-reglement/mode-reglement.component';
import { AlertComponent } from './Authenfication/alert/alert.component';
import { TauxChangeComponent } from './MenuParametrage/menu-parametrages/taux-change/taux-change.component';
import { SignatureUserComponent } from './Authenfication/access/signature-user/signature-user.component';
import { TransfertEntreCaisseComponent } from './Recette/menu-recettes/transfert-entre-caisse/transfert-entre-caisse.component';
import { SoldeCaisseComponent } from './Recette/menu-recettes/solde-caisse/solde-caisse.component';
// import { MouvementCaisseComponent } from './Recette/menu-recettes/mouvement-caisse/mouvement-caisse.component'; 
import { TypeCaisseComponent } from './MenuParametrage/menu-parametrages/type-caisse/type-caisse.component';


import { BreadcrumbComponent } from './Authenfication/breadcrumb/breadcrumb.component';
import { MouvementCaisseComponent } from './Recette/menu-recettes/mouvement-caisse/mouvement-caisse.component';
import { TypeRecetteComponent } from './MenuParametrage/menu-parametrages/type-recette/type-recette.component';
import { EditionRecetteComponent } from './Recette/menu-recettes/edition-recette/edition-recette.component';
import { ModalContentComponent } from './Authenfication/shared/modal-content/modal-content.component';
import { SessionComponent } from './Shared/Session/Session.component';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ApppComponent } from './appp.component';
import { DepenseDiversComponent } from './menu-depenses/depense-divers/depense-divers.component';
import { EditionDepenseComponent } from './menu-depenses/edition-depense/edition-depense.component';
import { FactureFournisseurComponent } from './menu-depenses/facture-fournisseur/facture-fournisseur.component';
import { FacturePrestationComponent } from './menu-depenses/facture-prestation/facture-prestation.component';
import { ReglementFactureFournisseurComponent } from './menu-depenses/reglement-facture-fournisseur/reglement-facture-fournisseur.component';
import { ReglementFacturePrestationComponent } from './menu-depenses/reglement-facture-prestation/reglement-facture-prestation.component';
import { CategorieDepenseComponent } from './MenuParametrage/menu-parametrages/categorie-depense/categorie-depense.component';
import { ButtonModule } from 'primeng/button';
import { TypeCostCentreComponent } from './MenuParametrage/menu-parametrages/type-cost-centre/type-cost-centre.component';
import { CostCentreComponent } from './MenuParametrage/menu-parametrages/cost-centre/cost-centre.component';



export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    HttpClientModule,
    CheckboxModule,
    ReactiveFormsModule,
    ToastModule, CommonModule,
    MatIconModule, ContextMenuModule,
    DialogModule,
    BrowserModule,
    BrowserAnimationsModule,
    CalendarModule,
    AppRoutingModule,
    FormsModule,MatTreeModule ,
    TableModule,
    DropdownModule
    , ConfirmDialogModule,ButtonModule,
    BadgeModule,TreeModule,
    RadioButtonModule, FormsModule, BreadcrumbModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
   

  ],
  declarations: [
    AppComponent,
    LoginComponent, ModalContentComponent,
    RegisterComponent, 

    HomeComponent,
    NavbarComponent,
    BarTimeComponent,
    CaisseComponent,
    LoadingComponent,
    SessionComponent,
    AlertComponent
    , SignatureUserComponent, BreadcrumbComponent   ,
 
    //// parametrageComponent
    TypeDepenseComponent, 
    TypeRecetteComponent, ModeReglementComponent,
    DeviseComponent, TauxChangeComponent,
    BeneficiaireComponent, TypeCaisseComponent,
    FournisseurComponent,
    BanqueComponent, CategorieDepenseComponent,



    //RecetteComponent
    FactureFournisseurComponent, FacturePrestationComponent, DepenseDiversComponent, EditionDepenseComponent, ReglementFactureFournisseurComponent, ReglementFacturePrestationComponent,
    EntreeCaisseComponent, TransfertEntreCaisseComponent, MouvementCaisseComponent,
    EditionListAlimentationCaisseComponent, SoldeCaisseComponent
    , EditionRecetteComponent, TypeCostCentreComponent, CostCentreComponent,
  ],

  providers: [DatePipe, LoadingComponent, ApppComponent, HttpClient, MessageService, BsModalRef, SessionComponent,
    authInterceptorProviders,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule {
}

