import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DepenseService {


  constructor(private http: HttpClient) {

  }

  getAuthorizationHeaders() {
    const token = sessionStorage.getItem('auth-token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  /// AlimentationCaisse 
  GetAllFactureFrounisseur(): Observable<any> {
    return this.http.get(`${environment.API_Depense}facture_fournisseur/all`, {
      headers: this.getAuthorizationHeaders()
    });

  }

  GetAllFactFrs(): Observable<any> {
    return this.http.get(`${environment.API_Depense}facture_fournisseur/all`);

  }

  GetAllFactureFrounisseurByCode(code: number): Observable<any> {
    return this.http.get(`${environment.API_Depense}facture_fournisseur/` + code )
  }
  GetFactureFrounisseurByEtatApprouved(codeEtatApprouver: number) {

    return this.http.get(`${environment.API_Depense}facture_fournisseur/EtatApprouver/` + codeEtatApprouver);
  }

  PostFactureFrounisseur(body: any) {
    return this.http.post(`${environment.API_Depense}facture_fournisseur`, body)
  }
  UpdateFactureFrounisseur(body: any) {
    return this.http.put(`${environment.API_Depense}facture_fournisseur/update`, body);
  }

  DeleteFactureFrounisseur(code: any) {
    return this.http.delete(`${environment.API_Depense}facture_fournisseur/delete/` + code);
  }

  GetAllFactureFrounisseurByCodeFournisseurAndCodeDeviseAndPaidFalse(codeFournisseur: number,codeDevise:number): Observable<any> {
    return this.http.get(`${environment.API_Depense}facture_fournisseur/factureBy?codeFournisseur=` + codeFournisseur  + `&codeDevise=`+codeDevise + `&Paid=0`)
  }

  /// approuve et cancel approuve AC
  ApprouveFactFrs(body: any) {
    return this.http.put(`${environment.API_Depense}facture_fournisseur/approuver`, body);
  }

  CancelApprouveFactFrs(body: any) {
    return this.http.put(`${environment.API_Depense}facture_fournisseur/cancel_approuver`, body);
  }


}
