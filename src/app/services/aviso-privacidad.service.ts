import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/ApiResponse';
import { Observable } from 'rxjs';
import { AvisoPrivacidadDto } from '../models/input/avisoPrivacidad.dto';

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

}
