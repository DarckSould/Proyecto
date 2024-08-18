import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cita, Cliente, Servicio } from './data.model'; // Asegúrate de ajustar la ruta si es necesario

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrlCitas = 'http://localhost:3000/citas';
  private apiUrlClientes = 'http://localhost:3000/clientes';
  private apiUrlServicios = 'http://localhost:3000/servicios';
  private baseUrl = 'http://localhost:3000/citas'; // Asegúrate de que la URL sea correcta


  constructor(private http: HttpClient) { }

  // Configuración de encabezados HTTP
  private getHttpHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  // Manejo de errores
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  // Método para crear una nueva cita
  createCita(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(this.apiUrlCitas, cita, { headers: this.getHttpHeaders() })
      .pipe(catchError(this.handleError<Cita>('createCita')));
  }

  // Método para obtener la lista de clientes
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrlClientes)
      .pipe(catchError(this.handleError<Cliente[]>('getClientes', [])));
  }

  // Método para obtener la lista de servicios
  getServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.apiUrlServicios)
      .pipe(catchError(this.handleError<Servicio[]>('getServicios', [])));
  }

  // Método para crear un nuevo cliente
  createCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrlClientes, cliente, { headers: this.getHttpHeaders() })
      .pipe(catchError(this.handleError<Cliente>('createCliente')));
  }

  // Método para crear un nuevo servicio
  createServicio(servicio: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>(this.apiUrlServicios, servicio, { headers: this.getHttpHeaders() })
      .pipe(catchError(this.handleError<Servicio>('createServicio')));
  }

  // Método para eliminar una cita
  deleteCita(id: number): Observable<void> {
    const url = `${this.apiUrlCitas}/${id}`;
    return this.http.delete<void>(url)
      .pipe(catchError(this.handleError<void>('deleteCita')));
  }

  // Método para eliminar un cliente
  deleteCliente(id: number): Observable<void> {
    const url = `${this.apiUrlClientes}/${id}`;
    return this.http.delete<void>(url)
      .pipe(catchError(this.handleError<void>('deleteCliente')));
  }

  // Método para eliminar un servicio
  deleteServicio(id: number): Observable<void> {
    const url = `${this.apiUrlServicios}/${id}`;
    return this.http.delete<void>(url)
      .pipe(catchError(this.handleError<void>('deleteServicio')));
  }

  // Método para eliminar citas por cliente y servicio
  deleteCitasPorClienteYServicio(idCliente: number, idServicio: number): Observable<void> {
    const params = new URLSearchParams();
    params.set('clienteId', idCliente.toString());
    params.set('servicioId', idServicio.toString());

    return this.http.delete<void>(`${this.apiUrlCitas}?${params.toString()}`)
      .pipe(catchError(this.handleError<void>('deleteCitasPorClienteYServicio')));
  }

  
}
