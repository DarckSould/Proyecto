import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  meses = [
    { value: '', label: 'Todos' },
    { value: '2024-01', label: 'Enero 2024' },
    { value: '2024-02', label: 'Febrero 2024' },
    { value: '2024-03', label: 'Marzo 2024' },
    { value: '2024-04', label: 'Abril 2024' },
    { value: '2024-05', label: 'Mayo 2024' },
    { value: '2024-06', label: 'Junio 2024' },
    { value: '2024-07', label: 'Julio 2024' },
    { value: '2024-08', label: 'Agosto 2024' },
    { value: '2024-09', label: 'Septiembre 2024' },
    { value: '2024-10', label: 'Octubre 2024' },
    { value: '2024-11', label: 'Noviembre 2024' },
    { value: '2024-12', label: 'Diciembre 2024' }
  ];

  citas: any[] = [];
  clientes: any[] = [];
  servicios: any[] = [];
  filteredCitas: any[] = [];
  filteredClientes: any[] = [];
  private chart: Chart | undefined;
  private currentMonth: string = '';
  private filterClienteId: string = '';
  private filterServicioId: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getCitas();
    this.getClientes();
    this.getServicios();
    this.renderChart();
  }

  getCitas(): void {
    let url = 'http://localhost:3000/citas';
    if (this.currentMonth) {
      url += `?month=${this.currentMonth}`;
    }
    this.http.get<any[]>(url).subscribe(data => {
      this.citas = data;
      this.filterCitas();
    });
  }

  getClientes(): void {
    this.http.get<any[]>('http://localhost:3000/clientes').subscribe(data => {
      this.clientes = data;
      this.filteredClientes = data;
    });
  }

  getServicios(): void {
    this.http.get<any[]>('http://localhost:3000/servicios').subscribe(data => {
      this.servicios = data;
    });
  }

  onMonthChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.currentMonth = select.value;
    this.getCitas();
    this.renderChart();
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    const query = input.value.toLowerCase();

    this.filteredClientes = this.clientes.filter(cliente =>
      cliente.nombre.toLowerCase().includes(query)
    );
  }

  onFilterCitas(): void {
    this.filterClienteId = (document.getElementById('filterClienteId') as HTMLInputElement).value;
    this.filterServicioId = (document.getElementById('filterServicioId') as HTMLInputElement).value;
    this.filterCitas();
  }

  filterCitas(): void {
    this.filteredCitas = this.citas.filter(cita => {
      return (!this.filterClienteId || cita.cliente_id.toString().includes(this.filterClienteId)) &&
             (!this.filterServicioId || cita.servicio_id.toString().includes(this.filterServicioId)) &&
             (!this.currentMonth || cita.fecha_cita.startsWith(this.currentMonth));
    });
  }

  renderChart(): void {
    let url = 'http://localhost:3000/ventas/mes';
    if (this.currentMonth) {
      url += `?month=${this.currentMonth}`;
    }

    this.http.get<any[]>(url).subscribe(data => {
      const ctx = document.getElementById('salesChart') as HTMLCanvasElement;

      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.map(d => d.mes),
          datasets: [{
            label: 'Ventas',
            data: data.map(d => parseInt(d.total, 10)),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              beginAtZero: true
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });
  }
}
