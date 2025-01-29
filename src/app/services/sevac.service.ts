import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/ApiResponse';
import { DocumentosFiltrosDto } from '../models/output/DocumentosFiltros.dto';
import { DocumentosDto } from '../models/input/Documentos.dto';
import { Observable } from 'rxjs';
import { periodoDto } from '../models/input/periodo.dto';

@Injectable({
  providedIn: 'root'
})
export class SevacService {

  private api = environment.apiUrl;
  private apiUrl = `${this.api}/documentos`;

  constructor(private http: HttpClient) { }

  getDocumentsWithFiles(parameters: DocumentosFiltrosDto): Observable<ApiResponse<DocumentosDto[]>> {
    return this.http.post<ApiResponse<DocumentosDto[]>>(`${this.apiUrl}/getDocumentsWithFiles`, parameters);
  }

  getPeriodos(): Observable<ApiResponse<periodoDto[]>> {
    return this.http.get<ApiResponse<periodoDto[]>>(`${this.apiUrl}/periodos`);
  }

  getFileBase64(id: number): Observable<ApiResponse<{ base64: string }>> {
    return this.http.get<ApiResponse<{ base64: string }>>(`${this.apiUrl}/base64/${id}/archivosRepository`);
  }
  
}
