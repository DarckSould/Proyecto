import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



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

  idClienteEliminar: number | null = null; // ID del cliente seleccionado para eliminación
  idServicioEliminar: number | null = null; // ID del servicio seleccionado para eliminación

  constructor(
    private dataService: DataService,
    private toastr: ToastrService,
    private router: Router


  ) { }

  ngOnInit(): void {
    this.cargarClientes();
    this.cargarServicios();
  }

  cargarClientes(): void {
    this.dataService.getClientes().subscribe(
      data => {
        this.clientes = data;
      },
      error => {
        console.error('Error al cargar clientes', error);
      }
    );
  }

  cargarServicios(): void {
    this.dataService.getServicios().subscribe(
      data => {
        this.servicios = data;
      },
      error => {
        console.error('Error al cargar servicios', error);
      }
    );
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
        this.toastr.success('¡Los datos se han enviado correctamente!', 'Éxito');
        console.log('Reserva creada', response);

      },
      error => {
        this.toastr.error('¡Error al enviar los datos!', 'Error');
        console.error('Error al crear la cita', error);

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
        this.toastr.success('¡Los datos se han enviado correctamente!', 'Éxito');
        console.log('Cliente creado', response);
        this.cargarClientes();
      },
      error => {
        this.toastr.error('¡Error al enviar los datos!', 'Error');
        console.error('Error al crear el cliente', error);

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
        this.toastr.success('¡Los datos se han enviado correctamente!', 'Éxito', {
          positionClass: 'toast-bottom-right',
          timeOut: 3000
        });        
        
        console.log('Servicio creado', response);
        this.cargarServicios();
        this.router.navigate(['/reservas']); 


      },
      error => {
        this.toastr.error('¡Error al enviar los datos!', 'Error');
        console.error('Error al crear servicio', error);
      }
    );
  }

  deleteCita(): void {
    if (this.idClienteEliminar && this.idServicioEliminar) {
      this.dataService.deleteCitasPorClienteYServicio(this.idClienteEliminar, this.idServicioEliminar).subscribe(
        response => {
          this.toastr.success('¡Citas eliminadas correctamente!', 'Éxito', {
            positionClass: 'toast-bottom-right',
            timeOut: 3000
          });
          // Opcional: actualizar la lista de clientes o citas si es necesario
          this.idClienteEliminar = null;
          this.idServicioEliminar = null;
          this.cargarServicios();
          this.router.navigate(['/reservas']);
        },
        error => {
          console.error('Error al eliminar citas', error);
          this.toastr.error('Error al eliminar citas', 'Error', {
            positionClass: 'toast-bottom-right',
            timeOut: 3000
          });
        }
      );
    } else {
      this.toastr.warning('Selecciona un cliente y un servicio', 'Advertencia', {
        positionClass: 'toast-bottom-right',
        timeOut: 3000
      });
    }
  }
  
  deleteCliente(): void {
    if (this.idClienteEliminar) {
      this.dataService.deleteCliente(this.idClienteEliminar).subscribe(
        response => {
          this.toastr.success('¡Cliente eliminado correctamente!', 'Éxito');
          console.log('Cliente eliminado', response);
          this.cargarClientes(); // Actualizar la lista si es necesario
        },
        error => {
          this.toastr.error('Error al eliminar el cliente', 'Error');
          console.error('Error al eliminar el cliente', error);
        }
      );
    }
  }

  deleteServicio(): void {
    if (this.idServicioEliminar) {
      this.dataService.deleteServicio(this.idServicioEliminar).subscribe(
        response => {
          this.toastr.success('¡Servicio eliminado correctamente!', 'Éxito');
          console.log('Servicio eliminado', response);
          this.cargarServicios(); // Actualizar la lista si es necesario
        },
        error => {
          this.toastr.error('Error al eliminar el servicio', 'Error');
          console.error('Error al eliminar el servicio', error);
        }
      );
    }
  }
}
