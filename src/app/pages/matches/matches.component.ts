import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { UserMenuComponent } from '../../components/user-menu/user-menu.component';
import { MatchesService } from '../../services/matches.service';
import { Match, EstadoMatch } from '../../models/match.model';

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SidebarComponent, UserMenuComponent],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.scss',
})
export class MatchesComponent implements OnInit {
  sidebarOpen = true;

  matches: Match[]  = [];
  filtrados: Match[] = [];

  busqueda          = '';
  filtroEstado      = 'todos';
  filtroTipoGanado  = 'todos';
  filtroComercial   = 'todos';
  filtroCruzado     = 'todos';

  tiposGanado: string[] = [];
  comerciales: string[] = [];
  stats: ReturnType<MatchesService['getStats']> | null = null;

  readonly estadosOpciones: { valor: string; label: string }[] = [
    { valor: 'nuevo',          label: 'Nuevo'           },
    { valor: 'visto_vendedor', label: 'Visto vendedor'  },
    { valor: 'visto_comprador',label: 'Visto comprador' },
    { valor: 'ambos_vistos',   label: 'Ambos vieron'    },
    { valor: 'en_negociacion', label: 'En negociación'  },
    { valor: 'cerrado',        label: 'Cerrado'         },
    { valor: 'descartado',     label: 'Descartado'      },
  ];

  constructor(
    public auth: AuthService,
    public svc: MatchesService,
  ) {}

  ngOnInit(): void {
    this.matches    = this.svc.getAll();
    this.tiposGanado = this.svc.getTiposGanado();
    this.comerciales = this.svc.getComercialesInvolucrados();
    this.stats       = this.svc.getStats();
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    let res = [...this.matches];

    if (this.filtroEstado !== 'todos')
      res = res.filter(m => m.estado === this.filtroEstado);
    if (this.filtroTipoGanado !== 'todos')
      res = res.filter(m => m.tipoGanado === this.filtroTipoGanado);
    if (this.filtroComercial !== 'todos')
      res = res.filter(m => m.comercialVendedor === this.filtroComercial || m.comercialComprador === this.filtroComercial);
    if (this.filtroCruzado === 'cruzado')
      res = res.filter(m => m.esCruzado);
    if (this.filtroCruzado === 'propio')
      res = res.filter(m => !m.esCruzado);
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

  marcarVistoVendedor(m: Match, event: Event): void {
    event.stopPropagation();
    this.svc.marcarVistoVendedor(m.id);
    this.refresh();
  }

  marcarVistoComprador(m: Match, event: Event): void {
    event.stopPropagation();
    this.svc.marcarVistoComprador(m.id);
    this.refresh();
  }

  avanzar(m: Match, estado: EstadoMatch, event: Event): void {
    event.stopPropagation();
    this.svc.avanzarEstado(m.id, estado);
    this.refresh();
  }

  private refresh(): void {
    this.matches = this.svc.getAll();
    this.stats   = this.svc.getStats();
    this.aplicarFiltros();
  }

  estadoLabel(e: EstadoMatch): string {
    const map: Record<EstadoMatch, string> = {
      nuevo:           'Nuevo',
      visto_vendedor:  'Visto vendedor',
      visto_comprador: 'Visto comprador',
      ambos_vistos:    'Ambos vieron',
      en_negociacion:  'En negociación',
      cerrado:         'Cerrado',
      descartado:      'Descartado',
    };
    return map[e];
  }

  margenPct(m: Match): number {
    return Math.round((m.precioVenta - m.precioCompra) / m.precioCompra * 100);
  }

  logout(): void { this.auth.logout(); }
}
