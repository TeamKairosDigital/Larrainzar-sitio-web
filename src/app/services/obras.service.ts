import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';
import { obrasDto } from '../models/output/obras.dto';

@Injectable({
  providedIn: 'root'
})
export class ObrasService {

  private api = environment.apiUrl;
  private apiUrl = `${this.api}/obras`;

  constructor(private http: HttpClient) { }

  // Obtener lista de obras
  getAll(): Observable<ApiResponse<obrasDto[]>> {
    return this.http.get<ApiResponse<obrasDto[]>>(`${this.apiUrl}/findAllWEB`);
  }

  // Obtener una obra por ID
  getById(id: number): Observable<ApiResponse<obrasDto>> {
    return this.http.get<ApiResponse<obrasDto>>(`${this.apiUrl}/${id}`);
  }

}
