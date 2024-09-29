import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 

 
import { AuthService } from 'src/app/Authenfication/_services/auth.service';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule  
  
    ],
    declarations: [
    
    ],
    providers: [
        AuthService
   
    ]
})
export class SessionModule { }
