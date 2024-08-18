export interface Cita {
  id?: number;
  cliente_id: string;
  servicio_id: string;
  fecha_cita: string; // Considera usar Date si es posible
  estatus: string;
  comentarios?: string;
}

export interface Cliente {
  id?: number;
  nombre: string;
  correo: string;
  telefono: string;
}

export interface Servicio {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
}
