import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { LotesVentaService } from '../../services/lotes-venta.service';
import { LoteVenta, EstadoLoteVenta, Comprador,
         DestinoGanado, FormaPago, CondicionEntrega,
         FlujoChatbotVenta } from '../../models/lote-venta.model';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';

@Component({
  selector: 'app-lotes-venta',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SafeUrlPipe],
  templateUrl: './lotes-venta.component.html',
  styleUrl: './lotes-venta.component.scss',
})
export class LotesVentaComponent implements OnInit {
  lotes: LoteVenta[] = [];
  lotesFiltrados: LoteVenta[] = [];
  loteSeleccionado: LoteVenta | null = null;
  flujoActivo: FlujoChatbotVenta | null = null;
  modoVista: 'lista' | 'ficha' | 'nuevo' = 'lista';
  sidebarOpen = true;
  filtroEstado = 'todos';
  filtroDestino = 'todos';
  busqueda = '';
  stats: ReturnType<LotesVentaService['getStats']> | null = null;
  formGuardado = false;

  nuevoLote: Partial<LoteVenta> & { comprador: Partial<Comprador> } = {
    comprador: { nombre: '', celular: '', tipo: 'productor' },
    flujosChatbot: [],
  };

  readonly estados: { valor: EstadoLoteVenta; label: string }[] = [
    { valor: 'disponible',  label: 'Disponible'  },
    { valor: 'reservado',   label: 'Reservado'   },
    { valor: 'negociacion', label: 'Negociación' },
    { valor: 'cerrado',     label: 'Cerrado'     },
    { valor: 'cancelado',   label: 'Cancelado'   },
  ];

  readonly destinos: { valor: DestinoGanado; label: string }[] = [
    { valor: 'faena',       label: 'Faena'          },
    { valor: 'recria',      label: 'Recría'         },
    { valor: 'invernada',   label: 'Invernada'      },
    { valor: 'exportacion', label: 'Exportación'    },
    { valor: 'reproduccion',label: 'Reproducción'   },
  ];

  readonly formasPago: { valor: FormaPago; label: string }[] = [
    { valor: 'contado',   label: 'Contado'      },
    { valor: 'plazo_30',  label: 'Plazo 30 días' },
    { valor: 'plazo_60',  label: 'Plazo 60 días' },
    { valor: 'financiado',label: 'Financiado'   },
  ];

  readonly condicionesEntrega: { valor: CondicionEntrega; label: string }[] = [
    { valor: 'puesto_campo', label: 'Puesto en campo' },
    { valor: 'en_corrales',  label: 'En corrales'     },
    { valor: 'frigorifico',  label: 'Frigorífico'     },
  ];

  readonly tiposComprador = [
    { valor: 'frigorifico', label: 'Frigorífico'  },
    { valor: 'exportador',  label: 'Exportador'   },
    { valor: 'invernada',   label: 'Invernada'    },
    { valor: 'productor',   label: 'Productor'    },
    { valor: 'cabana',      label: 'Cabaña'       },
  ];

  readonly tiposGanado     = ['Novillos', 'Terneros', 'Vacas', 'Vacas con cría', 'Toros', 'Vaquillonas'];
  readonly razas            = ['Hereford', 'Aberdeen Angus', 'Hereford x Aberdeen', 'Criolla', 'Shorthorn', 'Limousin'];
  readonly departamentos    = ['Artigas','Canelones','Cerro Largo','Colonia','Durazno','Flores','Florida','Lavalleja','Maldonado','Montevideo','Paysandú','Río Negro','Rivera','Rocha','Salto','San José','Soriano','Tacuarembó','Treinta y Tres'];

