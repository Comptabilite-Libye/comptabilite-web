import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError, timeout, timer } from 'rxjs';
import { ApppComponent } from 'src/app/appp.component';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RecetteServiceService {


  constructor(private http: HttpClient) {

  }

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
    return this.http.get(`${environment.API_Recette}alimentation_caisse/all`);

  }



  GetAllAlimentationCaisseByCode(code: number): Observable<any> {
    return this.http.get(`${environment.API_Recette}alimentation_caisse/` + code, {
      headers: this.getAuthorizationHeaders()
    });
  }
  GetAlimentationCaisseByEtatApprouved(codeEtatApprouver: number) {

    return this.http.get(`${environment.API_Recette}alimentation_caisse/EtatApprouver/` + codeEtatApprouver);
  }

  PostAlimentationCaisse(body: any) {
    return this.http.post(`${environment.API_Recette}alimentation_caisse`, body)
  }
  UpdateAlimentationCaisse(body: any) {
    return this.http.put(`${environment.API_Recette}alimentation_caisse/update`, body);
  }

  DeleteAlimentationCaisse(code: any) {
    return this.http.delete(`${environment.API_Recette}alimentation_caisse/delete/` + code);
  }



  /// approuve et cancel approuve AC
  ApprouveAc(body: any) {
    return this.http.put(`${environment.API_Recette}alimentation_caisse/approuver`, body);
  }

  CancelApprouveAC(body: any) {
    return this.http.put(`${environment.API_Recette}alimentation_caisse/cancel_approuver`, body);
  }


  ///SoldeCaisse

  GetAllSoldeCaisse() {

    return this.http.get(`${environment.API_Recette}solde_caisse/all`);
  }

  GetSoldeCaisseByCodeCaisse(codeCaisse: number) {

    return this.http.get(`${environment.API_Recette}solde_caisse/code_caisse?codeCaisse=` + codeCaisse);
  }



  /// TransfertCaisse 
  GetAllTransfertCaisse(): Observable<any> {
    return this.http.get(`${environment.API_Recette}transfert_caisse/all`);

  }

  GetAllTransfertCaisseByCode(code: number): Observable<any> {
    return this.http.get(`${environment.API_Recette}transfert_caisse/` + code);
  }
  GetTransfertByEtatApprouved(codeEtatApprouver: number) {

    return this.http.get(`${environment.API_Recette}transfert_caisse/EtatApprouver/` + codeEtatApprouver);
  }

  PostTransfertCaisse(body: any) {
    return this.http.post(`${environment.API_Recette}transfert_caisse`, body)
  }
  UpdateTransfertCaisse(body: any) {
    return this.http.put(`${environment.API_Recette}transfert_caisse/update`, body);
  }

  DeleteTransfertCaisse(code: any) {
    return this.http.delete(`${environment.API_Recette}transfert_caisse/delete/` + code);
  }
 
  ApprouveTc(body: any) {
    return this.http.put(`${environment.API_Recette}transfert_caisse/approuver`, body);
  }

  CancelApprouveTc(body: any) {
    return this.http.put(`${environment.API_Recette}transfert_caisse/cancel_approuver`, body);
  }




}
