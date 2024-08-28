import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Caisse } from '../domaine/domaine';



@Injectable({
  providedIn: 'root'
})
export class ParametrageService {
 
  constructor(private http: HttpClient) { }
  getAuthorizationHeaders() {
    const token = sessionStorage.getItem('auth-token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
  getPDFf() {
    return this.http.get(`${environment.API_Parametrage}mode_reglement/exp`, { responseType: "blob" });
  }

  


  GetCaisse(): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}caisse/all`, {
      headers: this.getAuthorizationHeaders()
    });
  }
  PostCaisse(body: any) {

    return this.http.post(`${environment.API_Parametrage}caisse`, body, {
      headers: this.getAuthorizationHeaders()
    });
  }
 
  UpdateCaisse(body: any) {

    return this.http.put(`${environment.API_Parametrage}caisse/update`, body);
  }

  DeleteCaisse(code: any) {

    return this.http.delete(`${environment.API_Parametrage}caisse/delete/`+code);
  }

  /// Devise 

  
  GetDevise(): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}devise/all`, {
      headers: this.getAuthorizationHeaders()
    });
  }

  PostDevise(body: any) {

    return this.http.post(`${environment.API_Parametrage}devise`, body, {
      headers: this.getAuthorizationHeaders()
    });
  } 
  UpdateDevise(body: any) {

    return this.http.put(`${environment.API_Parametrage}devise/update`, body);
  }

  DeleteDevise(code: any) {

    return this.http.delete(`${environment.API_Parametrage}devise/delete/`+code);
  }

  /// Beneficiaire 

  
  GetBeneficiaire(): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}beneficiaire/all`, {
      headers: this.getAuthorizationHeaders()
    });
  }

  PostBeneficiaire(body: any) {

    return this.http.post(`${environment.API_Parametrage}beneficiaire`, body, {
      headers: this.getAuthorizationHeaders()
    });
  } 
  UpdateBeneficiaire(body: any) {

    return this.http.put(`${environment.API_Parametrage}beneficiaire/update`, body);
  }

  DeleteBeneficiaire(code: any) {

    return this.http.delete(`${environment.API_Parametrage}beneficiaire/delete/`+code);
  }


   /// Fourniseur 

  
   GetFournisseur(): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}fournisseur/all`, {
      headers: this.getAuthorizationHeaders()
    });
  }

  PostFournisseur(body: any) {

    return this.http.post(`${environment.API_Parametrage}fournisseur`, body, {
      headers: this.getAuthorizationHeaders()
    });
  } 
  UpdateFournisseur(body: any) {

    return this.http.put(`${environment.API_Parametrage}fournisseur/update`, body);
  }

  DeleteFournisseur(code: any) {

    return this.http.delete(`${environment.API_Parametrage}fournisseur/delete/`+code);
  }

  
   /// Type Depense 

  
   GetTypeDepense(): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}type_depense/all`, {
      headers: this.getAuthorizationHeaders()
    });
  }

  PostTypeDepense(body: any) {

    return this.http.post(`${environment.API_Parametrage}type_depense`, body, {
      headers: this.getAuthorizationHeaders()
    });
  } 
  UpdateTypeDepense(body: any) {

    return this.http.put(`${environment.API_Parametrage}type_depense/update`, body);
  }

  DeleteTypeDepense(code: any) {

    return this.http.delete(`${environment.API_Parametrage}type_depense/delete/`+code);
  }

  
   /// Type Recette 

  
   GetTypeRecette(): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}type_recette/all`, {
      headers: this.getAuthorizationHeaders()
    });
  }

  PostTypeRecette(body: any) {

    return this.http.post(`${environment.API_Parametrage}type_recette`, body, {
      headers: this.getAuthorizationHeaders()
    });
  } 
  UpdateTypeRecette(body: any) {

    return this.http.put(`${environment.API_Parametrage}type_recette/update`, body);
  }

  DeleteTypeRecette(code: any) {

    return this.http.delete(`${environment.API_Parametrage}type_recette/delete/`+code);
  }
}
