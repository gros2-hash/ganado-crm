import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService, User } from '../../auth/auth.service';

interface Lote {
  id: string;
  tipo: string;
  cabezas: number;
  precioUnitario: number;
  estado: 'disponible' | 'vendido' | 'en_proceso';
  fecha: string;
  campo: string;
  raza: string;
}

interface Movimiento {
  tipo: 'compra' | 'venta';
  lote: string;
  monto: number;
  fecha: string;
  contraparte: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  user: User | null = null;
  activeSection = 'resumen';
  sidebarOpen = true;
  currentDate = new Date();

  lotes: Lote[] = [
    { id: 'L-001', tipo: 'Novillos', cabezas: 120, precioUnitario: 1850, estado: 'disponible', fecha: '2024-11-02', campo: 'Est. La Querencia', raza: 'Hereford' },
    { id: 'L-002', tipo: 'Terneros', cabezas: 85,  precioUnitario: 920,  estado: 'en_proceso', fecha: '2024-11-08', campo: 'Est. Don Carlos',   raza: 'Aberdeen Angus' },
    { id: 'L-003', tipo: 'Vacas',    cabezas: 60,  precioUnitario: 1400, estado: 'vendido',    fecha: '2024-10-25', campo: 'Est. Las Flores',   raza: 'Criolla' },
    { id: 'L-004', tipo: 'Novillos', cabezas: 200, precioUnitario: 1920, estado: 'disponible', fecha: '2024-11-10', campo: 'Est. San Jorge',    raza: 'Hereford' },
    { id: 'L-005', tipo: 'Toros',    cabezas: 15,  precioUnitario: 4500, estado: 'disponible', fecha: '2024-11-12', campo: 'Est. El Ombú',      raza: 'Aberdeen Angus' },
  ];

  movimientos: Movimiento[] = [
    { tipo: 'venta',  lote: 'L-003', monto: 84000,  fecha: '2024-10-25', contraparte: 'Frigorífico Canelones' },
    { tipo: 'compra', lote: 'L-004', monto: 384000, fecha: '2024-11-10', contraparte: 'Est. San Jorge' },
    { tipo: 'compra', lote: 'L-005', monto: 67500,  fecha: '2024-11-12', contraparte: 'Cabaña El Ombú' },
    { tipo: 'venta',  lote: 'L-002', monto: 78200,  fecha: '2024-11-08', contraparte: 'Exp. Montevideo' },
  ];

  get totalCabezas(): number {
    return this.lotes.filter(l => l.estado !== 'vendido').reduce((s, l) => s + l.cabezas, 0);
  }

  get lotesDisponibles(): number {
    return this.lotes.filter(l => l.estado === 'disponible').length;
  }

  get facturacionMes(): number {
    return this.movimientos.filter(m => m.tipo === 'venta').reduce((s, m) => s + m.monto, 0);
  }

  get comprasMes(): number {
    return this.movimientos.filter(m => m.tipo === 'compra').reduce((s, m) => s + m.monto, 0);
  }

  ngOnInit(): void {
    this.user = this.auth.getUser();
  }

  constructor(private auth: AuthService) {}

  setSection(s: string): void { this.activeSection = s; }

  estadoLabel(e: string): string {
    return { disponible: 'Disponible', vendido: 'Vendido', en_proceso: 'En proceso' }[e] ?? e;
  }

  valorLote(l: Lote): number { return l.cabezas * l.precioUnitario; }

  logout(): void { this.auth.logout(); }
}
