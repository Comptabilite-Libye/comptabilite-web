import { Injectable } from '@angular/core';
@Injectable()
export class ApppComponent {
    AdressIp = window.location.hostname;
  
    link: string = window.location.protocol +'//' + this.AdressIp + ':4900/';
}
 