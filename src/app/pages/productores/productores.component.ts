import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ProductoresService } from '../../services/productores.service';
import { Productor, CategoriaProductor, EstadoProductor,
         MedioContacto, PrioridadContacto } from '../../models/productor.model';

@Component({
  selector: 'app-productores',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SidebarComponent],
  templateUrl: './productores.component.html',
  styleUrl:    './productores.component.scss',
})
export class ProductoresComponent implements OnInit {
  productores: Productor[] = [];
  filtrados:   Productor[] = [];
  seleccionado: Productor | null = null;
  modoVista: 'lista' | 'ficha' | 'nuevo' = 'lista';
  sidebarOpen = true;
  formGuardado = false;

  // Filtros
  busqueda       = '';
  filtroCategoria = 'todos';
  filtroEstado    = 'todos';
  filtroDpto      = 'todos';
  filtroContacto  = 'todos';   // 'todos' | 'reciente' | 'medio' | 'urgente'
  filtroPrioridad = 'todos';

  stats: ReturnType<ProductoresService['getStats']> | null = null;

  // Registro contacto inline
  contactoResumen = '';
  contactoMedio: MedioContacto = 'telefono';

  // Nuevo productor
  nuevo: Partial<Productor> = {};

  readonly categorias: { valor: CategoriaProductor; label: string }[] = [
    { valor: 'vendedor',  label: 'Vendedor'  },
    { valor: 'comprador', label: 'Comprador' },
    { valor: 'ambos',     label: 'Ambos'     },
  ];

  readonly estados: { valor: EstadoProductor; label: string }[] = [
    { valor: 'activo',     label: 'Activo'     },
    { valor: 'potencial',  label: 'Potencial'  },
    { valor: 'inactivo',   label: 'Inactivo'   },
    { valor: 'perdido',    label: 'Perdido'    },
  ];

  readonly mediosContacto: { valor: MedioContacto; label: string; icon: string }[] = [
    { valor: 'telefono', label: 'Teléfono',  icon: '📞' },
    { valor: 'whatsapp', label: 'WhatsApp',  icon: '💬' },
    { valor: 'email',    label: 'Email',     icon: '📧' },
    { valor: 'visita',   label: 'Visita',    icon: '🤝' },
    { valor: 'chatbot',  label: 'Chatbot',   icon: '🤖' },
    { valor: 'feria',    label: 'Feria/Expo',icon: '🏟️' },
  ];

  readonly prioridades: { valor: PrioridadContacto; label: string }[] = [
    { valor: 'alta',  label: 'Alta'  },
    { valor: 'media', label: 'Media' },
    { valor: 'baja',  label: 'Baja'  },
  ];

  readonly tiposProductor = [
    { valor: 'criador',          label: 'Criador'          },
    { valor: 'invernador',       label: 'Invernador'       },
    { valor: 'engordador',       label: 'Engordador'       },
    { valor: 'cabana',           label: 'Cabaña'           },
    { valor: 'frigorifico',      label: 'Frigorífico'      },
    { valor: 'exportador',       label: 'Exportador'       },
    { valor: 'productor_mixto',  label: 'Productor mixto'  },
  ];

  readonly tiposGanadoOpts = ['Novillos','Terneros','Vacas','Vacas con cría','Toros','Vaquillonas'];
  readonly razasOpts        = ['Hereford','Aberdeen Angus','Hereford x Aberdeen','Criolla','Shorthorn','Limousin'];
  readonly departamentos    = ['Artigas','Canelones','Cerro Largo','Colonia','Durazno','Flores','Florida','Lavalleja','Maldonado','Montevideo','Paysandú','Río Negro','Rivera','Rocha','Salto','San José','Soriano','Tacuarembó','Treinta y Tres'];

