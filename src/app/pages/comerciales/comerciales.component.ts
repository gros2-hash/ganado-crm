import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { UserMenuComponent } from '../../components/user-menu/user-menu.component';
import { ComercialService } from '../../services/comerciales.service';
import { Comercial, ComercialStats, RolComercial, ZonaComercial } from '../../models/comercial.model';

interface ComercialRow {
  comercial: Comercial;
  stats: ComercialStats;
  expandido: boolean;
}

@Component({
  selector: 'app-comerciales',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SidebarComponent, UserMenuComponent],
  templateUrl: './comerciales.component.html',
  styleUrl: './comerciales.component.scss',
})
export class ComercialComponent implements OnInit {
  sidebarOpen = true;

  filas: ComercialRow[] = [];
  filtradas: ComercialRow[] = [];

  busqueda    = '';
  filtroZona  = 'todos';
  filtroRol   = 'todos';
  filtroEstado = 'todos';

  resumen: ReturnType<ComercialService['getResumen']> | null = null;

  readonly zonas: ZonaComercial[] = ['Norte', 'Sur', 'Este', 'Oeste', 'Centro'];
  readonly roles: RolComercial[]  = ['gerente', 'supervisor', 'comercial'];

  constructor(
    public auth: AuthService,
    private svc: ComercialService,
  ) {}

  ngOnInit(): void {
    this.filas = this.svc.getAll().map(c => ({
      comercial: c,
      stats: this.svc.getStats(c),
      expandido: false,
    }));
    this.resumen = this.svc.getResumen();
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    let res = [...this.filas];

    if (this.filtroZona !== 'todos')
      res = res.filter(r => r.comercial.zona === this.filtroZona);
    if (this.filtroRol !== 'todos')
      res = res.filter(r => r.comercial.rol === this.filtroRol);
    if (this.filtroEstado === 'activo')
      res = res.filter(r => r.comercial.activo);
    if (this.filtroEstado === 'inactivo')
      res = res.filter(r => !r.comercial.activo);
    if (this.busqueda.trim()) {
      const q = this.busqueda.toLowerCase();
      res = res.filter(r =>
        r.comercial.nombre.toLowerCase().includes(q) ||
        r.comercial.zona.toLowerCase().includes(q) ||
        r.comercial.email.toLowerCase().includes(q)
      );
    }

    this.filtradas = res;
  }

  toggleExpandir(fila: ComercialRow): void {
    fila.expandido = !fila.expandido;
  }

  formatTiempo(min: number): string {
    return this.svc.formatTiempo(min);
  }

  matchesCruzados(stats: ComercialStats): number {
    return stats.matches.filter(m => m.esCruzado).length;
  }

  logout(): void { this.auth.logout(); }
}
