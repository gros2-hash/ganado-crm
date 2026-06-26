import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { VisualizadorLotesService } from '../../services/visualizador-lotes.service';
import { LoteVisual } from '../../models/lote-visual.model';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';

@Component({
  selector: 'app-visualizador-lotes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SafeUrlPipe, SidebarComponent],
  templateUrl: './visualizador-lotes.component.html',
  styleUrl: './visualizador-lotes.component.scss',
})
export class VisualizadorLotesComponent implements OnInit {

  // ── state ──────────────────────────────────────────────────
  modoVista: 'grid' | 'detalle' = 'grid';
  sidebarOpen = true;
  todosLotes:    LoteVisual[] = [];
  lotesFiltrados: LoteVisual[] = [];
  loteActivo: LoteVisual | null = null;
  indiceActivo = 0;
  videoActivo = false;   // true = muestra iframe, false = muestra thumbnail con play

  // ── filtros ────────────────────────────────────────────────
  busqueda    = '';
  filtroTipo  = 'todos';           // todos | compra | venta
  filtroEstado    = 'todos';
  filtroTipoGanado = 'todos';
  filtroRaza      = 'todos';
  filtroDpto      = 'todos';

  // ── opciones dropdown ──────────────────────────────────────
  tiposGanado:   string[] = [];
  razas:         string[] = [];
  departamentos: string[] = [];
  estados:       string[] = [];

  constructor(
    public auth: AuthService,
    private svc: VisualizadorLotesService
  ) {}

  ngOnInit(): void {
    this.todosLotes    = this.svc.getAll();
    this.tiposGanado   = this.svc.tiposGanado();
    this.razas         = this.svc.razas();
    this.departamentos = this.svc.departamentos();
    this.estados       = this.svc.estados();
    this.aplicarFiltros();
  }

  // ── filtrado ───────────────────────────────────────────────
  aplicarFiltros(): void {
    const q = this.busqueda.toLowerCase();
    this.lotesFiltrados = this.todosLotes.filter(l => {
      if (this.filtroTipo !== 'todos' && l.tipo !== this.filtroTipo) return false;
      if (this.filtroEstado !== 'todos' && l.estado !== this.filtroEstado) return false;
      if (this.filtroTipoGanado !== 'todos' && l.tipoGanado !== this.filtroTipoGanado) return false;
      if (this.filtroRaza !== 'todos' && l.raza !== this.filtroRaza) return false;
      if (this.filtroDpto !== 'todos' && l.departamento !== this.filtroDpto) return false;
      if (q) {
        const haystack = `${l.id} ${l.descripcion} ${l.tipoGanado} ${l.raza} ${l.campo} ${l.departamento} ${l.contactoNombre}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }

  resetFiltros(): void {
    this.busqueda = '';
    this.filtroTipo = 'todos';
    this.filtroEstado = 'todos';
    this.filtroTipoGanado = 'todos';
    this.filtroRaza = 'todos';
    this.filtroDpto = 'todos';
    this.aplicarFiltros();
  }

  // ── navegación detalle ─────────────────────────────────────
  abrirDetalle(lote: LoteVisual, idx: number): void {
    this.loteActivo  = lote;
    this.indiceActivo = idx;
    this.videoActivo  = false;
    this.modoVista    = 'detalle';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  irAnterior(): void {
    if (this.indiceActivo > 0) {
      this.indiceActivo--;
      this.loteActivo  = this.lotesFiltrados[this.indiceActivo];
      this.videoActivo = false;
    }
  }

  irSiguiente(): void {
    if (this.indiceActivo < this.lotesFiltrados.length - 1) {
      this.indiceActivo++;
      this.loteActivo  = this.lotesFiltrados[this.indiceActivo];
      this.videoActivo = false;
    }
  }

  volverGrilla(): void {
    this.modoVista   = 'grid';
    this.loteActivo  = null;
    this.videoActivo = false;
  }

  reproducir(): void { this.videoActivo = true; }

  // ── teclado ────────────────────────────────────────────────
  @HostListener('window:keydown', ['$event'])
  onKey(e: KeyboardEvent): void {
    if (this.modoVista !== 'detalle') return;
    if (e.key === 'ArrowLeft')  { e.preventDefault(); this.irAnterior(); }
    if (e.key === 'ArrowRight') { e.preventDefault(); this.irSiguiente(); }
    if (e.key === 'Escape')     { this.volverGrilla(); }
  }

  // ── helpers ────────────────────────────────────────────────
  get hayFiltrosActivos(): boolean {
    return this.busqueda !== '' || this.filtroTipo !== 'todos' ||
      this.filtroEstado !== 'todos' || this.filtroTipoGanado !== 'todos' ||
      this.filtroRaza !== 'todos' || this.filtroDpto !== 'todos';
  }

  valorTotal(l: LoteVisual): number { return l.cantidadCabezas * l.precioUnitario; }

  origenIcon(origen: string): string {
    return origen === 'chatbot' ? '🤖' : '✍️';
  }

  thumbnailError(event: Event): void {
    (event.target as HTMLImageElement).src =
      'https://placehold.co/480x270/2d7a4f/ffffff?text=Sin+Video';
  }

  countTipo(tipo: 'compra' | 'venta'): number {
    return this.todosLotes.filter(l => l.tipo === tipo).length;
  }

  estadoClass(estado: string): string {
    return estado.toLowerCase().replace(/ /g, '-').replace(/ó/g, 'o').replace(/ú/g, 'u').replace(/é/g, 'e');
  }

  logout(): void { this.auth.logout(); }
}
