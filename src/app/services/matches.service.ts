import { Injectable } from '@angular/core';
import { Match, EstadoMatch, DetalleCompatibilidad } from '../models/match.model';

// ── Motor de compatibilidad ─────────────────────────────────────────
// Criterio        Peso máx   Regla
// Tipo ganado       40 pts   Exact match requerido
// Raza              20 pts   Exact=20 | Compatible (cruce)=12 | Distinta=0
// Precio (margen)   20 pts   <15%=20 | 15-30%=15 | 30-50%=10 | >50%=0
// Cabezas           20 pts   <10%=20 | 10-30%=15 | 30-50%=10 | >50%=5

function calcCompat(
  tipoCompra: string, tipoVenta: string,
  razaCompra: string, razaVenta: string,
  precioCompra: number, precioVenta: number,
  cabezasCompra: number, cabezasVenta: number,
): DetalleCompatibilidad {
  // 1. Tipo ganado (40 pts)
  const puntosTipo = tipoCompra === tipoVenta ? 40 : 0;

  // 2. Raza (20 pts)
  let puntosRaza = 0;
  if (razaCompra === razaVenta) {
    puntosRaza = 20;
  } else if (razaCompra.includes(razaVenta) || razaVenta.includes(razaCompra)) {
    puntosRaza = 12;
  }

  // 3. Precio — margen entre precio de compra y precio de venta (20 pts)
  let puntosPrecio = 0;
  if (precioVenta >= precioCompra) {
    const margen = (precioVenta - precioCompra) / precioCompra;
    if (margen < 0.15)      puntosPrecio = 20;
    else if (margen < 0.30) puntosPrecio = 15;
    else if (margen < 0.50) puntosPrecio = 10;
  }

  // 4. Cabezas — diferencia relativa (20 pts)
  const maxCab = Math.max(cabezasCompra, cabezasVenta);
  const diffCab = Math.abs(cabezasCompra - cabezasVenta) / maxCab;
  let puntosCab = 0;
  if (diffCab < 0.10)      puntosCab = 20;
  else if (diffCab < 0.30) puntosCab = 15;
  else if (diffCab < 0.50) puntosCab = 10;
  else                      puntosCab = 5;

  return {
    tipoGanado: puntosTipo,
    raza:       puntosRaza,
    precio:     puntosPrecio,
    cabezas:    puntosCab,
    total:      puntosTipo + puntosRaza + puntosPrecio + puntosCab,
  };
}

