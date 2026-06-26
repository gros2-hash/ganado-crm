import { Injectable } from '@angular/core';
import { Comercial, ComercialStats, MatchLote, ZonaComercial, RolComercial } from '../models/comercial.model';
import { LotesCompraService } from './lotes-compra.service';
import { LotesVentaService } from './lotes-venta.service';

const COMERCIALES: Comercial[] = [
  { id: 1, nombre: 'Martín Pérez',    avatar: 'MP', email: 'mperez@ganadocrm.uy',    telefono: '+598 99 100 200', zona: 'Norte',  rol: 'comercial',  activo: true  },
  { id: 2, nombre: 'Laura Gómez',     avatar: 'LG', email: 'lgomez@ganadocrm.uy',     telefono: '+598 99 200 300', zona: 'Este',   rol: 'comercial',  activo: true  },
  { id: 3, nombre: 'Diego Rodríguez', avatar: 'DR', email: 'drodriguez@ganadocrm.uy', telefono: '+598 99 300 400', zona: 'Oeste',  rol: 'supervisor', activo: true  },
  { id: 4, nombre: 'Ana Silveira',    avatar: 'AS', email: 'asilveira@ganadocrm.uy',  telefono: '+598 99 400 500', zona: 'Sur',    rol: 'comercial',  activo: true  },
  { id: 5, nombre: 'Pablo Ferreira',  avatar: 'PF', email: 'pferreira@ganadocrm.uy',  telefono: '+598 99 500 600', zona: 'Centro', rol: 'gerente',    activo: true  },
  { id: 6, nombre: 'Sofía Brum',      avatar: 'SB', email: 'sbrum@ganadocrm.uy',      telefono: '+598 99 600 700', zona: 'Norte',  rol: 'comercial',  activo: false },
];

const ESTADOS_ACTIVOS_COMPRA  = ['nuevo', 'contactado', 'negociacion'];
const ESTADOS_ACTIVOS_VENTA   = ['disponible', 'reservado', 'negociacion'];

@Injectable({ providedIn: 'root' })
export class ComercialService {
  constructor(
    private compraService: LotesCompraService,
    private ventaService:  LotesVentaService,
  ) {}

  getAll(): Comercial[] {
    return COMERCIALES;
  }

  getStats(comercial: Comercial): ComercialStats {
    const lotesCompra = this.compraService.getAll();
    const lotesVenta  = this.ventaService.getAll();

    const misCompras = lotesCompra.filter(l => l.agente === comercial.nombre);
    const misVentas  = lotesVenta.filter(l => l.agente === comercial.nombre);

    // ── Tiempo y sesiones en chatbot ─────────────────────────────────
    let minutosChatbot = 0;
    let sesiones = 0;

    const sumarSesiones = (flujos: { fechaInicio: string; fechaFin: string }[]) => {
      for (const f of flujos) {
        const ini = new Date(f.fechaInicio.replace(' ', 'T'));
        const fin = new Date(f.fechaFin.replace(' ', 'T'));
        if (!isNaN(ini.getTime()) && !isNaN(fin.getTime())) {
          minutosChatbot += Math.round((fin.getTime() - ini.getTime()) / 60000);
          sesiones++;
        }
      }
    };

    misCompras.forEach(l => sumarSesiones(l.flujosChatbot ?? []));
    misVentas.forEach(l  => sumarSesiones(l.flujosChatbot ?? []));

    // ── Lotes vía chatbot ────────────────────────────────────────────
    const lotesCompraChatbot = misCompras.filter(l => l.origen === 'chatbot').length;
    const lotesVentaChatbot  = misVentas.filter(l => l.origen === 'chatbot').length;

    // ── Matches activos ──────────────────────────────────────────────
    const comprasActivas = lotesCompra.filter(l =>
      ESTADOS_ACTIVOS_COMPRA.includes(l.estado) && l.agente === comercial.nombre
    );
    const ventasActivas = lotesVenta.filter(l =>
      ESTADOS_ACTIVOS_VENTA.includes(l.estado)
    );

    const matches: MatchLote[] = [];
    for (const compra of comprasActivas) {
      for (const venta of ventasActivas) {
        if (compra.tipoGanado === venta.tipoGanado) {
          matches.push({
            loteCompraId:   compra.id,
            loteVentaId:    venta.id,
            tipoGanado:     compra.tipoGanado,
            raza:           compra.raza,
            cabezasCompra:  compra.cantidadCabezas,
            cabezasVenta:   venta.cantidadCabezas,
            comercialCompra: compra.agente,
            comercialVenta:  venta.agente,
            esCruzado:       compra.agente !== venta.agente,
          });
        }
      }
    }

    return {
      minutosChatbot,
      sesiones,
      lotesCompraChatbot,
      lotesVentaChatbot,
      totalLotesCompra: misCompras.length,
      totalLotesVenta:  misVentas.length,
      matches,
    };
  }

  formatTiempo(minutos: number): string {
    if (minutos === 0) return '0 min';
    const h = Math.floor(minutos / 60);
    const m = minutos % 60;
    return h > 0 ? `${h}h ${m}min` : `${m} min`;
  }

  getResumen() {
    const todos = COMERCIALES;
    return {
      total:       todos.length,
      activos:     todos.filter(c => c.activo).length,
      inactivos:   todos.filter(c => !c.activo).length,
      porZona:     this.contarPor(todos, 'zona'),
      porRol:      this.contarPor(todos, 'rol'),
    };
  }

  private contarPor<K extends keyof Comercial>(lista: Comercial[], campo: K): Record<string, number> {
    return lista.reduce((acc, c) => {
      const k = String(c[campo]);
      acc[k] = (acc[k] ?? 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  readonly zonas: ZonaComercial[]  = ['Norte', 'Sur', 'Este', 'Oeste', 'Centro'];
  readonly roles: RolComercial[]   = ['gerente', 'supervisor', 'comercial'];
}
