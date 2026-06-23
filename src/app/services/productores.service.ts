import { Injectable } from '@angular/core';
import { Productor, CategoriaProductor, EstadoProductor, PrioridadContacto } from '../models/productor.model';

@Injectable({ providedIn: 'root' })
export class ProductoresService {

  private productores: Productor[] = [
    {
      id: 'PROD-0001',
      nombre: 'Juan Fernández', estancia: 'Est. La Querencia', rut: '21.456.789-0',
      categoria: 'vendedor', tipo: 'criador', estado: 'activo',
      telefono: '+598 99 123 456', email: 'jfernandez@campo.uy', whatsapp: '+598 99 123 456',
      departamento: 'Tacuarembó', localidad: 'Tacuarembó', direccionCampo: 'Ruta 5 km 312, Tacuarembó', hectareas: 800,
      tiposGanado: ['Novillos', 'Terneros'], razasPreferidas: ['Hereford', 'Aberdeen Angus'],
      volumenAnualCabezas: 300, precioPromedioHistorico: 1850,
      montoTotalComercializado: 1110000, totalOperaciones: 4,
      agente: 'Martín Pérez', agenteAvatar: 'MP', prioridad: 'alta',
      ultimaFechaContacto: '2024-11-10',
      ultimoMedioContacto: 'whatsapp',
      proximoSeguimiento: '2024-11-25',
      motivoUltimoContacto: 'Seguimiento negociación novillos LC-0001',
      ultimoLote: { id: 'LC-0001', tipoOp: 'venta', tipoGanado: 'Novillos', raza: 'Hereford', cabezas: 120, montoTotal: 222000, fechaOp: '2024-11-02' },
      historialContactos: [
        { fecha: '2024-11-10', medio: 'whatsapp', agente: 'Martín Pérez', resumen: 'Confirmó visita para el 15/11. Precio en $1.850 firme.' },
        { fecha: '2024-11-02', medio: 'chatbot',  agente: 'Martín Pérez', resumen: 'Primera consulta via chatbot. Generó lote LC-0001.' },
        { fecha: '2024-10-15', medio: 'telefono', agente: 'Martín Pérez', resumen: 'Llamada de prospección. Interesado en vender novillos antes de fin de año.' },
      ],
      fechaAlta: '2024-10-15',
      observaciones: 'Productor de confianza. Siempre cumple con los acuerdos. Preferible contactar por WhatsApp antes de las 11am.',
      tags: ['top-vendedor', 'hereford', 'confiable'],
    },
    {
      id: 'PROD-0002',
      nombre: 'Roberto Silva', estancia: 'Est. Don Carlos', rut: '34.567.890-1',
      categoria: 'vendedor', tipo: 'criador', estado: 'activo',
      telefono: '+598 98 765 432', email: 'rsilva@estancia.com',
      departamento: 'Rivera', localidad: 'Rivera', hectareas: 1200,
      tiposGanado: ['Terneros', 'Vacas'], razasPreferidas: ['Aberdeen Angus'],
      volumenAnualCabezas: 200, precioPromedioHistorico: 920,
      montoTotalComercializado: 296000, totalOperaciones: 2,
      agente: 'Laura Gómez', agenteAvatar: 'LG', prioridad: 'media',
      ultimaFechaContacto: '2024-11-09',
      ultimoMedioContacto: 'chatbot',
      proximoSeguimiento: '2024-11-20',
      motivoUltimoContacto: 'Contacto post-generación lote LC-0002',
      ultimoLote: { id: 'LC-0002', tipoOp: 'venta', tipoGanado: 'Terneros', raza: 'Aberdeen Angus', cabezas: 85, montoTotal: 78200, fechaOp: '2024-11-08' },
      historialContactos: [
        { fecha: '2024-11-09', medio: 'chatbot',  agente: 'Laura Gómez', resumen: 'Seguimiento lote LC-0002. Cliente a la espera de oferta.' },
        { fecha: '2024-10-20', medio: 'telefono', agente: 'Laura Gómez', resumen: 'Llamada inicial. Tiene terneros Angus para vender en noviembre.' },
      ],
      fechaAlta: '2024-10-20',
      tags: ['angus', 'terneros'],
    },
    {
      id: 'PROD-0003',
      nombre: 'Ricardo Noel', empresa: 'Frigorífico Canelones S.A.', rut: '21.789.012-3',
      categoria: 'comprador', tipo: 'frigorifico', estado: 'activo',
      telefono: '+598 99 321 654', email: 'rnoel@frigocanelones.com', whatsapp: '+598 99 321 654',
      departamento: 'Canelones', localidad: 'Santa Lucía', direccionCampo: 'Ruta 11 km 38, Santa Lucía',
      tiposGanado: ['Novillos', 'Vacas'], razasPreferidas: ['Hereford', 'Hereford x Aberdeen'],
      volumenAnualCabezas: 2000, precioPromedioHistorico: 2100,
      montoTotalComercializado: 252000, totalOperaciones: 1,
      agente: 'Martín Pérez', agenteAvatar: 'MP', prioridad: 'alta',
      ultimaFechaContacto: '2024-11-15',
      ultimoMedioContacto: 'telefono',
      proximoSeguimiento: '2024-11-28',
      motivoUltimoContacto: 'Cierre operación LV-0001 — 120 novillos entrega 20/11',
      ultimoLote: { id: 'LV-0001', tipoOp: 'compra', tipoGanado: 'Novillos', raza: 'Hereford', cabezas: 120, montoTotal: 252000, fechaOp: '2024-11-15' },
      historialContactos: [
        { fecha: '2024-11-15', medio: 'telefono', agente: 'Martín Pérez', resumen: 'Cierre de trato. $2.100/cab, contado, entrega 20/11 en frigorífico.' },
        { fecha: '2024-11-05', medio: 'chatbot',  agente: 'Martín Pérez', resumen: 'Contacto via chatbot. Buscaba novillos gordos para faena inmediata. Lote LV-0001.' },
        { fecha: '2024-10-01', medio: 'visita',   agente: 'Martín Pérez', resumen: 'Visita a planta. Renovación de relación comercial para temporada noviembre-diciembre.' },
      ],
      fechaAlta: '2024-10-01',
      observaciones: 'Cliente institucional de gran volumen. Siempre paga contado. Prioridad máxima.',
      tags: ['frigorifico', 'volumen-alto', 'contado'],
    },
    {
      id: 'PROD-0004',
      nombre: 'Pablo Orellano', estancia: 'Est. Los Médanos',
      categoria: 'comprador', tipo: 'invernador', estado: 'activo',
      telefono: '+598 98 111 222', email: 'porellano@campo.uy',
      departamento: 'Soriano', localidad: 'Mercedes', hectareas: 2500,
      tiposGanado: ['Terneros', 'Novillos'], razasPreferidas: ['Aberdeen Angus', 'Hereford x Aberdeen'],
      volumenAnualCabezas: 500, precioPromedioHistorico: 1050,
      montoTotalComercializado: 89250, totalOperaciones: 1,
      agente: 'Laura Gómez', agenteAvatar: 'LG', prioridad: 'media',
      ultimaFechaContacto: '2024-11-14',
      ultimoMedioContacto: 'whatsapp',
      proximoSeguimiento: '2024-11-22',
      motivoUltimoContacto: 'Negociación precio flete incluido LV-0002',
      ultimoLote: { id: 'LV-0002', tipoOp: 'compra', tipoGanado: 'Terneros', raza: 'Aberdeen Angus', cabezas: 85, montoTotal: 89250, fechaOp: '2024-11-10' },
      historialContactos: [
        { fecha: '2024-11-14', medio: 'whatsapp', agente: 'Laura Gómez', resumen: 'Negociando flete incluido. Contraoferta $1.020 + flete.' },
        { fecha: '2024-11-10', medio: 'chatbot',  agente: 'Laura Gómez', resumen: 'Primera consulta chatbot. Buscaba terneros Angus para invernada en Soriano.' },
      ],
      fechaAlta: '2024-11-10',
      tags: ['invernada', 'angus', 'flete'],
    },
    {
      id: 'PROD-0005',
      nombre: 'María Pérez', estancia: 'Est. Las Flores',
      categoria: 'vendedor', tipo: 'criador', estado: 'activo',
      telefono: '+598 91 234 567',
      departamento: 'Flores', localidad: 'Trinidad', hectareas: 450,
      tiposGanado: ['Vacas con cría', 'Terneros'], razasPreferidas: ['Criolla'],
      volumenAnualCabezas: 120, precioPromedioHistorico: 2100,
      montoTotalComercializado: 94500, totalOperaciones: 1,
      agente: 'Diego Rodríguez', agenteAvatar: 'DR', prioridad: 'baja',
      ultimaFechaContacto: '2024-11-12',
      ultimoMedioContacto: 'telefono',
      motivoUltimoContacto: 'Carga manual lote LC-0003',
      ultimoLote: { id: 'LC-0003', tipoOp: 'venta', tipoGanado: 'Vacas con cría', raza: 'Criolla', cabezas: 45, montoTotal: 94500, fechaOp: '2024-11-12' },
      historialContactos: [
        { fecha: '2024-11-12', medio: 'telefono', agente: 'Diego Rodríguez', resumen: 'Llamada. Ingresó vacas con cría. Lote LC-0003 cargado manualmente.' },
      ],
      fechaAlta: '2024-11-12',
      tags: ['criadora', 'criolla'],
    },
    {
      id: 'PROD-0006',
      nombre: 'Sergio Battistessa', empresa: 'Export Ganadera del Norte',
      categoria: 'comprador', tipo: 'exportador', estado: 'activo',
      telefono: '+598 91 777 888', email: 'sbattistessa@exportganadera.com', whatsapp: '+598 91 777 888',
      departamento: 'Montevideo', localidad: 'Montevideo',
      tiposGanado: ['Novillos'], razasPreferidas: ['Hereford x Aberdeen', 'Hereford'],
      volumenAnualCabezas: 3000, precioPromedioHistorico: 2350,
      montoTotalComercializado: 470000, totalOperaciones: 1,
      agente: 'Martín Pérez', agenteAvatar: 'MP', prioridad: 'alta',
      ultimaFechaContacto: '2024-11-14',
      ultimoMedioContacto: 'email',
      proximoSeguimiento: '2024-11-21',
      motivoUltimoContacto: 'Confirmar certificado HIT para lote LV-0004',
      ultimoLote: { id: 'LV-0004', tipoOp: 'compra', tipoGanado: 'Novillos', raza: 'Hereford x Aberdeen', cabezas: 200, montoTotal: 470000, fechaOp: '2024-11-14' },
      historialContactos: [
        { fecha: '2024-11-14', medio: 'email',    agente: 'Martín Pérez', resumen: 'Enviado certificado HIT. Confirmó recepción y entrega para el 28/11.' },
        { fecha: '2024-11-08', medio: 'telefono', agente: 'Martín Pérez', resumen: 'Presentación lote LV-0004. 200 novillos aptos exportación. Interesado.' },
        { fecha: '2024-09-15', medio: 'feria',    agente: 'Martín Pérez', resumen: 'Contacto en Expo Prado. Potencial comprador de novillos para exportación.' },
      ],
      fechaAlta: '2024-09-15',
      observaciones: 'Exportador de primer nivel. Requiere trazabilidad certificada y HIT obligatorio.',
      tags: ['exportador', 'volumen-alto', 'certificacion'],
    },
    {
      id: 'PROD-0007',
      nombre: 'Carlos Bentancur', estancia: 'Est. San Jorge',
      categoria: 'vendedor', tipo: 'engordador', estado: 'activo',
      telefono: '+598 94 456 789', email: 'cbentancur@gmail.com',
      departamento: 'Salto', localidad: 'Salto', hectareas: 3000,
      tiposGanado: ['Novillos'], razasPreferidas: ['Hereford x Aberdeen'],
      volumenAnualCabezas: 600, precioPromedioHistorico: 1920,
      montoTotalComercializado: 768000, totalOperaciones: 2,
      agente: 'Martín Pérez', agenteAvatar: 'MP', prioridad: 'alta',
      ultimaFechaContacto: '2024-11-10',
      ultimoMedioContacto: 'chatbot',
      proximoSeguimiento: '2024-12-01',
      motivoUltimoContacto: 'Cierre lote LC-0004 — 200 novillos entrega 20/11',
      ultimoLote: { id: 'LC-0004', tipoOp: 'venta', tipoGanado: 'Novillos', raza: 'Hereford x Aberdeen', cabezas: 200, montoTotal: 384000, fechaOp: '2024-11-10' },
      historialContactos: [
        { fecha: '2024-11-10', medio: 'chatbot',  agente: 'Martín Pérez', resumen: 'Cierre exitoso LC-0004. $1.920/cab. Entrega 20/11.' },
        { fecha: '2024-10-28', medio: 'visita',   agente: 'Martín Pérez', resumen: 'Visita a Est. San Jorge. Inspeccionó 200 novillos en condición de venta.' },
      ],
      fechaAlta: '2024-10-01',
      tags: ['engordador', 'salto', 'volumen-alto'],
    },
    {
      id: 'PROD-0008',
      nombre: 'Eduardo Suárez', estancia: 'Cabaña El Ombú',
      categoria: 'ambos', tipo: 'cabana', estado: 'activo',
      telefono: '+598 99 888 777', whatsapp: '+598 99 888 777',
      departamento: 'Paysandú', localidad: 'Paysandú', hectareas: 600,
      tiposGanado: ['Toros', 'Vaquillonas'], razasPreferidas: ['Aberdeen Angus'],
      volumenAnualCabezas: 80, precioPromedioHistorico: 4500,
      montoTotalComercializado: 360000, totalOperaciones: 3,
      agente: 'Ana Silveira', agenteAvatar: 'AS', prioridad: 'alta',
      ultimaFechaContacto: '2024-11-16',
      ultimoMedioContacto: 'whatsapp',
      proximoSeguimiento: '2024-11-30',
      motivoUltimoContacto: 'Seña recibida. Reserva toros LV-0003',
      ultimoLote: { id: 'LV-0003', tipoOp: 'compra', tipoGanado: 'Toros', raza: 'Aberdeen Angus', cabezas: 15, montoTotal: 78000, fechaOp: '2024-11-13' },
      historialContactos: [
        { fecha: '2024-11-16', medio: 'whatsapp', agente: 'Ana Silveira', resumen: 'Confirmó seña del 20% para LV-0003. Entrega en diciembre.' },
        { fecha: '2024-11-13', medio: 'chatbot',  agente: 'Ana Silveira', resumen: 'Contacto chatbot. 15 toros Aberdeen en reserva. LV-0003 generado.' },
        { fecha: '2024-10-05', medio: 'feria',    agente: 'Ana Silveira', resumen: 'Contacto en expo genética Paysandú. Mostró interés en comprar reproductores.' },
      ],
      fechaAlta: '2024-10-05',
      observaciones: 'Cabaña referente en Paysandú. Vende reproductores propios Y compra para mejoramiento de rodeos de clientes.',
      tags: ['cabana', 'angus', 'reproductores', 'ambos'],
    },
    {
      id: 'PROD-0009',
      nombre: 'Andrés Pereyra',
      categoria: 'comprador', tipo: 'productor_mixto', estado: 'potencial',
      telefono: '+598 94 333 444',
      departamento: 'Cerro Largo', localidad: 'Melo', hectareas: 900,
      tiposGanado: ['Vacas con cría', 'Terneros'], razasPreferidas: ['Criolla', 'Hereford'],
      agente: 'Diego Rodríguez', agenteAvatar: 'DR', prioridad: 'media',
      ultimaFechaContacto: '2024-11-15',
      ultimoMedioContacto: 'chatbot',
      proximoSeguimiento: '2024-11-22',
      motivoUltimoContacto: 'Primera consulta. Buscaba vacas con cría. LV-0005 generado.',
      ultimoLote: { id: 'LV-0005', tipoOp: 'compra', tipoGanado: 'Vacas con cría', raza: 'Criolla', cabezas: 45, montoTotal: 103500, fechaOp: '2024-11-15' },
      historialContactos: [
        { fecha: '2024-11-15', medio: 'chatbot', agente: 'Diego Rodríguez', resumen: 'Primera consulta. Busca 40-50 pares, hasta $2.400/par. LV-0005 generado.' },
      ],
      fechaAlta: '2024-11-15',
      tags: ['potencial', 'cerro-largo'],
    },
    {
      id: 'PROD-0010',
      nombre: 'Fernando Etcheverry', estancia: 'Est. El Ceibo',
      categoria: 'comprador', tipo: 'criador', estado: 'activo',
      telefono: '+598 99 888 111', email: 'fetcheverry@est.uy',
      departamento: 'Tacuarembó', localidad: 'Tacuarembó', hectareas: 1800,
      tiposGanado: ['Vaquillonas', 'Vacas'], razasPreferidas: ['Aberdeen Angus'],
      volumenAnualCabezas: 150,
      agente: 'Laura Gómez', agenteAvatar: 'LG', prioridad: 'media',
      ultimaFechaContacto: '2024-11-17',
      ultimoMedioContacto: 'whatsapp',
      proximoSeguimiento: '2024-11-24',
      motivoUltimoContacto: 'Coordinar revisación veterinaria vaquillonas LV-0006',
      ultimoLote: { id: 'LV-0006', tipoOp: 'compra', tipoGanado: 'Vaquillonas', raza: 'Aberdeen Angus', cabezas: 60, montoTotal: 99000, fechaOp: '2024-11-16' },
      historialContactos: [
        { fecha: '2024-11-17', medio: 'whatsapp', agente: 'Laura Gómez', resumen: 'Coordina vet. independiente para semana del 20/11. Precio aceptable.' },
        { fecha: '2024-11-16', medio: 'chatbot',  agente: 'Laura Gómez', resumen: 'Busca vaquillonas Angus puras para reposición. LV-0006 generado.' },
      ],
      fechaAlta: '2024-11-05',
      tags: ['vaquillonas', 'reposicion', 'angus'],
    },
    {
      id: 'PROD-0011',
      nombre: 'Diego Moreira', empresa: 'Cabaña Santa Elena',
      categoria: 'ambos', tipo: 'cabana', estado: 'activo',
      telefono: '+598 97 555 666',
      departamento: 'Florida', localidad: 'Florida',
      tiposGanado: ['Toros', 'Vaquillonas', 'Terneros'], razasPreferidas: ['Aberdeen Angus'],
      volumenAnualCabezas: 50, precioPromedioHistorico: 5200,
      montoTotalComercializado: 78000, totalOperaciones: 1,
      agente: 'Ana Silveira', agenteAvatar: 'AS', prioridad: 'alta',
      ultimaFechaContacto: '2024-10-10',
      ultimoMedioContacto: 'telefono',
      proximoSeguimiento: '2024-11-20',
      motivoUltimoContacto: 'Reserva toros reproductores LV-0003 pendiente seña',
      ultimoLote: { id: 'LV-0003', tipoOp: 'compra', tipoGanado: 'Toros', raza: 'Aberdeen Angus', cabezas: 15, montoTotal: 78000, fechaOp: '2024-11-13' },
      historialContactos: [
        { fecha: '2024-10-10', medio: 'telefono', agente: 'Ana Silveira', resumen: 'Llamada inicial. Interesado en reproductores para temporada 2025.' },
      ],
      fechaAlta: '2024-10-10',
      observaciones: 'Sin contactar desde hace más de 30 días. Requiere seguimiento urgente.',
      tags: ['cabana', 'reproductores', 'seguimiento-pendiente'],
    },
    {
      id: 'PROD-0012',
      nombre: 'Hugo Castellanos', estancia: 'Est. La Paloma',
      categoria: 'vendedor', tipo: 'engordador', estado: 'inactivo',
      telefono: '+598 96 222 333',
      departamento: 'Durazno', localidad: 'Durazno', hectareas: 1500,
      tiposGanado: ['Novillos'], razasPreferidas: ['Hereford'],
      volumenAnualCabezas: 400,
      agente: 'Martín Pérez', agenteAvatar: 'MP', prioridad: 'baja',
      ultimaFechaContacto: '2024-09-05',
      ultimoMedioContacto: 'telefono',
      motivoUltimoContacto: 'Llamada de prospección. No disponía hacienda para vender en ese momento.',
      historialContactos: [
        { fecha: '2024-09-05', medio: 'telefono', agente: 'Martín Pérez', resumen: 'Prospección. Tiene novillos pero los vende en diciembre. Volver a contactar en noviembre.' },
      ],
      fechaAlta: '2024-09-05',
      observaciones: 'Sin actividad desde septiembre. Potencial para diciembre.',
      tags: ['durazno', 'diciembre', 'reactivar'],
    },
  ];

