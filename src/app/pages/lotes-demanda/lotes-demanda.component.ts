import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { LotesMarketplaceService, LoteDemanda } from '../../services/lotes-marketplace.service';

@Component({
  selector: 'app-lotes-demanda',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SidebarComponent],
  templateUrl: './lotes-demanda.component.html',
  styleUrl: './lotes-demanda.component.scss',
})
export class LotesDemandaComponent implements OnInit {
  sidebarOpen = true;

  demandas: LoteDemanda[] = [];
  filtradas: LoteDemanda[] = [];

  busqueda = '';
  filtroTipo = 'todos';
  filtroUrgencia = 'todos';

  tiposGanado: string[] = [];

  constructor(
    public auth: AuthService,
    public svc: LotesMarketplaceService,
  ) {}

  ngOnInit(): void {
    this.demandas = this.svc.getDemandas();
    this.tiposGanado = [...new Set(this.demandas.map(d => d.tipoGanado))].sort();
    this.filtradas = [...this.demandas];
  }

  filtrar(): void {
    let res = [...this.demandas];
    if (this.filtroTipo !== 'todos')     res = res.filter(d => d.tipoGanado === this.filtroTipo);
    if (this.filtroUrgencia !== 'todos') res = res.filter(d => d.urgencia === this.filtroUrgencia);
    if (this.busqueda.trim()) {
      const q = this.busqueda.toLowerCase();
      res = res.filter(d =>
        d.id.toLowerCase().includes(q) ||
        d.tipoGanado.toLowerCase().includes(q) ||
        d.raza.toLowerCase().includes(q) ||
        d.departamento.toLowerCase().includes(q) ||
        d.descripcion.toLowerCase().includes(q)
      );
    }
    this.filtradas = res;
  }

  urgenciaIcono(u: string): string {
    return u === 'alta' ? '🔴' : u === 'media' ? '🟡' : '🟢';
  }

  logout(): void { this.auth.logout(); }
}