  constructor(
    private ventaService: LotesVentaService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.lotes = this.ventaService.getAll();
    this.stats  = this.ventaService.getStats();
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    this.lotesFiltrados = this.lotes.filter(l => {
      const matchEstado  = this.filtroEstado  === 'todos' || l.estado  === this.filtroEstado;
      const matchDestino = this.filtroDestino === 'todos' || l.destino === this.filtroDestino;
      const q = this.busqueda.toLowerCase();
      const matchBusq = !q ||
        l.id.toLowerCase().includes(q) ||
        l.comprador.nombre.toLowerCase().includes(q) ||
        (l.comprador.empresa ?? '').toLowerCase().includes(q) ||
        l.descripcion.toLowerCase().includes(q) ||
        l.tipoGanado.toLowerCase().includes(q);
      return matchEstado && matchDestino && matchBusq;
    });
  }

  seleccionarLote(lote: LoteVenta): void {
    this.loteSeleccionado = lote;
    this.flujoActivo = lote.flujosChatbot[0] ?? null;
    this.modoVista = 'ficha';
  }

  abrirNuevo(): void {
    this.nuevoLote = {
      comprador: { nombre: '', celular: '', tipo: 'productor' },
      flujosChatbot: [],
      origen: 'manual',
      estado: 'disponible',
      fechaCreacion: new Date().toISOString().split('T')[0],
      fechaActualizacion: new Date().toISOString().split('T')[0],
      agente: this.auth.getUser()?.name ?? '',
      agenteAvatar: this.auth.getUser()?.avatar ?? '',
    };
    this.formGuardado = false;
    this.modoVista = 'nuevo';
  }

  guardarNuevo(): void {
    const lote = { ...this.nuevoLote, id: this.ventaService.nextId() } as LoteVenta;
    this.ventaService.add(lote);
    this.lotes = this.ventaService.getAll();
    this.stats  = this.ventaService.getStats();
    this.aplicarFiltros();
    this.formGuardado = true;
    setTimeout(() => { this.seleccionarLote(lote); }, 800);
  }

  cambiarEstado(id: string, estado: EstadoLoteVenta): void {
    this.ventaService.updateEstado(id, estado);
    this.lotes = this.ventaService.getAll();
    this.stats  = this.ventaService.getStats();
    this.aplicarFiltros();
    if (this.loteSeleccionado?.id === id) {
      this.loteSeleccionado = this.ventaService.getById(id) ?? null;
    }
  }

  setFlujoActivo(flujo: FlujoChatbotVenta): void { this.flujoActivo = flujo; }

  valorVenta(l: LoteVenta): number  { return l.cantidadCabezas * l.precioUnitario; }
  margenUnitario(l: LoteVenta): number | null {
    return l.costoUnitario != null ? l.precioUnitario - l.costoUnitario : null;
  }
  margenTotal(l: LoteVenta): number | null {
    const m = this.margenUnitario(l);
    return m != null ? m * l.cantidadCabezas : null;
  }
  comisionTotal(l: LoteVenta): number | null {
    return l.comisionPct != null ? this.valorVenta(l) * (l.comisionPct / 100) : null;
  }
  margenPct(l: LoteVenta): number | null {
    if (l.costoUnitario == null) return null;
    return Math.round(((l.precioUnitario - l.costoUnitario) / l.costoUnitario) * 100);
  }

  estadoLabel(e: string): string  { return this.estados.find(x => x.valor === e)?.label ?? e; }
  destinoLabel(d: string): string { return this.destinos.find(x => x.valor === d)?.label ?? d; }
  pagoLabel(p: string): string    { return this.formasPago.find(x => x.valor === p)?.label ?? p; }
  entregaLabel(c: string): string { return this.condicionesEntrega.find(x => x.valor === c)?.label ?? c; }
  compradorLabel(t: string): string { return this.tiposComprador.find(x => x.valor === t)?.label ?? t; }

  tipoMensajeClass(tipo: string): string {
    return ({ bot: 'msg-bot', cliente: 'msg-cliente', agente: 'msg-agente', sistema: 'msg-sistema' } as Record<string,string>)[tipo] ?? '';
  }

  videoId(url: string): string {
    const m = url.match(/(?:v=|youtu\.be\/)([^&\s]+)/);
    return m ? m[1] : '';
  }
  isYoutube(url: string): boolean { return url.includes('youtube') || url.includes('youtu.be'); }

  logout(): void { this.auth.logout(); }
}
