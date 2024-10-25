import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
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



  getParams(code:string) {
    return this.http.get(`${environment.API_Parametrage}param/codeParam?codeParam=`+code);
  }


 
  
//caisse

  GetCaisse(): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}caisse/all` )
  }

  GetCaisseByCodeDevise(codeDevise : number): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}caisse/codeDevise?codeDevise=`+ codeDevise )
  }


  GetCaisseByCode(code : number) {

    return this.http.get(`${environment.API_Parametrage}caisse/`+code)
  }
  GetCaisseNotIn(code:number,codeDevise:number): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}caisse/not_in?code=`+code +`&codeDevise=`+codeDevise)  
  }
  PostCaisse(body: any) : Observable<any> {

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
  GetDeviseByHasNotTaux(): Observable<any> {
    return this.http.get(`${environment.API_Parametrage}devise/hasTaux`)
  }

  GetDeviseByCode(code:number) {
    return this.http.get(`${environment.API_Parametrage}devise/`+code)
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

    return this.http.put(`${environment.API_Parametrage}beneficiaire/update`, body ,{responseType:'json'});
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

    return this.http.get(`${environment.API_Parametrage}type_depense/all` )
  }

    
  GetTypeDepenseByCode(code: number): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}type_depense/`+code )
  }

  
  GetTypeDepenseByCategorie(codeCategorieDepense:number): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}type_depense/findByCategorie?codeCategorieDepense=`+codeCategorieDepense )
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


  //// categorie depense
  


  GetCategorieDepense(): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}categorie_depense/all`);
  }


  GetCategorieDepenseByCode(code:number): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}categorie_depense/`+code);
  }

  PostCategorieDepense(body: any) {

    return this.http.post(`${environment.API_Parametrage}categorie_depense`, body, {
      headers: this.getAuthorizationHeaders()
    });
  } 
  UpdateCategorieDepense(body: any) {

    return this.http.put(`${environment.API_Parametrage}categorie_depense/update`, body);
  }

  DeleteCategorieDepense(code: any) {

    return this.http.delete(`${environment.API_Parametrage}categorie_depense/delete/`+code);
  }




   /// Type Recette 

  
   GetTypeRecette(): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}type_recette/all`);
  }


  GetTypeRecetteByCode(code:number): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}type_recette/`+code);
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



  
   /// Banque

  
   GetBanque(): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}banque/all` )
  }

  GetBanqueByCode(code:number): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}banque/`+code )
  }

  PostBanque(body: any) {
    return this.http.post(`${environment.API_Parametrage}banque`, body, {
      headers: this.getAuthorizationHeaders()
    });
  } 
  UpdateBanque(body: any) {
    return this.http.put(`${environment.API_Parametrage}banque/update`, body);
  }

  DeleteBanque(code: any) {
    return this.http.delete(`${environment.API_Parametrage}banque/delete/`+code);
  }


  // mode reglement




  GetModeReglement(): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}mode_reglement/all`, {
      headers: this.getAuthorizationHeaders()
    });
  }

  
  GetModeReglementByCode(code:number){

    return this.http.get(`${environment.API_Parametrage}mode_reglement/`+code)
  }
  PostModeReglement(body: any) : Observable<any> {

    return this.http.post(`${environment.API_Parametrage}mode_reglement`,body)
  }
 
  UpdateModeReglement(body: any) {

    return this.http.put(`${environment.API_Parametrage}mode_reglement/update`, body);
  }

  DeleteModeReglement(code: any) {

    return this.http.delete(`${environment.API_Parametrage}mode_reglement/delete/`+code);
  }



  // taux de change




  GetTauxDeChange(): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}taux_change/all`)
  }

  GetTauxDeChangeByCodeDevise(codeDevise: number): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}taux_change/code_devise/`+codeDevise)
  }
  PostTauxDeChange(body: any) : Observable<any> {

    return this.http.post(`${environment.API_Parametrage}taux_change`,body)
  }
 
  UpdateTauxDeChange(body: any) {
 
    return this.http.put(`${environment.API_Parametrage}taux_change/update`, body);
  }

 

  
   /// TypeCaisse 

  
   GetTypeCaisse(): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}type_caisse/all`, {
      headers: this.getAuthorizationHeaders()
    });
  }

  PostTypeCaisse(body: any) {

    return this.http.post(`${environment.API_Parametrage}type_caisse`, body, {
      headers: this.getAuthorizationHeaders()
    });
  } 
  UpdateTypeCaisse(body: any) {

    return this.http.put(`${environment.API_Parametrage}type_caisse/update`, body);
  }

  DeleteTypeCaisse(code: any) {

    return this.http.delete(`${environment.API_Parametrage}type_caisse/delete/`+code);
  }



  /// type cost centre

  
  GetTypeCostCentre(): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}type_cost_centre/all`, {
      headers: this.getAuthorizationHeaders()
    });
  }

  PostTypeCostCentre(body: any) {

    return this.http.post(`${environment.API_Parametrage}type_cost_centre`, body, {
      headers: this.getAuthorizationHeaders()
    });
  } 
  UpdateTypeCostCentre(body: any) {

    return this.http.put(`${environment.API_Parametrage}type_cost_centre/update`, body ,{responseType:'json'});
  }

  DeleteTypeCostCentre(code: any) {

    return this.http.delete(`${environment.API_Parametrage}type_cost_centre/delete/`+code);
  }


  
  ///   cost centre

  
  GetCostCentre(): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}cost_center/all`, {
      headers: this.getAuthorizationHeaders()
    });
  }
  
  GetCostCentreByCode(code:number): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}cost_center/`+ code, {
      headers: this.getAuthorizationHeaders()
    });
  }
  GetCostCentreDetail(): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}cost_center/detail?detail=true`, {
      headers: this.getAuthorizationHeaders()
    });
  }
  PostCostCentre(body: any) {

    return this.http.post(`${environment.API_Parametrage}cost_center`, body, {
      headers: this.getAuthorizationHeaders()
    });
  } 
  UpdateCostCentre(body: any) {

    return this.http.put(`${environment.API_Parametrage}cost_center/update`, body ,{responseType:'json'});
  }

  DeleteCostCentre(code: any) {

    return this.http.delete(`${environment.API_Parametrage}cost_center/delete/`+code);
  }


}
