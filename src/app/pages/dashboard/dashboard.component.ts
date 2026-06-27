import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LotesCompraService } from '../../services/lotes-compra.service';
import { LotesVentaService } from '../../services/lotes-venta.service';
import { ProductoresService } from '../../services/productores.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { UserMenuComponent } from '../../components/user-menu/user-menu.component';

interface Movimiento {
  tipo: 'compra' | 'venta'; lote: string; monto: number; fecha: string; contraparte: string;
}

interface NuevoEmpleado {
  nombre: string; email: string; rol: string; zona: string; telefono: string;
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
    { tipo: 'venta',  lote: 'LV-003', monto: 84000,  fecha: '25 Oct',  contraparte: 'Frigorífico Canelones' },
    { tipo: 'compra', lote: 'LC-004', monto: 384000, fecha: '10 Nov',  contraparte: 'Est. San Jorge' },
    { tipo: 'compra', lote: 'LC-005', monto: 67500,  fecha: '12 Nov',  contraparte: 'Cabaña El Ombú' },
    { tipo: 'venta',  lote: 'LV-002', monto: 78200,  fecha: '08 Nov',  contraparte: 'Exp. Montevideo' },
    { tipo: 'venta',  lote: 'LV-007', monto: 192000, fecha: '14 Nov',  contraparte: 'Frigorífico Norte' },
  ];

  empleado: NuevoEmpleado = { nombre: '', email: '', rol: '', zona: '', telefono: '' };
  submitSuccess = false;
  submitError   = false;

  readonly roles = [
    { label: 'Administrador', value: 'admin'      },
    { label: 'Gerencia',      value: 'gerencia'   },
    { label: 'Comercial',     value: 'comercial'  },
  ];
  readonly zonas = ['Norte', 'Sur', 'Este', 'Oeste', 'Centro'];

  constructor(
    private lotesCompraSvc: LotesCompraService,
    private ventaService:   LotesVentaService,
    private productoresSvc: ProductoresService,
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

  crearEmpleado(): void {
    const { nombre, email, rol, zona } = this.empleado;
    if (!nombre.trim() || !email.trim() || !rol || !zona) {
      this.submitError = true;
      setTimeout(() => this.submitError = false, 3000);
      return;
    }
    this.submitSuccess = true;
  }

  resetForm(): void {
    this.empleado = { nombre: '', email: '', rol: '', zona: '', telefono: '' };
    this.submitSuccess = false;
  }
}