  getAll(): Productor[] { return this.productores; }

  getById(id: string): Productor | undefined {
    return this.productores.find(p => p.id === id);
  }

  getStats() {
    const hoy    = new Date();
    const dias   = (p: Productor) => Math.floor((hoy.getTime() - new Date(p.ultimaFechaContacto).getTime()) / 86400000);
    const activos = this.productores.filter(p => p.estado === 'activo');
    return {
      total:       this.productores.length,
      activos:     activos.length,
      potenciales: this.productores.filter(p => p.estado === 'potencial').length,
      inactivos:   this.productores.filter(p => p.estado === 'inactivo').length,
      vendedores:  this.productores.filter(p => p.categoria === 'vendedor' || p.categoria === 'ambos').length,
      compradores: this.productores.filter(p => p.categoria === 'comprador' || p.categoria === 'ambos').length,
      sinContactarUrgente: this.productores.filter(p => dias(p) > 60).length,
      sinContactarMedio:   this.productores.filter(p => dias(p) > 30 && dias(p) <= 60).length,
      proximoSeguimiento:  this.productores.filter(p => p.proximoSeguimiento && new Date(p.proximoSeguimiento) <= new Date(hoy.getTime() + 7*86400000)).length,
    };
  }

  diasSinContactar(p: Productor): number {
    return Math.floor((new Date().getTime() - new Date(p.ultimaFechaContacto).getTime()) / 86400000);
  }

  urgenciaContacto(p: Productor): 'reciente' | 'medio' | 'urgente' {
    const d = this.diasSinContactar(p);
    if (d <= 30) return 'reciente';
    if (d <= 60) return 'medio';
    return 'urgente';
  }

  nextId(): string {
    const nums = this.productores.map(p => parseInt(p.id.replace('PROD-', '')));
    return `PROD-${String(Math.max(...nums) + 1).padStart(4, '0')}`;
  }

  add(p: Productor): void { this.productores.unshift(p); }

  registrarContacto(id: string, medio: string, resumen: string, agente: string): void {
    const p = this.productores.find(x => x.id === id);
    if (!p) return;
    const hoy = new Date().toISOString().split('T')[0];
    p.ultimaFechaContacto   = hoy;
    p.ultimoMedioContacto   = medio as any;
    p.motivoUltimoContacto  = resumen;
    p.historialContactos.unshift({ fecha: hoy, medio: medio as any, agente, resumen });
  }
}
