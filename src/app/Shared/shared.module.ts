import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ErrorStatusComponent } from './error-status/error-status.component';

@NgModule({
  declarations: [ ErrorStatusComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
  ],
  exports: [],
})
export class SharedModule { }