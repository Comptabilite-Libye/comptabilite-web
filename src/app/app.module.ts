
import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
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
// import { DefaultToPipe } from '@angular/common';
///////////////////////////////
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';

import { MatInputModule } from '@angular/material/input';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { DropdownModule } from 'primeng/dropdown';
import { MatFormFieldModule } from "@angular/material/form-field";
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageService } from 'primeng/api'; 
import {MatMenuModule} from '@angular/material/menu'; 
import { registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/ar';
import { CalendarModule } from 'primeng/calendar';  
import {BadgeModule} from 'primeng/badge';


import { LoginComponent } from './Authenfication/login/login.component';
import { RegisterComponent } from './Authenfication/register/register.component';
import { authInterceptorProviders, AuthInterceptor } from './Authenfication/_helpers/auth.interceptor';
import { BarTimeComponent } from './Authenfication/bar-time/bar-time.component';
import { HomeComponent } from './Authenfication/home/home.component';
import { NavbarComponent } from './Authenfication/navbar/navbar.component';
import { SmallmodalLoginComponent } from './Authenfication/shared/smallmodal-login/smallmodal-login.component';
import { BanqueComponent } from './MenuParametrage/banque/banque.component';
import { BeneficiaireComponent } from './MenuParametrage/beneficiaire/beneficiaire.component';
import { CaisseComponent } from './MenuParametrage/caisse/caisse.component';
import { DeviseComponent } from './MenuParametrage/devise/devise.component';
import { FournisseurComponent } from './MenuParametrage/fournisseur/fournisseur.component';
import { MenuParametrageComponent } from './MenuParametrage/menu-parametrage/menu-parametrage.component';
import { TypeDepenseComponent } from './MenuParametrage/type-depense/type-depense.component';
import { TypeRecetteComponent } from './MenuParametrage/type-recette/type-recette.component';
import { EntreeCaisseComponent } from './Recette/entree-caisse/entree-caisse.component';
import { MenuRecetteComponent } from './Recette/menu-recette/menu-recette.component';
import { LoadingComponent } from './Shared/loading/loading.component';
import { EditionRecetteComponent } from './Recette/edition-recette/edition-recette.component';
import { EditionListAlimentationCaisseComponent } from './Recette/edition-recette/edition-list-alimentation-caisse/edition-list-alimentation-caisse.component';
import { DatePipe } from '@angular/common';
import { ErrorStatusComponent } from './Shared/error-status/error-status.component'; 
import { SharedModule } from './Shared/shared.module';
import { ModeReglementComponent } from './MenuParametrage/mode-reglement/mode-reglement.component';
import { AlertComponent } from './Authenfication/alert/alert.component';
import { InterceptorService } from './Authenfication/_helpers/interceptorNew.service';
import { ClientErrorService } from './Authenfication/client-error.service';
import { TauxChangeComponent } from './MenuParametrage/taux-change/taux-change.component';

 
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    BarTimeComponent,
    MenuParametrageComponent,
    CaisseComponent,
    TypeDepenseComponent,
    TypeRecetteComponent,
    MenuRecetteComponent,
    EntreeCaisseComponent,
    DeviseComponent,
    BeneficiaireComponent,
    FournisseurComponent,
    BanqueComponent,
    SmallmodalLoginComponent,
    LoadingComponent,
    EditionRecetteComponent,
    EditionListAlimentationCaisseComponent,
    ModeReglementComponent,
    AlertComponent,
    TauxChangeComponent,  
  ],
  imports: [ 
    HttpClientModule, 
    BrowserModule, BrowserAnimationsModule, CheckboxModule,
    AppRoutingModule, FormsModule, ReactiveFormsModule, ToastModule
    , MatIconModule, DialogModule, 
    PaginatorModule, 
    BrowserModule, BrowserAnimationsModule,CalendarModule,
    AppRoutingModule, FormsModule,
    TableModule, DropdownModule, ButtonModule, ConfirmDialogModule,
    MatFormFieldModule,BadgeModule,
    MatInputModule, MatRadioModule, MatSelectModule,MatMenuModule,
    SharedModule
    
  ],
  providers: [DatePipe,LoadingComponent,HttpClient, MessageService,
     authInterceptorProviders,
     { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  
     provideAnimationsAsync(),
     
    
  ],

  bootstrap: [AppComponent],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule {

   
 }

 