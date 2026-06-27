import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { UserMenuComponent } from '../../components/user-menu/user-menu.component';
import { MatchesService } from '../../services/matches.service';
import { Match, EstadoMatch } from '../../models/match.model';

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, UserMenuComponent],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.scss',
})
export class MatchesComponent implements OnInit {
  sidebarOpen = true;

  matches:  Match[] = [];
  filtrados: Match[] = [];

  busqueda     = '';
  filtroEstado = 'todos';

  matchSel: Match | null = null;

  stats: ReturnType<MatchesService['getStats']> | null = null;

  readonly estadosOpciones: { valor: string; label: string }[] = [
    { valor: 'nuevo',           label: 'Nuevo'          },
    { valor: 'visto_vendedor',  label: 'Visto vendedor' },
    { valor: 'visto_comprador', label: 'Visto comprador'},
    { valor: 'ambos_vistos',    label: 'Ambos vieron'   },
    { valor: 'en_negociacion',  label: 'En negociación' },
    { valor: 'cerrado',         label: 'Cerrado'        },
    { valor: 'descartado',      label: 'Descartado'     },
  ];

  constructor(public auth: AuthService, public svc: MatchesService) {}

  ngOnInit(): void {
    this.matches = this.svc.getAll();
    this.stats   = this.svc.getStats();
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    let res = [...this.matches];
    if (this.filtroEstado !== 'todos')
      res = res.filter(m => m.estado === this.filtroEstado);
    if (this.busqueda.trim()) {
      const q = this.busqueda.toLowerCase();
      res = res.filter(m =>
        m.loteVentaId.toLowerCase().includes(q) ||
        m.loteCompraId.toLowerCase().includes(q) ||
        m.tipoGanado.toLowerCase().includes(q) ||
        m.comercialVendedor.toLowerCase().includes(q) ||
        m.comercialComprador.toLowerCase().includes(q)
      );
    }
    this.filtrados = res;
  }

  seleccionar(m: Match): void {
    this.matchSel = m;
  }

  marcarVistoVendedor(event: Event): void {
    event.stopPropagation();
    if (!this.matchSel) return;
    this.svc.marcarVistoVendedor(this.matchSel.id);
    this.refresh();
  }

  marcarVistoComprador(event: Event): void {
    event.stopPropagation();
    if (!this.matchSel) return;
    this.svc.marcarVistoComprador(this.matchSel.id);
    this.refresh();
  }

  avanzar(estado: EstadoMatch, event: Event): void {
    event.stopPropagation();
    if (!this.matchSel) return;
    this.svc.avanzarEstado(this.matchSel.id, estado);
    this.refresh();
  }

  private refresh(): void {
    this.matches = this.svc.getAll();
    this.stats   = this.svc.getStats();
    this.aplicarFiltros();
    if (this.matchSel)
      this.matchSel = this.matches.find(m => m.id === this.matchSel!.id) ?? null;
  }

  estadoLabel(e: EstadoMatch): string {
    const map: Record<EstadoMatch, string> = {
      nuevo:            'Nuevo',
      visto_vendedor:   'Visto vendedor',
      visto_comprador:  'Visto comprador',
      ambos_vistos:     'Ambos vieron',
      en_negociacion:   'En negociación',
      cerrado:          'Cerrado',
      descartado:       'Descartado',
    };
    return map[e];
  }

  margenPct(m: Match): number {
    return Math.round((m.precioVenta - m.precioCompra) / m.precioCompra * 100);
  }

  scoreColor(total: number): string {
    if (total >= 80) return '#16a34a';
    if (total >= 60) return '#ca8a04';
    return '#dc2626';
  }

  scoreGradient(total: number): string {
    const color = this.scoreColor(total);
    return `conic-gradient(${color} ${total}%, #e5e7eb ${total}%)`;
  }

  dimPct(score: number, max: number): number {
    return Math.round(score / max * 100);
  }

  dimColor(score: number, max: number): string {
    const pct = score / max;
    if (pct >= 1)    return '#16a34a';
    if (pct >= 0.5)  return '#ca8a04';
    return '#dc2626';
  }

  dimStatus(score: number, max: number): string {
    if (score === max) return '✓';
    if (score > 0)     return '~';
    return '✕';
  }
}