  constructor(
    private svc: ProductoresService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.productores = this.svc.getAll();
    this.stats = this.svc.getStats();
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    this.filtrados = this.productores.filter(p => {
      const q = this.busqueda.toLowerCase();
      const matchBusq = !q ||
        p.nombre.toLowerCase().includes(q) ||
        (p.estancia  ?? '').toLowerCase().includes(q) ||
        (p.empresa   ?? '').toLowerCase().includes(q) ||
        p.telefono.includes(q) ||
        p.departamento.toLowerCase().includes(q) ||
        p.localidad.toLowerCase().includes(q);

      const matchCat    = this.filtroCategoria === 'todos' || p.categoria === this.filtroCategoria;
      const matchEst    = this.filtroEstado    === 'todos' || p.estado    === this.filtroEstado;
      const matchDpto   = this.filtroDpto      === 'todos' || p.departamento === this.filtroDpto;
      const matchPrio   = this.filtroPrioridad === 'todos' || p.prioridad === this.filtroPrioridad;
      const matchCont   = this.filtroContacto  === 'todos' || this.svc.urgenciaContacto(p) === this.filtroContacto;

      return matchBusq && matchCat && matchEst && matchDpto && matchPrio && matchCont;
    });

    // Ordenar: urgentes primero, luego por días sin contactar desc
    this.filtrados.sort((a, b) => {
      const priMap = { alta: 0, media: 1, baja: 2 };
      if (priMap[a.prioridad] !== priMap[b.prioridad]) return priMap[a.prioridad] - priMap[b.prioridad];
      return this.svc.diasSinContactar(b) - this.svc.diasSinContactar(a);
    });
  }

  seleccionar(p: Productor): void {
    this.seleccionado = p;
    this.contactoResumen = '';
    this.contactoMedio   = 'telefono';
    this.modoVista = 'ficha';
  }

  abrirNuevo(): void {
    this.nuevo = {
      categoria: 'vendedor', tipo: 'criador', estado: 'activo', prioridad: 'media',
      ultimoMedioContacto: 'telefono', historialContactos: [],
      fechaAlta: new Date().toISOString().split('T')[0],
      ultimaFechaContacto: new Date().toISOString().split('T')[0],
      tiposGanado: [], razasPreferidas: [],
      agente: this.auth.getUser()?.name ?? '', agenteAvatar: this.auth.getUser()?.avatar ?? '',
    };
    this.formGuardado = false;
    this.modoVista = 'nuevo';
  }

  guardarNuevo(): void {
    const p = { ...this.nuevo, id: this.svc.nextId() } as Productor;
    this.svc.add(p);
    this.productores = this.svc.getAll();
    this.stats = this.svc.getStats();
    this.aplicarFiltros();
    this.formGuardado = true;
    setTimeout(() => this.seleccionar(p), 800);
  }

  registrarContacto(): void {
    if (!this.seleccionado || !this.contactoResumen.trim()) return;
    this.svc.registrarContacto(
      this.seleccionado.id,
      this.contactoMedio,
      this.contactoResumen,
      this.auth.getUser()?.name ?? ''
    );
    this.productores = this.svc.getAll();
    this.stats = this.svc.getStats();
    this.aplicarFiltros();
    this.seleccionado = this.svc.getById(this.seleccionado.id) ?? null;
    this.contactoResumen = '';
  }

  dias(p: Productor): number { return this.svc.diasSinContactar(p); }
  urgencia(p: Productor): string { return this.svc.urgenciaContacto(p); }

  categoriaLabel(c: string): string  { return this.categorias.find(x => x.valor === c)?.label  ?? c; }
  estadoLabel(e: string): string      { return this.estados.find(x => x.valor === e)?.label    ?? e; }
  tipoLabel(t: string): string        { return this.tiposProductor.find(x => x.valor === t)?.label ?? t; }
  medioIcon(m: string): string        { return this.mediosContacto.find(x => x.valor === m)?.icon ?? '📞'; }
  medioLabel(m: string): string       { return this.mediosContacto.find(x => x.valor === m)?.label ?? m; }

  dptos(): string[] {
    return [...new Set(this.productores.map(p => p.departamento))].sort();
  }

  logout(): void { this.auth.logout(); }
}