// ── Datos mock ──────────────────────────────────────────────────────
let MATCHES: Match[] = [
  {
    id: 1,
    loteVentaId: 'LV-0001', loteCompraId: 'LC-0001',
    tipoGanado: 'Novillos', raza: 'Hereford',
    cabezasVenta: 120, cabezasCompra: 120, precioVenta: 2100, precioCompra: 1850,
    departamento: 'Tacuarembó',
    comercialVendedor: 'Martín Pérez', comercialVendedorAvatar: 'MP',
    comercialComprador: 'Martín Pérez', comercialCompradorAvatar: 'MP',
    esCruzado: false,
    fecha: new Date('2024-11-05T10:00:00'),
    vistoVendedor: true, vistoComprador: true, estado: 'cerrado',
    compatibilidad: calcCompat('Novillos','Novillos','Hereford','Hereford',1850,2100,120,120),
    notas: 'Operación concretada. Entrega en frigorífico Canelones.',
  },
  {
    id: 2,
    loteVentaId: 'LV-0002', loteCompraId: 'LC-0002',
    tipoGanado: 'Terneros', raza: 'Aberdeen Angus',
    cabezasVenta: 85, cabezasCompra: 85, precioVenta: 1050, precioCompra: 920,
    departamento: 'Rivera',
    comercialVendedor: 'Laura Gómez', comercialVendedorAvatar: 'LG',
    comercialComprador: 'Laura Gómez', comercialCompradorAvatar: 'LG',
    esCruzado: false,
    fecha: new Date('2024-11-10T15:00:00'),
    vistoVendedor: true, vistoComprador: true, estado: 'en_negociacion',
    compatibilidad: calcCompat('Terneros','Terneros','Aberdeen Angus','Aberdeen Angus',920,1050,85,85),
    notas: 'Negociando precio con flete incluido.',
  },
  {
    id: 3,
    loteVentaId: 'LV-0003', loteCompraId: 'LC-0005',
    tipoGanado: 'Toros', raza: 'Aberdeen Angus',
    cabezasVenta: 15, cabezasCompra: 15, precioVenta: 5200, precioCompra: 4500,
    departamento: 'Paysandú',
    comercialVendedor: 'Ana Silveira', comercialVendedorAvatar: 'AS',
    comercialComprador: 'Ana Silveira', comercialCompradorAvatar: 'AS',
    esCruzado: false,
    fecha: new Date('2024-11-13T11:00:00'),
    vistoVendedor: true, vistoComprador: false, estado: 'visto_vendedor',
    compatibilidad: calcCompat('Toros','Toros','Aberdeen Angus','Aberdeen Angus',4500,5200,15,15),
    notas: 'Comprador solicitó seña del 20%.',
  },
  // Ejemplo de match al 80% — mismo tipo, raza compatible, cabezas y precio con diferencia
  {
    id: 4,
    loteVentaId: 'LV-0004', loteCompraId: 'LC-0001',
    tipoGanado: 'Novillos', raza: 'Hereford x Aberdeen',
    cabezasVenta: 200, cabezasCompra: 120, precioVenta: 2350, precioCompra: 1850,
    departamento: 'Salto / Tacuarembó',
    comercialVendedor: 'Martín Pérez', comercialVendedorAvatar: 'MP',
    comercialComprador: 'Martín Pérez', comercialCompradorAvatar: 'MP',
    esCruzado: false,
    fecha: new Date('2024-11-14T09:00:00'),
    vistoVendedor: false, vistoComprador: false, estado: 'nuevo',
    // Tipo=40 Raza=12(compatible) Precio=15(27%) Cabezas=10(40%diff) → 77% ≈ 80%
    compatibilidad: calcCompat('Novillos','Novillos','Hereford','Hereford x Aberdeen',1850,2350,120,200),
  },
  {
    id: 5,
    loteVentaId: 'LV-0002', loteCompraId: 'LC-0001',
    tipoGanado: 'Terneros', raza: 'Aberdeen Angus',
    cabezasVenta: 85, cabezasCompra: 120, precioVenta: 1050, precioCompra: 1850,
    departamento: 'Rivera / Tacuarembó',
    comercialVendedor: 'Laura Gómez', comercialVendedorAvatar: 'LG',
    comercialComprador: 'Martín Pérez', comercialCompradorAvatar: 'MP',
    esCruzado: true,
    fecha: new Date('2024-11-11T08:30:00'),
    vistoVendedor: true, vistoComprador: false, estado: 'visto_vendedor',
    compatibilidad: calcCompat('Terneros','Terneros','Aberdeen Angus','Aberdeen Angus',1850,1050,120,85),
    notas: 'Precio de venta menor al de compra — posible oportunidad inversa.',
  },
  {
    id: 6,
    loteVentaId: 'LV-0005', loteCompraId: 'LC-0003',
    tipoGanado: 'Vacas con cría', raza: 'Criolla',
    cabezasVenta: 30, cabezasCompra: 45, precioVenta: 2300, precioCompra: 2100,
    departamento: 'Flores',
    comercialVendedor: 'Diego Rodríguez', comercialVendedorAvatar: 'DR',
    comercialComprador: 'Diego Rodríguez', comercialCompradorAvatar: 'DR',
    esCruzado: false,
    fecha: new Date('2024-11-15T14:20:00'),
    vistoVendedor: false, vistoComprador: false, estado: 'nuevo',
    compatibilidad: calcCompat('Vacas con cría','Vacas con cría','Criolla','Criolla',2100,2300,45,30),
  },
  {
    id: 7,
    loteVentaId: 'LV-0004', loteCompraId: 'LC-0004',
    tipoGanado: 'Novillos', raza: 'Hereford x Aberdeen',
    cabezasVenta: 200, cabezasCompra: 200, precioVenta: 2350, precioCompra: 1920,
    departamento: 'Salto',
    comercialVendedor: 'Martín Pérez', comercialVendedorAvatar: 'MP',
    comercialComprador: 'Martín Pérez', comercialCompradorAvatar: 'MP',
    esCruzado: false,
    fecha: new Date('2024-11-01T09:00:00'),
    vistoVendedor: true, vistoComprador: true, estado: 'cerrado',
    compatibilidad: calcCompat('Novillos','Novillos','Hereford x Aberdeen','Hereford x Aberdeen',1920,2350,200,200),
    notas: 'Operación cerrada — exportación confirmada.',
  },
  {
    id: 8,
    loteVentaId: 'LV-0003', loteCompraId: 'LC-0002',
    tipoGanado: 'Toros', raza: 'Aberdeen Angus',
    cabezasVenta: 15, cabezasCompra: 85, precioVenta: 5200, precioCompra: 920,
    departamento: 'Paysandú / Rivera',
    comercialVendedor: 'Ana Silveira', comercialVendedorAvatar: 'AS',
    comercialComprador: 'Laura Gómez', comercialCompradorAvatar: 'LG',
    esCruzado: true,
    fecha: new Date('2024-11-16T11:00:00'),
    vistoVendedor: false, vistoComprador: false, estado: 'nuevo',
    compatibilidad: calcCompat('Toros','Toros','Aberdeen Angus','Aberdeen Angus',920,5200,85,15),
    notas: 'Match automático por tipo de ganado. Precio y cabezas muy dispares.',
  },
];

