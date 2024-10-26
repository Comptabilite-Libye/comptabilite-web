import { Component } from '@angular/core';
import { EncryptionService } from '../Shared/EcrypteService/EncryptionService';
import { ParametrageService } from '../MenuParametrage/menu-parametrages/WService/parametrage.service';

@Component({
  selector: 'app-menu-depenses',
  templateUrl: './menu-depenses.component.html',
  styleUrls: ['./menu-depenses.component.css', '.../../../src/assets/files/css/StyleMenu.css']
})
export class MenuDepensesComponent {


  encryptedValue: string = '';
  constructor(private encryptionService: EncryptionService, private paramServie: ParametrageService) {

  }
  ngOnInit(): void {
    this. PasswordAnnulApprouvFF();
  }
  PasswordAnnulApprouvFF() {
    let PassAnnullApprouveTCX = sessionStorage.getItem("PassAnnullApprouveFF");

    if (PassAnnullApprouveTCX == "" || PassAnnullApprouveTCX == null  ) {
      this.paramServie.getParams("PassAnnullApprouveFF").subscribe(

        (res: any) => {
          let pass = res.valeur;
          this.encryptedValue = this.encryptionService.encrypt(pass);
          sessionStorage.setItem("PassAnnullApprouveFF", this.encryptedValue);
        }
      )
    }else{

    }
    
  }


}
