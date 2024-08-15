import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {
  clientes: any[] = [];
  servicios: any[] = [];
  clienteId: string = '';
  servicioId: string = '';
  fechaCita: string = '';
  estatus: string = '';
  comentarios: string = '';

  nombreCliente: string = '';
  correoCliente: string = '';
  telefonoCliente: string = '';

  nombreServicio: string = '';
  descripcionServicio: string = '';
  precioServicio: number = 0;

  // Variables para eliminar
  idCitaEliminar: number = -1; // Valor predeterminado que no será válido para una ID
  idClienteEliminar: number = -1; // Valor predeterminado que no será válido para una ID
  idServicioEliminar: number = -1; // Valor predeterminado que no será válido para una ID

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.cargarClientes();
    this.cargarServicios();
  }

  cargarClientes(): void {
    this.dataService.getClientes().subscribe(data => {
      this.clientes = data;
    });
  }

  cargarServicios(): void {
    this.dataService.getServicios().subscribe(data => {
      this.servicios = data;
    });
  }

  enviarCita(): void {
    const cita = {
      cliente_id: this.clienteId,
      servicio_id: this.servicioId,
      fecha_cita: this.fechaCita,
      estatus: this.estatus,
      comentarios: this.comentarios
    };

    this.dataService.createCita(cita).subscribe(
      response => {
        console.log('Cita creada', response);
      },
      error => {
        console.error('Error al crear cita', error);
      }
    );
  }

  enviarCliente(): void {
    const cliente = {
      nombre: this.nombreCliente,
      correo: this.correoCliente,
      telefono: this.telefonoCliente
    };

    this.dataService.createCliente(cliente).subscribe(
      response => {
        console.log('Cliente creado', response);
        this.cargarClientes();
      },
      error => {
        console.error('Error al crear cliente', error);
      }
    );
  }

  enviarServicio(): void {
    const servicio = {
      nombre: this.nombreServicio,
      descripcion: this.descripcionServicio,
      precio: this.precioServicio
    };

    this.dataService.createServicio(servicio).subscribe(
      response => {
        console.log('Servicio creado', response);
        this.cargarServicios();
      },
      error => {
        console.error('Error al crear servicio', error);
      }
    );
  }

  deleteCita(): void {
    if (this.idCitaEliminar !== -1) {
      this.dataService.deleteCita(this.idCitaEliminar).subscribe(
        response => {
          console.log('Cita eliminada', response);
          this.cargarClientes(); // Actualizar la lista si es necesario
        },
        error => {
          console.error('Error al eliminar la cita', error);
        }
      );
    }
  }

  deleteCliente(): void {
    if (this.idClienteEliminar !== -1) {
      this.dataService.deleteCliente(this.idClienteEliminar).subscribe(
        response => {
          console.log('Cliente eliminado', response);
          this.cargarClientes(); // Actualizar la lista si es necesario
        },
        error => {
          console.error('Error al eliminar el cliente', error);
        }
      );
    }
  }

  deleteServicio(): void {
    if (this.idServicioEliminar !== -1) {
      this.dataService.deleteServicio(this.idServicioEliminar).subscribe(
        response => {
          console.log('Servicio eliminado', response);
          this.cargarServicios(); // Actualizar la lista si es necesario
        },
        error => {
          console.error('Error al eliminar el servicio', error);
        }
      );
    }
  }
}
