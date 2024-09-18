import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessComponent } from './access.component';
import { SignatureUserComponent } from './signature-user/signature-user.component';

const routes: Routes = [{ path: '', component: AccessComponent },
  { path: 'signature_user', component: SignatureUserComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessRoutingModule { }
