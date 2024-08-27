import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ParametrageService {

  constructor(private http: HttpClient) { }

  getPDFf() {
    return this.http.get(`${environment.API_Parametrage}mode_reglement/exp`, { responseType: "blob" });
  }

  GetCaisse() {

    return this.http.get(`${environment.API_Parametrage}compteur/`);
  }


}