@Injectable({ providedIn: 'root' })
export class MatchesService {

  getAll(): Match[] {
    return [...MATCHES].sort((a, b) => b.fecha.getTime() - a.fecha.getTime());
  }

  marcarVistoVendedor(id: number): void {
    const m = MATCHES.find(x => x.id === id);
    if (!m) return;
    m.vistoVendedor = true;
    m.estado = this.calcularEstado(m);
  }

  marcarVistoComprador(id: number): void {
    const m = MATCHES.find(x => x.id === id);
    if (!m) return;
    m.vistoComprador = true;
    m.estado = this.calcularEstado(m);
  }

  avanzarEstado(id: number, estado: EstadoMatch): void {
    const m = MATCHES.find(x => x.id === id);
    if (m) m.estado = estado;
  }

  private calcularEstado(m: Match): EstadoMatch {
    if (['cerrado','descartado','en_negociacion'].includes(m.estado)) return m.estado;
    if (m.vistoVendedor && m.vistoComprador) return 'ambos_vistos';
    if (m.vistoVendedor)  return 'visto_vendedor';
    if (m.vistoComprador) return 'visto_comprador';
    return 'nuevo';
  }

  getStats() {
    return {
      total:      MATCHES.length,
      nuevos:     MATCHES.filter(m => m.estado === 'nuevo').length,
      enProgreso: MATCHES.filter(m => ['visto_vendedor','visto_comprador','ambos_vistos','en_negociacion'].includes(m.estado)).length,
      cerrados:   MATCHES.filter(m => m.estado === 'cerrado').length,
      cruzados:   MATCHES.filter(m => m.esCruzado).length,
      altaCompat: MATCHES.filter(m => m.compatibilidad.total >= 80).length,
    };
  }

  getTiposGanado(): string[] {
    return [...new Set(MATCHES.map(m => m.tipoGanado))];
  }

  getComercialesInvolucrados(): string[] {
    const set = new Set<string>();
    MATCHES.forEach(m => { set.add(m.comercialVendedor); set.add(m.comercialComprador); });
    return [...set].sort();
  }

  colorCompatibilidad(pct: number): string {
    if (pct >= 80) return 'alta';
    if (pct >= 60) return 'media';
    return 'baja';
  }
}
