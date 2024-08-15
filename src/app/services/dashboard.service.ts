import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://localhost:3000'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) { }

  // Ejemplo de método para obtener datos
  getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/data`);
  }

  // Ejemplo de método para enviar datos
  sendData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/data`, data);
  }
}
