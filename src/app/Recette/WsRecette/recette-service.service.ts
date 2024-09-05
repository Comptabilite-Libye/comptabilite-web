import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecetteServiceService {

  constructor(private http: HttpClient) { }
  getAuthorizationHeaders() {
    const token = sessionStorage.getItem('auth-token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  GetEditionAlimentCaissePDFf(code: any) {
    return this.http.get(`${environment.API_Recette}alimentation_caisse/edition/` + code, { responseType: "blob" });
  }


  /// AlimentationCaisse 
  GetAllAlimentationCaisse(): Observable<any> {
    return this.http.get(`${environment.API_Recette}alimentation_caisse/all`, {
      headers: this.getAuthorizationHeaders()
    });
  }


  GetAllAlimentationCaisseByCode(code : number): Observable<any> {
    return this.http.get(`${environment.API_Recette}alimentation_caisse/`+code, {
      headers: this.getAuthorizationHeaders()
    });
  }
  PostAlimentationCaisse(body: any) {
    return this.http.post(`${environment.API_Recette}alimentation_caisse`, body, {
      headers: this.getAuthorizationHeaders()
    });
  }
  UpdateAlimentationCaisse(body: any) {
    return this.http.put(`${environment.API_Recette}alimentation_caisse/update`, body);
  }

  DeleteAlimentationCaisse(code: any) {
    return this.http.delete(`${environment.API_Recette}alimentation_caisse/delete/` + code);
  }
}
