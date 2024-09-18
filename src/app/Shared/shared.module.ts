import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ErrorStatusComponent } from './error-status/error-status.component'; 
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [ ErrorStatusComponent],
  imports: [
    CommonModule,
    DialogModule,
    RouterModule.forChild([]),
  ],
  exports: [],
})
export class SharedModule { }