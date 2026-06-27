import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { UserMenuComponent } from '../../components/user-menu/user-menu.component';
import { ProductoresService } from '../../services/productores.service';
import { Productor, CategoriaProductor, EstadoProductor,
         MedioContacto, PrioridadContacto } from '../../models/productor.model';

type SeccionKey = 'contacto' | 'perfil' | 'historial' | 'registrar';

@Component({
  selector: 'app-productores',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SidebarComponent, UserMenuComponent],
  templateUrl: './productores.component.html',
  styleUrl:    './productores.component.scss',
})
export class ProductoresComponent implements OnInit {
  productores: Productor[] = [];
  filtrados:   Productor[] = [];
  urgentes:    Productor[] = [];
  sidebarOpen  = true;
  formGuardado = false;

  // Filtros
  busqueda        = '';
  filtroCategoria = 'todos';
  filtroEstado    = 'todos';
  filtroDpto      = 'todos';
  filtroContacto  = 'todos';
  filtroPrioridad = 'todos';
  miCartera       = true;

  // Vista
  modoVista: 'lista' | 'nuevo' = 'lista';

  // Card state
  expandidoId:     string | null = null;
  reminderAbierto: string | null = null;
  secciones: Record<string, Record<SeccionKey, boolean>> = {};

  // Registro de contacto por tarjeta
  regMedio:   Record<string, MedioContacto | null> = {};
  regResumen: Record<string, string>               = {};

  // Stats
  stats: ReturnType<ProductoresService['getStats']> | null = null;

  // Nuevo productor
  nuevo: Partial<Productor> = {};

  readonly categorias: { valor: CategoriaProductor; label: string }[] = [
    { valor: 'vendedor',  label: 'Vendedor'  },
    { valor: 'comprador', label: 'Comprador' },
    { valor: 'ambos',     label: 'Ambos'     },
  ];

  readonly estados: { valor: EstadoProductor; label: string }[] = [
    { valor: 'activo',    label: 'Activo'    },
    { valor: 'potencial', label: 'Potencial' },
    { valor: 'inactivo',  label: 'Inactivo'  },
    { valor: 'perdido',   label: 'Perdido'   },
  ];

  readonly mediosContacto: { valor: MedioContacto; label: string; icon: string }[] = [
    { valor: 'telefono', label: 'Teléfono',   icon: '📞' },
    { valor: 'whatsapp', label: 'WhatsApp',   icon: '💬' },
    { valor: 'email',    label: 'Email',      icon: '📧' },
    { valor: 'visita',   label: 'Visita',     icon: '🤝' },
    { valor: 'chatbot',  label: 'Chatbot',    icon: '🤖' },
    { valor: 'feria',    label: 'Feria/Expo', icon: '🏟️' },
  ];

  readonly prioridades: { valor: PrioridadContacto; label: string }[] = [
    { valor: 'alta',  label: 'Alta'  },
    { valor: 'media', label: 'Media' },
    { valor: 'baja',  label: 'Baja'  },
  ];

  readonly tiposProductor = [
    { valor: 'criador',         label: 'Criador'         },
    { valor: 'invernador',      label: 'Invernador'      },
    { valor: 'engordador',      label: 'Engordador'      },
    { valor: 'cabana',          label: 'Cabaña'          },
    { valor: 'frigorifico',     label: 'Frigorífico'     },
    { valor: 'exportador',      label: 'Exportador'      },
    { valor: 'productor_mixto', label: 'Productor mixto' },
  ];

  readonly tiposGanadoOpts = ['Novillos','Terneros','Vacas','Vacas con cría','Toros','Vaquillonas'];
  readonly razasOpts        = ['Hereford','Aberdeen Angus','Hereford x Aberdeen','Criolla','Shorthorn','Limousin'];
  readonly departamentos    = ['Artigas','Canelones','Cerro Largo','Colonia','Durazno','Flores','Florida','Lavalleja','Maldonado','Montevideo','Paysandú','Río Negro','Rivera','Rocha','Salto','San José','Soriano','Tacuarembó','Treinta y Tres'];

