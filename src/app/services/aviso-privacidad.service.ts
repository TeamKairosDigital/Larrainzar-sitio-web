import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/ApiResponse';
import { Observable } from 'rxjs';
import { AvisoPrivacidadDto } from '../models/input/avisoPrivacidad.dto';
import { OtrosDocumentosDto } from '../models/input/otrosDocumentos.dto';

@Injectable({
  providedIn: 'root'
})
export class AvisoPrivacidadService {

  private api = environment.apiUrl;
  private apiUrl = `${this.api}/aviso-privacidad`;

  constructor(private http: HttpClient) { }

  getListAvisoPrivacidad(): Observable<ApiResponse<AvisoPrivacidadDto[]>> {
    return this.http.get<ApiResponse<AvisoPrivacidadDto[]>>(`${this.apiUrl}/getListAvisoPrivacidadWEB`);
  }

  getAvisoPrivacidadArchivoWEB(id: number): Observable<ApiResponse<string>> {
    return this.http.get<ApiResponse<string>>(`${this.apiUrl}/getAvisoPrivacidadArchivoWEB/${id}`);
  }


  // Otros documentos
  getOtrosDocumentos(): Observable<ApiResponse<OtrosDocumentosDto[]>> {
    return this.http.get<ApiResponse<OtrosDocumentosDto[]>>(`${this.apiUrl}/getOtrosDocumentos`);
  }

  getOtroDocumentorchivoWEB(id: number): Observable<ApiResponse<string>> {
    return this.http.get<ApiResponse<string>>(`${this.apiUrl}/getOtroDocumentorchivoWEB/${id}`);
  }

}
