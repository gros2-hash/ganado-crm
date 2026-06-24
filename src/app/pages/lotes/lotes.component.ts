import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import {
  LotesMarketplaceService,
  LoteOferta,
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

  ofertas: LoteOferta[] = [];
  ofertasFiltradas: LoteOferta[] = [];
  loteActivo: LoteOferta | null = null;
  videoError = false;

  busqueda = '';
  filtroTipo = 'todos';
  filtroEstado = 'todos';

  tiposGanado: string[] = [];

  constructor(
    public auth: AuthService,
    public svc: LotesMarketplaceService,
  ) {}

  ngOnInit(): void {
    this.ofertas = this.svc.getOfertas();
    this.tiposGanado = [...new Set(this.ofertas.map(o => o.tipoGanado))].sort();
    this.ofertasFiltradas = [...this.ofertas];
    this.loteActivo = this.ofertas[0] ?? null;
  }

  seleccionar(lote: LoteOferta): void {
    this.loteActivo = lote;
    this.videoError = false;
    setTimeout(() => {
      const v = this.videoEl?.nativeElement;
      if (v) { v.load(); v.play().catch(() => {}); }
    }, 60);
  }

  filtrar(): void {
    let res = [...this.ofertas];
    if (this.filtroTipo !== 'todos')    res = res.filter(o => o.tipoGanado === this.filtroTipo);
    if (this.filtroEstado !== 'todos')  res = res.filter(o => o.estado === this.filtroEstado);
    if (this.busqueda.trim()) {
      const q = this.busqueda.toLowerCase();
      res = res.filter(o =>
        o.id.toLowerCase().includes(q) ||
        o.tipoGanado.toLowerCase().includes(q) ||
        o.raza.toLowerCase().includes(q) ||
        o.departamento.toLowerCase().includes(q)
      );
    }
    this.ofertasFiltradas = res;
    if (!res.find(o => o.id === this.loteActivo?.id)) {
      this.loteActivo = res[0] ?? null;
    }
  }

  onVideoError(): void { this.videoError = true; }

  estadoIcono(estado: string): string {
    const m: Record<string, string> = {
      disponible: '🟢', reservado: '🟡', negociacion: '🔵', cerrado: '⚫',
    };
    return m[estado] ?? '⚪';
  }

  logout(): void { this.auth.logout(); }
}