  constructor(
    private svc: ProductoresService,
    public auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.productores = this.svc.getAll();
    this.stats       = this.svc.getStats();
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    let res = [...this.productores];

    const u = this.auth.getUser();
    if (this.miCartera && u?.name) {
      res = res.filter(p => p.agente === u.name);
    }

    const q = this.busqueda.toLowerCase();
    if (q) res = res.filter(p =>
      p.nombre.toLowerCase().includes(q) ||
      (p.estancia ?? '').toLowerCase().includes(q) ||
      (p.empresa  ?? '').toLowerCase().includes(q) ||
      p.telefono.includes(q) ||
      p.departamento.toLowerCase().includes(q) ||
      p.localidad.toLowerCase().includes(q)
    );

    if (this.filtroCategoria !== 'todos') res = res.filter(p => p.categoria   === this.filtroCategoria);
    if (this.filtroEstado    !== 'todos') res = res.filter(p => p.estado      === this.filtroEstado);
    if (this.filtroDpto      !== 'todos') res = res.filter(p => p.departamento === this.filtroDpto);
    if (this.filtroPrioridad !== 'todos') res = res.filter(p => p.prioridad   === this.filtroPrioridad);
    if (this.filtroContacto  !== 'todos') res = res.filter(p => this.svc.urgenciaContacto(p) === this.filtroContacto);

    res.sort((a, b) => {
      const priMap: Record<string, number> = { alta: 0, media: 1, baja: 2 };
      if (priMap[a.prioridad] !== priMap[b.prioridad]) return priMap[a.prioridad] - priMap[b.prioridad];
      return this.svc.diasSinContactar(b) - this.svc.diasSinContactar(a);
    });

    this.filtrados = res;
    this.urgentes  = res.filter(p => this.svc.urgenciaContacto(p) === 'urgente');
  }

  toggleCard(p: Productor): void {
    if (this.expandidoId === p.id) {
      this.expandidoId = null;
    } else {
      this.expandidoId = p.id;
      if (!this.secciones[p.id]) {
        this.secciones[p.id] = { contacto: true, perfil: false, historial: false, registrar: false };
      }
    }
    this.reminderAbierto = null;
  }

  toggleSeccion(id: string, sec: SeccionKey, event: Event): void {
    event.stopPropagation();
    if (!this.secciones[id]) {
      this.secciones[id] = { contacto: false, perfil: false, historial: false, registrar: false };
    }
    this.secciones[id][sec] = !this.secciones[id][sec];
  }

  toggleReminder(id: string, event: Event): void {
    event.stopPropagation();
    this.reminderAbierto = this.reminderAbierto === id ? null : id;
  }

  registrarContactoInline(p: Productor, event: Event): void {
    event.stopPropagation();
    const medio = this.regMedio[p.id];
    if (!medio) return;
    this.svc.registrarContacto(p.id, medio, this.regResumen[p.id] ?? '', this.auth.getUser()?.name ?? '');
    this.regMedio[p.id]   = null;
    this.regResumen[p.id] = '';
    this.productores = this.svc.getAll();
    this.stats       = this.svc.getStats();
    this.aplicarFiltros();
  }

  abrirNuevo(): void {
    this.nuevo = {
      categoria: 'vendedor', tipo: 'criador', estado: 'activo', prioridad: 'media',
      ultimoMedioContacto: 'telefono', historialContactos: [],
      fechaAlta:           new Date().toISOString().split('T')[0],
      ultimaFechaContacto: new Date().toISOString().split('T')[0],
      tiposGanado: [], razasPreferidas: [],
      agente:       this.auth.getUser()?.name   ?? '',
      agenteAvatar: this.auth.getUser()?.avatar ?? '',
    };
    this.formGuardado = false;
    this.modoVista    = 'nuevo';
  }

  guardarNuevo(): void {
    if (!this.nuevo.nombre || !this.nuevo.telefono || !this.nuevo.departamento) return;
    const p = { ...this.nuevo, id: this.svc.nextId() } as Productor;
    this.svc.add(p);
    this.productores = this.svc.getAll();
    this.stats       = this.svc.getStats();
    this.aplicarFiltros();
    this.formGuardado = true;
    setTimeout(() => {
      this.modoVista   = 'lista';
      this.expandidoId = p.id;
    }, 800);
  }

  dias(p: Productor): number     { return this.svc.diasSinContactar(p); }
  urgencia(p: Productor): string { return this.svc.urgenciaContacto(p); }

  categoriaLabel(c: string): string { return this.categorias.find(x => x.valor === c)?.label     ?? c; }
  estadoLabel(e: string): string    { return this.estados.find(x => x.valor === e)?.label        ?? e; }
  tipoLabel(t: string): string      { return this.tiposProductor.find(x => x.valor === t)?.label ?? t; }
  medioIcon(m: string): string      { return this.mediosContacto.find(x => x.valor === m)?.icon  ?? '📞'; }
  medioLabel(m: string): string     { return this.mediosContacto.find(x => x.valor === m)?.label ?? m; }

  dptos(): string[] {
    return [...new Set(this.productores.map(p => p.departamento))].sort();
  }

  logout(): void { this.auth.logout(); }
}
