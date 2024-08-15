import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrlCitas = 'http://localhost:3000/citas';
  private apiUrlClientes = 'http://localhost:3000/clientes';
  private apiUrlServicios = 'http://localhost:3000/servicios';

  constructor(private http: HttpClient) { }

  // Método para crear una nueva cita
  createCita(cita: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrlCitas, cita, { headers });
  }

  // Método para obtener la lista de clientes
  getClientes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlClientes);
  }

  // Método para obtener la lista de servicios
  getServicios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlServicios);
  }

  // Método para crear un nuevo cliente
  createCliente(cliente: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrlClientes, cliente, { headers });
  }

  // Método para crear un nuevo servicio
  createServicio(servicio: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrlServicios, servicio, { headers });
  }
}
