import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { switchMap, timeout } from 'rxjs';
import { LotesCompraService } from '../../services/lotes-compra.service';
import { LotesVentaService } from '../../services/lotes-venta.service';
import { ProductoresService } from '../../services/productores.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { UserMenuComponent } from '../../components/user-menu/user-menu.component';
import { environment } from '../../../environments/environment';

interface Movimiento {
  tipo: 'compra' | 'venta'; lote: string; monto: number; fecha: string; contraparte: string;
}

interface NuevoEmpleado {
  cedula: string;
  nombre: string;
  email: string;
  password: string;
  rol: string;
  departamento: string;
  telefono: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterModule, FormsModule, SidebarComponent, UserMenuComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  sidebarOpen = true;
  currentDate = new Date();

  lotesCompraStats: ReturnType<LotesCompraService['getStats']> | null = null;
  ventasStats:      ReturnType<LotesVentaService['getStats']>   | null = null;
  productoresStats: ReturnType<ProductoresService['getStats']>  | null = null;

  movimientos: Movimiento[] = [
    { tipo: 'venta',  lote: 'LV-003', monto: 84000,  fecha: '25 Oct', contraparte: 'Frigorífico Canelones' },
    { tipo: 'compra', lote: 'LC-004', monto: 384000, fecha: '10 Nov', contraparte: 'Est. San Jorge'        },
    { tipo: 'compra', lote: 'LC-005', monto: 67500,  fecha: '12 Nov', contraparte: 'Cabaña El Ombú'        },
    { tipo: 'venta',  lote: 'LV-002', monto: 78200,  fecha: '08 Nov', contraparte: 'Exp. Montevideo'       },
    { tipo: 'venta',  lote: 'LV-007', monto: 192000, fecha: '14 Nov', contraparte: 'Frigorífico Norte'     },
  ];

  activeTab: 'empleado' | 'cuenta' = 'empleado';

  empleado: NuevoEmpleado = { cedula: '', nombre: '', email: '', password: '', rol: '', departamento: '', telefono: '' };
  submitSuccess  = false;
  submitLoading  = false;
  submitErrorMsg = '';

  cuenta = { cedulaEmpleado: '', email: '', password: '' };
  cuentaSuccess  = false;
  cuentaLoading  = false;
  cuentaErrorMsg = '';

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

  constructor(
    private lotesCompraSvc: LotesCompraService,
    private ventaService:   LotesVentaService,
    private productoresSvc: ProductoresService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.lotesCompraStats = this.lotesCompraSvc.getStats();
    this.ventasStats      = this.ventaService.getStats();
    this.productoresStats = this.productoresSvc.getStats();
  }

  get facturacionMes(): number {
    return this.movimientos.filter(m => m.tipo === 'venta').reduce((s, m) => s + m.monto, 0);
  }

  rolLabel(): string {
    return this.roles.find(r => r.value === this.empleado.rol)?.label ?? this.empleado.rol;
  }

  departamentoLabel(): string {
    return this.departamentos.find(d => d.value === this.empleado.departamento)?.label ?? this.empleado.departamento;
  }

  crearEmpleado(): void {
    const { cedula, nombre, email, password, rol, departamento, telefono } = this.empleado;
    const cedulaStr = String(cedula).trim();
    if (!cedulaStr || !nombre.trim() || !email.trim() || !password || !rol || !departamento) {
      this.submitErrorMsg = 'Completá todos los campos obligatorios.';
      this.cdr.detectChanges();
      return;
    }

    this.submitLoading  = true;
    this.submitErrorMsg = '';

    const cedulaNum = parseInt(cedulaStr, 10);

    this.http
      .post(`${environment.apiUrl}/api/empleados`, { cedula: cedulaNum, nombre, telefono: telefono || undefined, rol, departamento })
      .pipe(
        timeout(4000),
        switchMap(() =>
          this.http
            .post(`${environment.apiUrl}/api/usuarios`, { email, password, cedulaEmpleado: cedulaNum })
            .pipe(timeout(4000))
        ),
      )
      .subscribe({
        next: () => {
          this.submitLoading = false;
          this.submitSuccess = true;
          this.cdr.detectChanges();
        },
        error: err => {
          this.submitLoading  = false;
          this.submitErrorMsg = this.parseError(err);
          this.cdr.detectChanges();
        },
      });
  }

  crearCuenta(): void {
    const { cedulaEmpleado, email, password } = this.cuenta;
    if (!String(cedulaEmpleado).trim() || !email.trim() || !password) {
      this.cuentaErrorMsg = 'Completá todos los campos.';
      this.cdr.detectChanges();
      return;
    }
    this.cuentaLoading  = true;
    this.cuentaErrorMsg = '';

    this.http
      .post(`${environment.apiUrl}/api/usuarios`, {
        email,
        password,
        cedulaEmpleado: parseInt(String(cedulaEmpleado), 10),
      })
      .pipe(timeout(4000))
      .subscribe({
        next: () => {
          this.cuentaLoading = false;
          this.cuentaSuccess = true;
          this.cdr.detectChanges();
        },
        error: err => {
          this.cuentaLoading  = false;
          this.cuentaErrorMsg = this.parseError(err);
          this.cdr.detectChanges();
        },
      });
  }

  resetCuenta(): void {
    this.cuenta        = { cedulaEmpleado: '', email: '', password: '' };
    this.cuentaSuccess = false;
    this.cuentaErrorMsg = '';
  }

  private parseError(err: any): string {
    if (err.status === 0 || err.status === 502 || err.status === 503 || err.status === 504)
      return 'No se pudo conectar con el servidor.';
    if (err.status === 409) return err.error?.detail ?? 'Ya existe un registro con esos datos.';
    if (err.status === 403) return 'No tenés permisos para realizar esta acción.';
    if (err.status === 400) return err.error?.detail ?? 'Datos inválidos. Revisá el formulario.';
    return err.error?.detail ?? 'Ocurrió un error inesperado.';
  }

  resetForm(): void {
    this.empleado       = { cedula: '', nombre: '', email: '', password: '', rol: '', departamento: '', telefono: '' };
    this.submitSuccess  = false;
    this.submitErrorMsg = '';
  }
}
