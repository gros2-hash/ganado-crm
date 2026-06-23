import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { LotesCompraService } from '../../services/lotes-compra.service';
import { LoteCompra, EstadoLote, FlujoChatbot, MensajeChatbot } from '../../models/lote-compra.model';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';

@Component({
  selector: 'app-lotes-compra',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SafeUrlPipe],
  templateUrl: './lotes-compra.component.html',
  styleUrl: './lotes-compra.component.scss',
})
export class LotesCompraComponent implements OnInit {
  lotes: LoteCompra[] = [];
  lotesFiltrados: LoteCompra[] = [];
  loteSeleccionado: LoteCompra | null = null;
  flujoActivo: FlujoChatbot | null = null;
  modoVista: 'lista' | 'ficha' | 'nuevo' = 'lista';
  sidebarOpen = true;
  filtroEstado = 'todos';
  filtroOrigen = 'todos';
  busqueda = '';
  stats: ReturnType<LotesCompraService['getStats']> | null = null;

  // Formulario nuevo lote
  nuevoLote: Partial<LoteCompra> = {};
  formGuardado = false;

  readonly estados: { valor: EstadoLote; label: string; color: string }[] = [
    { valor: 'nuevo',       label: 'Nuevo',       color: 'nuevo' },
    { valor: 'contactado',  label: 'Contactado',  color: 'contactado' },
    { valor: 'negociacion', label: 'Negociación', color: 'negociacion' },
    { valor: 'cerrado',     label: 'Cerrado',     color: 'cerrado' },
    { valor: 'cancelado',   label: 'Cancelado',   color: 'cancelado' },
  ];

  readonly tiposGanado = ['Novillos', 'Terneros', 'Vacas', 'Vacas con cría', 'Toros', 'Vaquillonas'];
  readonly razas = ['Hereford', 'Aberdeen Angus', 'Hereford x Aberdeen', 'Criolla', 'Shorthorn', 'Limousin'];
  readonly departamentos = ['Artigas','Canelones','Cerro Largo','Colonia','Durazno','Flores','Florida','Lavalleja','Maldonado','Montevideo','Paysandú','Río Negro','Rivera','Rocha','Salto','San José','Soriano','Tacuarembó','Treinta y Tres'];

  constructor(
    private lotesService: LotesCompraService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.lotes = this.lotesService.getAll();
    this.stats  = this.lotesService.getStats();
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    this.lotesFiltrados = this.lotes.filter(l => {
      const matchEstado = this.filtroEstado === 'todos' || l.estado === this.filtroEstado;
      const matchOrigen = this.filtroOrigen === 'todos' || l.origen === this.filtroOrigen;
      const q = this.busqueda.toLowerCase();
      const matchBusq = !q ||
        l.id.toLowerCase().includes(q) ||
        l.cliente.nombre.toLowerCase().includes(q) ||
        l.descripcion.toLowerCase().includes(q) ||
        l.tipoGanado.toLowerCase().includes(q);
      return matchEstado && matchOrigen && matchBusq;
    });
  }

  seleccionarLote(lote: LoteCompra): void {
    this.loteSeleccionado = lote;
    this.flujoActivo = lote.flujosChatbot[0] ?? null;
    this.modoVista = 'ficha';
  }

  abrirNuevo(): void {
    this.nuevoLote = {
      cliente: { nombre: '', celular: '' },
      flujosChatbot: [],
      origen: 'manual',
      estado: 'nuevo',
      fechaCreacion: new Date().toISOString().split('T')[0],
      fechaActualizacion: new Date().toISOString().split('T')[0],
      agente: this.auth.getUser()?.name ?? '',
      agenteAvatar: this.auth.getUser()?.avatar ?? '',
    };
    this.formGuardado = false;
    this.modoVista = 'nuevo';
  }

  guardarNuevo(): void {
    const lote = {
      ...this.nuevoLote,
      id: this.lotesService.nextId(),
    } as LoteCompra;
    this.lotesService.add(lote);
    this.lotes = this.lotesService.getAll();
    this.stats  = this.lotesService.getStats();
    this.aplicarFiltros();
    this.formGuardado = true;
    setTimeout(() => { this.seleccionarLote(lote); }, 800);
  }

  cambiarEstado(id: string, estado: EstadoLote): void {
    this.lotesService.updateEstado(id, estado);
    this.lotes = this.lotesService.getAll();
    this.stats  = this.lotesService.getStats();
    this.aplicarFiltros();
    if (this.loteSeleccionado?.id === id) {
      this.loteSeleccionado = this.lotesService.getById(id) ?? null;
    }
  }

  setFlujoActivo(flujo: FlujoChatbot): void { this.flujoActivo = flujo; }

  valorTotal(l: LoteCompra): number { return l.cantidadCabezas * l.precioUnitario; }

  estadoLabel(e: string): string {
    return this.estados.find(x => x.valor === e)?.label ?? e;
  }

  tipoMensajeClass(tipo: string): string {
    return { bot: 'msg-bot', cliente: 'msg-cliente', agente: 'msg-agente', sistema: 'msg-sistema' }[tipo] ?? '';
  }

  videoId(url: string): string {
    const m = url.match(/(?:v=|youtu\.be\/)([^&\s]+)/);
    return m ? m[1] : '';
  }

  isYoutube(url: string): boolean { return url.includes('youtube') || url.includes('youtu.be'); }

  logout(): void { this.auth.logout(); }
}
