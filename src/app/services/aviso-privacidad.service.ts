import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/ApiResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvisoPrivacidadService {

  private api = environment.apiUrl;
  private apiUrl = `${this.api}/aviso-privacidad`;

  constructor(private http: HttpClient) { }

  getListAvisoPrivacidad(): Observable<ApiResponse<listAvisoPrivacidad[]>> {
    return this.http.post<ApiResponse<listAvisoPrivacidad[]>>(`${this.apiUrl}/getListAvisoPrivacidadWEB`);
  }

}
