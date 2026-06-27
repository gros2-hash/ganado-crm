import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { timeout } from 'rxjs';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { UserMenuComponent } from '../../components/user-menu/user-menu.component';
import { environment } from '../../../environments/environment';

interface Empleado {
  cedula: number;
  nombre: string;
  telefono: string;
  rol: string;
  departamento: string;
}

interface NuevoEmpleado {
  cedula: string;
  nombre: string;
  telefono: string;
  rol: string;
  departamento: string;
}

@Component({
  selector: 'app-admin-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SidebarComponent, UserMenuComponent],
  templateUrl: './admin-usuarios.component.html',
  styleUrl: './admin-usuarios.component.scss',
})
export class AdminUsuariosComponent implements OnInit {
  sidebarOpen = true;

  // ── Lista ──────────────────────────────────────────────────────────────
  empleados: Empleado[] = [];
  listLoading = false;
  listError   = '';

  // ── Formulario ─────────────────────────────────────────────────────────
  form: NuevoEmpleado = { cedula: '', nombre: '', telefono: '', rol: '', departamento: '' };
  submitLoading  = false;
  submitSuccess  = false;
  submitErrorMsg = '';
  ultimoCreado: Empleado | null = null;

  readonly roles = [
    { label: 'Comercial',     value: 'COMERCIAL' },
    { label: 'Gerencia',      value: 'GERENCIA'  },
    { label: 'Administrador', value: 'ADMIN'     },
  ];

  readonly departamentos = [
    { label: 'Artigas',        value: 'ARTIGAS'        },
    { label: 'Canelones',      value: 'CANELONES'      },
    { label: 'Cerro Largo',    value: 'CERRO_LARGO'    },
    { label: 'Colonia',        value: 'COLONIA'        },
    { label: 'Durazno',        value: 'DURAZNO'        },
    { label: 'Flores',         value: 'FLORES'         },
    { label: 'Florida',        value: 'FLORIDA'        },
    { label: 'Lavalleja',      value: 'LAVALLEJA'      },
    { label: 'Maldonado',      value: 'MALDONADO'      },
    { label: 'Montevideo',     value: 'MONTEVIDEO'     },
    { label: 'Paysandú',       value: 'PAYSANDU'       },
    { label: 'Río Negro',      value: 'RIO_NEGRO'      },
    { label: 'Rivera',         value: 'RIVERA'         },
    { label: 'Rocha',          value: 'ROCHA'          },
    { label: 'Salto',          value: 'SALTO'          },
    { label: 'San José',       value: 'SAN_JOSE'       },
    { label: 'Soriano',        value: 'SORIANO'        },
    { label: 'Tacuarembó',     value: 'TACUAREMBO'     },
    { label: 'Treinta y Tres', value: 'TREINTA_Y_TRES' },
  ];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void { this.cargarEmpleados(); }

  cargarEmpleados(): void {
    this.listLoading = true;
    this.listError   = '';
    this.http.get<Empleado[]>(`${environment.apiUrl}/api/empleados`)
      .pipe(timeout(4000))
      .subscribe({
        next: data => {
          this.empleados   = data;
          this.listLoading = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.listLoading = false;
          this.listError   = 'No se pudo cargar la lista de empleados.';
          this.cdr.detectChanges();
        },
      });
  }

  crearEmpleado(): void {
    const { cedula, nombre, telefono, rol, departamento } = this.form;
    if (!cedula.trim() || !nombre.trim() || !telefono.trim() || !rol || !departamento) {
      this.submitErrorMsg = 'Completá todos los campos.';
      this.cdr.detectChanges();
      return;
    }

    this.submitLoading  = true;
    this.submitErrorMsg = '';

    this.http
      .post<Empleado>(`${environment.apiUrl}/api/empleados`, {
        cedula:      parseInt(cedula, 10),
        nombre,
        telefono,
        rol,
        departamento,
      })
      .pipe(timeout(4000))
      .subscribe({
        next: creado => {
          this.submitLoading = false;
          this.submitSuccess = true;
          this.ultimoCreado  = creado;
          this.empleados     = [creado, ...this.empleados];
          this.cdr.detectChanges();
        },
        error: err => {
          this.submitLoading  = false;
          this.submitErrorMsg = this.parseError(err);
          this.cdr.detectChanges();
        },
      });
  }

  resetForm(): void {
    this.form          = { cedula: '', nombre: '', telefono: '', rol: '', departamento: '' };
    this.submitSuccess = false;
    this.submitErrorMsg = '';
    this.ultimoCreado  = null;
  }

  rolLabel(value: string): string {
    return this.roles.find(r => r.value === value)?.label ?? value;
  }

  deptoLabel(value: string): string {
    return this.departamentos.find(d => d.value === value)?.label ?? value;
  }

  private parseError(err: any): string {
    if (err.status === 0 || err.status === 502 || err.status === 503 || err.status === 504)
      return 'No se pudo conectar con el servidor.';
    if (err.status === 409) return err.error?.detail ?? 'Ya existe un empleado con esa cédula.';
    if (err.status === 400) return err.error?.detail ?? 'Datos inválidos. Revisá el formulario.';
    if (err.status === 403) return 'No tenés permisos para realizar esta acción.';
    return err.error?.detail ?? 'Ocurrió un error inesperado.';
  }
}
