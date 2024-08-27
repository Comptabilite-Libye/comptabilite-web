import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 
import { HomeComponent } from './Authenfication/home/home.component';
import { LoginComponent } from './Authenfication/login/login.component'; 
import { RegisterComponent } from './Authenfication/register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor, authInterceptorProviders } from './Authenfication/_helpers/auth.interceptor';
  
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './Authenfication/navbar/navbar.component';
import { BarTimeComponent } from './Authenfication/bar-time/bar-time.component' 
import { DialogModule } from 'primeng/dialog';
import {  ToastModule } from 'primeng/toast';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MenuParametrageComponent } from './MenuParametrage/menu-parametrage/menu-parametrage.component';
import { CaisseComponent } from './MenuParametrage/caisse/caisse.component';
import { TypeDepenseComponent } from './MenuParametrage/type-depense/type-depense.component';
import { TypeRecetteComponent } from './MenuParametrage/type-recette/type-recette.component';
import { MenuRecetteComponent } from './Recette/menu-recette/menu-recette.component';
import { EntreeCaisseComponent } from './Recette/entree-caisse/entree-caisse.component';
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
    EntreeCaisseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    DialogModule,
    ToastModule
  ],
  providers: [authInterceptorProviders,{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, provideAnimationsAsync()],        
  
  bootstrap: [AppComponent],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
}) 
export class AppModule { }
