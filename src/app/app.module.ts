import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardAdminComponent } from './Authenfication/board-admin/board-admin.component';
import { BoardModeratorComponent } from './Authenfication/board-moderator/board-moderator.component';
import { BoardUserComponent } from './Authenfication/board-user/board-user.component';
import { HomeComponent } from './Authenfication/home/home.component';
import { LoginComponent } from './Authenfication/login/login.component';
import { ProfileComponent } from './Authenfication/profile/profile.component';
import { RegisterComponent } from './Authenfication/register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor, authInterceptorProviders } from './Authenfication/_helpers/auth.interceptor';
// import { :rdf:RDFComponent } from './:rdf:RDF.component';
import * as dctype from '@ontologies/dctype';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './Authenfication/navbar/navbar.component';
import { BarTimeComponent } from './Authenfication/bar-time/bar-time.component' 
import { DialogModule } from 'primeng/dialog';
import { Toast, ToastModule } from 'primeng/toast';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    NavbarComponent,
    BarTimeComponent
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
