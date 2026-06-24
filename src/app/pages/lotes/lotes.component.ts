import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import {
  LotesMarketplaceService,
  LoteOferta,
  LoteDemanda,
} from '../../services/lotes-marketplace.service';

@Component({
  selector: 'app-lotes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './lotes.component.html',
  styleUrl: './lotes.component.scss',
})
export class LotesComponent implements OnInit {
  @ViewChild('videoEl') videoEl!: ElementRef<HTMLVideoElement>;

  sidebarOpen = true;
  pestana: 'oferta' | 'demanda' = 'oferta';

  /* ── OFERTA ─────────────────────────── */
  ofertas: LoteOferta[] = [];
  ofertasFiltradas: LoteOferta[] = [];
  loteActivo: LoteOferta | null = null;
  videoError = false;

  busquedaOferta = '';
  filtroTipoOferta = 'todos';
  filtroEstadoOferta = 'todos';

  /* ── DEMANDA ────────────────────────── */
  demandas: LoteDemanda[] = [];
  demandasFiltradas: LoteDemanda[] = [];

  busquedaDemanda = '';
  filtroTipoDemanda = 'todos';
  filtroUrgencia = 'todos';

  tiposGanado: string[] = [];

  constructor(
    public auth: AuthService,
    public svc: LotesMarketplaceService,
  ) {}

  ngOnInit(): void {
    this.ofertas  = this.svc.getOfertas();
    this.demandas = this.svc.getDemandas();

    const tipos = new Set([
      ...this.ofertas.map(o => o.tipoGanado),
      ...this.demandas.map(d => d.tipoGanado),
    ]);
    this.tiposGanado = [...tipos].sort();

    this.ofertasFiltradas   = [...this.ofertas];
    this.demandasFiltradas  = [...this.demandas];
    this.loteActivo         = this.ofertas[0] ?? null;
  }

  seleccionarOferta(lote: LoteOferta): void {
    this.loteActivo = lote;
    this.videoError = false;
    setTimeout(() => {
      const v = this.videoEl?.nativeElement;
      if (v) { v.load(); v.play().catch(() => {}); }
    }, 60);
  }

  filtrarOfertas(): void {
    let res = [...this.ofertas];
    if (this.filtroTipoOferta !== 'todos')
      res = res.filter(o => o.tipoGanado === this.filtroTipoOferta);
    if (this.filtroEstadoOferta !== 'todos')
      res = res.filter(o => o.estado === this.filtroEstadoOferta);
    if (this.busquedaOferta.trim()) {
      const q = this.busquedaOferta.toLowerCase();
      res = res.filter(o =>
        o.id.toLowerCase().includes(q) ||
        o.tipoGanado.toLowerCase().includes(q) ||
        o.raza.toLowerCase().includes(q) ||
        o.departamento.toLowerCase().includes(q) ||
        o.descripcion.toLowerCase().includes(q)
      );
    }
    this.ofertasFiltradas = res;
    if (!res.find(o => o.id === this.loteActivo?.id)) {
      this.loteActivo = res[0] ?? null;
    }
  }

  filtrarDemandas(): void {
    let res = [...this.demandas];
    if (this.filtroTipoDemanda !== 'todos')
      res = res.filter(d => d.tipoGanado === this.filtroTipoDemanda);
    if (this.filtroUrgencia !== 'todos')
      res = res.filter(d => d.urgencia === this.filtroUrgencia);
    if (this.busquedaDemanda.trim()) {
      const q = this.busquedaDemanda.toLowerCase();
      res = res.filter(d =>
        d.id.toLowerCase().includes(q) ||
        d.tipoGanado.toLowerCase().includes(q) ||
        d.raza.toLowerCase().includes(q) ||
        d.departamento.toLowerCase().includes(q) ||
        d.descripcion.toLowerCase().includes(q)
      );
    }
    this.demandasFiltradas = res;
  }

  onVideoError(): void { this.videoError = true; }

  estadoIcono(estado: string): string {
    const m: Record<string, string> = {
      disponible: '🟢', reservado: '🟡', negociacion: '🔵', cerrado: '⚫',
    };
    return m[estado] ?? '⚪';
  }

  urgenciaIcono(u: string): string {
    return u === 'alta' ? '🔴' : u === 'media' ? '🟡' : '🟢';
  }

  logout(): void { this.auth.logout(); }
}
