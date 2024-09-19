
import {NgModule } from '@angular/core';
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

/////////////////////////////// 
import { PaginatorModule } from 'primeng/paginator';
 
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { MatRadioModule } from '@angular/material/radio';
import { DropdownModule } from 'primeng/dropdown'; 
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageService } from 'primeng/api'; 
import { CalendarModule } from 'primeng/calendar';
import { BadgeModule } from 'primeng/badge';
import {RadioButtonModule} from 'primeng/radiobutton'; 
import { ContextMenuModule } from 'primeng/contextmenu'; 
import { LoginComponent } from './Authenfication/login/login.component';
import { RegisterComponent } from './Authenfication/register/register.component';
import { authInterceptorProviders, AuthInterceptor } from './Authenfication/_helpers/auth.interceptor';
import { BarTimeComponent } from './Authenfication/bar-time/bar-time.component';
import { HomeComponent } from './Authenfication/home/home.component';
import { NavbarComponent } from './Authenfication/navbar/navbar.component';
import { SmallmodalLoginComponent } from './Authenfication/shared/smallmodal-login/smallmodal-login.component';
import { BanqueComponent } from './MenuParametrage/menu-parametrages/banque/banque.component';
import { BeneficiaireComponent } from './MenuParametrage/menu-parametrages/beneficiaire/beneficiaire.component';
import { CaisseComponent } from './MenuParametrage/menu-parametrages/caisse/caisse.component';
import { DeviseComponent } from './MenuParametrage/menu-parametrages/devise/devise.component';
import { FournisseurComponent } from './MenuParametrage/menu-parametrages/fournisseur/fournisseur.component';
import { TypeDepenseComponent } from './MenuParametrage/menu-parametrages/type-depense/type-depense.component';
 import { EntreeCaisseComponent } from './Recette/menu-recettes/entree-caisse/entree-caisse.component';
import { LoadingComponent } from './Shared/loading/loading.component'; 
import { EditionListAlimentationCaisseComponent } from './Recette/menu-recettes/edition-recette/edition-list-alimentation-caisse/edition-list-alimentation-caisse.component';
import { DatePipe } from '@angular/common';
import { ModeReglementComponent } from './MenuParametrage/menu-parametrages/mode-reglement/mode-reglement.component';
import { AlertComponent } from './Authenfication/alert/alert.component'; 
import { TauxChangeComponent } from './MenuParametrage/menu-parametrages/taux-change/taux-change.component';
import { SignatureUserComponent } from './Authenfication/access/signature-user/signature-user.component';
import { TransfertEntreCaisseComponent } from './Recette/menu-recettes/transfert-entre-caisse/transfert-entre-caisse.component';
import { SoldeCaisseComponent } from './Recette/menu-recettes/solde-caisse/solde-caisse.component';
// import { MouvementCaisseComponent } from './Recette/menu-recettes/mouvement-caisse/mouvement-caisse.component'; 
import { TypeCaisseComponent } from './MenuParametrage/menu-parametrages/type-caisse/type-caisse.component';
import { ErrorHandlerService } from './Shared/TranslateError/error-handler-service.service';
  
import { BreadcrumbComponent } from './Authenfication/breadcrumb/breadcrumb.component';
import { MouvementCaisseComponent } from './Recette/menu-recettes/mouvement-caisse/mouvement-caisse.component';
import { TypeRecetteComponent } from './MenuParametrage/menu-parametrages/type-recette/type-recette.component';
import { EditionRecetteComponent } from './Recette/menu-recettes/edition-recette/edition-recette.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    HttpClientModule, 
     CheckboxModule,  
    ReactiveFormsModule,
    ToastModule,
    MatIconModule,  ContextMenuModule,
    DialogModule,
    PaginatorModule,
    BrowserModule,
    BrowserAnimationsModule,
    CalendarModule,
    AppRoutingModule,
    FormsModule,
    TableModule,
    DropdownModule
    , ConfirmDialogModule, 
    BadgeModule,
    RadioButtonModule,FormsModule  , BreadcrumbModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
 
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    BarTimeComponent,
    CaisseComponent,
    TypeDepenseComponent,
    TypeRecetteComponent,
    DeviseComponent,
    BeneficiaireComponent,
    FournisseurComponent,
    BanqueComponent,
    SmallmodalLoginComponent,
    LoadingComponent,
    
    EditionListAlimentationCaisseComponent,
    ModeReglementComponent,EditionRecetteComponent,
    AlertComponent,SoldeCaisseComponent,EntreeCaisseComponent,MouvementCaisseComponent,
    TauxChangeComponent,SignatureUserComponent, TransfertEntreCaisseComponent, TypeCaisseComponent, BreadcrumbComponent
    
  ],
  
  providers: [DatePipe, LoadingComponent, HttpClient,MessageService,ErrorHandlerService,
    authInterceptorProviders,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, 
    provideAnimationsAsync(), 
  ], 
  bootstrap: [AppComponent],
})
export class AppModule {  
}

