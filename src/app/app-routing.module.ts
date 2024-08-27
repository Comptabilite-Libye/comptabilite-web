import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardAdminComponent } from './Authenfication/board-admin/board-admin.component';
import { BoardModeratorComponent } from './Authenfication/board-moderator/board-moderator.component';
import { BoardUserComponent } from './Authenfication/board-user/board-user.component';
import { HomeComponent } from './Authenfication/home/home.component';
import { LoginComponent } from './Authenfication/login/login.component';
import { ProfileComponent } from './Authenfication/profile/profile.component';
import { RegisterComponent } from './Authenfication/register/register.component';

const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
