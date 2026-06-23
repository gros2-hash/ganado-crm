import { Injectable } from '@angular/core';
import { LoteVenta, EstadoLoteVenta, FlujoChatbotVenta } from '../models/lote-venta.model';

@Injectable({ providedIn: 'root' })
export class LotesVentaService {
  private lotes: LoteVenta[] = [
    {
      id: 'LV-0001',
      descripcion: 'Novillos gordos Hereford, excelente terminación, listos para faena inmediata. Uniformes en peso y condición corporal.',
      comprador: { nombre: 'Ricardo Noel', celular: '+598 99 321 654', empresa: 'Frigorífico Canelones S.A.', localidad: 'Canelones', tipo: 'frigorifico' },
      videoLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      tipoGanado: 'Novillos', raza: 'Hereford', cantidadCabezas: 120,
      precioUnitario: 2100, costoUnitario: 1850, pesoPromedio: 480,
      campo: 'Est. La Querencia', departamento: 'Tacuarembó',
      destino: 'faena', formaPago: 'contado',
      fechaEntrega: '2024-11-20', lugarEntrega: 'Frigorífico Canelones', departamentoEntrega: 'Canelones',
      condicionEntrega: 'frigorifico', comisionPct: 2, loteCompraId: 'LC-0001',
      estado: 'cerrado', origen: 'chatbot', agente: 'Martín Pérez', agenteAvatar: 'MP',
      fechaCreacion: '2024-11-05', fechaActualizacion: '2024-11-15',
      observaciones: 'Operación cerrada el 15/11. Entrega confirmada el 20/11 en frigorífico.',
      flujosChatbot: [
        {
          sesionId: 'SES-V001', fechaInicio: '2024-11-05 10:20', fechaFin: '2024-11-05 10:48',
          agente: 'Martín Pérez', agenteAvatar: 'MP', totalMensajes: 12, resultado: 'lote_generado',
          mensajes: [
            { id: 'm1', tipo: 'bot',     contenido: '¡Buen día! ¿Estás buscando hacienda para comprar?', timestamp: '10:20', leido: true },
            { id: 'm2', tipo: 'cliente', contenido: 'Sí, necesito novillos gordos para faena esta semana', timestamp: '10:21', leido: true },
            { id: 'm3', tipo: 'bot',     contenido: '¿Cuántas cabezas necesitás y en qué rango de precio?', timestamp: '10:21', leido: true },
            { id: 'm4', tipo: 'cliente', contenido: 'Entre 100 y 150 novillos, Hereford preferentemente, pago contado', timestamp: '10:23', leido: true },
            { id: 'm5', tipo: 'bot',     contenido: 'Tenemos un lote disponible en Tacuarembó. Acá el video del lote:', timestamp: '10:24', leido: true },
            { id: 'm6', tipo: 'bot',     contenido: '🎥 https://youtube.com/... — 120 Hereford, 480kg prom, campo natural', timestamp: '10:24', leido: true },
            { id: 'm7', tipo: 'cliente', contenido: 'Excelente hacienda. ¿Cuál es el precio?', timestamp: '10:26', leido: true },
            { id: 'm8', tipo: 'bot',     contenido: '$2.100 por cabeza puesto en frigorífico. ¿Te interesa?', timestamp: '10:27', leido: true },
            { id: 'm9', tipo: 'cliente', contenido: 'Sí, me interesa. Necesito confirmación de peso al gancho', timestamp: '10:29', leido: true },
            { id: 'm10', tipo: 'agente', contenido: 'Hola Ricardo, soy Martín. El precio es $2.100 con pesaje al gancho en Frigo Canelones. ¿Cerramos?', timestamp: '10:38', leido: true },
            { id: 'm11', tipo: 'cliente', contenido: 'Trato hecho. Mandame el contrato.', timestamp: '10:42', leido: true },
            { id: 'm12', tipo: 'sistema', contenido: '✅ LV-0001 cerrado — $252.000 — entrega 20/11 Frigo Canelones', timestamp: '10:48', leido: true },
          ]
        }
      ]
    },
    {
      id: 'LV-0002',
      descripcion: 'Terneros destetados Aberdeen Angus para invernada. Sanidad completa, todos los registros al día. Ideal para campo bueno.',
      comprador: { nombre: 'Pablo Orellano', celular: '+598 98 111 222', email: 'porellano@campo.uy', localidad: 'Soriano', empresa: 'Est. Los Médanos', tipo: 'invernada' },
      videoLink: 'https://www.youtube.com/watch?v=abc123',
      tipoGanado: 'Terneros', raza: 'Aberdeen Angus', cantidadCabezas: 85,
      precioUnitario: 1050, costoUnitario: 920, pesoPromedio: 210,
      campo: 'Est. Don Carlos', departamento: 'Rivera',
      destino: 'invernada', formaPago: 'plazo_30',
      fechaEntrega: '2024-11-25', lugarEntrega: 'Est. Los Médanos', departamentoEntrega: 'Soriano',
      condicionEntrega: 'puesto_campo', comisionPct: 2.5, loteCompraId: 'LC-0002',
      estado: 'negociacion', origen: 'chatbot', agente: 'Laura Gómez', agenteAvatar: 'LG',
      fechaCreacion: '2024-11-10', fechaActualizacion: '2024-11-14',
      observaciones: 'Comprador quiere precio con flete incluido. Consultando logística.',
      flujosChatbot: [
        {
          sesionId: 'SES-V002', fechaInicio: '2024-11-10 15:05', fechaFin: '2024-11-10 15:30',
          agente: 'Laura Gómez', agenteAvatar: 'LG', totalMensajes: 10, resultado: 'lote_generado',
          mensajes: [
            { id: 'm1', tipo: 'bot',     contenido: '¡Hola! ¿Qué tipo de hacienda estás buscando?', timestamp: '15:05', leido: true },
            { id: 'm2', tipo: 'cliente', contenido: 'Busco terneros Angus para invernada en Soriano', timestamp: '15:06', leido: true },
            { id: 'm3', tipo: 'bot',     contenido: '¿Cuántas cabezas y en qué rango de peso?', timestamp: '15:07', leido: true },
            { id: 'm4', tipo: 'cliente', contenido: 'Unos 80-100 terneros, 200-220kg aprox', timestamp: '15:09', leido: true },
            { id: 'm5', tipo: 'bot',     contenido: 'Tenemos 85 terneros Aberdeen Angus, 210kg prom, sanidad completa. Video:', timestamp: '15:10', leido: true },
            { id: 'm6', tipo: 'bot',     contenido: '🎥 https://youtube.com/abc123 — Rivera, campo natural', timestamp: '15:10', leido: true },
            { id: 'm7', tipo: 'cliente', contenido: '¿Cuánto salen y hacen plazo?', timestamp: '15:13', leido: true },
            { id: 'm8', tipo: 'bot',     contenido: '$1.050 cabeza, aceptamos plazo 30 días. ¿Entrega en campo o en corrales?', timestamp: '15:14', leido: true },
            { id: 'm9', tipo: 'agente',  contenido: 'Pablo, soy Laura. Puedo coordinar el flete incluido. ¿Hablamos mañana?', timestamp: '15:22', leido: true },
            { id: 'm10', tipo: 'sistema', contenido: '🔔 LV-0002 generado — negociando entrega con flete', timestamp: '15:30', leido: true },
          ]
        },
        {
          sesionId: 'SES-V003', fechaInicio: '2024-11-14 09:15', fechaFin: '2024-11-14 09:35',
          agente: 'Laura Gómez', agenteAvatar: 'LG', totalMensajes: 6, resultado: 'seguimiento',
          mensajes: [
            { id: 'm1', tipo: 'agente', contenido: 'Pablo, conseguí flete por $8.000. Con eso el precio final sería $1.144 por cabeza.', timestamp: '09:15', leido: true },
            { id: 'm2', tipo: 'cliente', contenido: 'Está un poco alto. ¿Podés bajar el precio base a $1.020?', timestamp: '09:18', leido: true },
            { id: 'm3', tipo: 'agente', contenido: 'A $1.020 + flete quedaría en $1.114. Lo consulto con el productor.', timestamp: '09:20', leido: true },
            { id: 'm4', tipo: 'cliente', contenido: 'Dale, esperamos respuesta hoy si se puede.', timestamp: '09:22', leido: true },
            { id: 'm5', tipo: 'agente', contenido: 'Hablo con el productor y te confirmo antes de las 18.', timestamp: '09:24', leido: true },
            { id: 'm6', tipo: 'sistema', contenido: '📝 Negociación en curso — respuesta pendiente productor', timestamp: '09:35', leido: true },
          ]
        }
      ]
    },
    {
      id: 'LV-0003',
      descripcion: 'Toros Aberdeen Angus de alto valor genético para mejoramiento de rodeo. Certificados INAC, con DEP superiores en ganancia de peso.',
      comprador: { nombre: 'Diego Moreira', celular: '+598 97 555 666', empresa: 'Cabaña Santa Elena', localidad: 'Florida', tipo: 'cabana' },
      videoLink: 'https://www.youtube.com/watch?v=pqr321',
      tipoGanado: 'Toros', raza: 'Aberdeen Angus', cantidadCabezas: 15,
      precioUnitario: 5200, costoUnitario: 4500, pesoPromedio: undefined,
      campo: 'Cabaña El Ombú', departamento: 'Paysandú',
      destino: 'reproduccion', formaPago: 'plazo_60',
      fechaEntrega: '2024-12-01', lugarEntrega: 'Cabaña Santa Elena', departamentoEntrega: 'Florida',
      condicionEntrega: 'puesto_campo', comisionPct: 3, loteCompraId: 'LC-0005',
      estado: 'reservado', origen: 'chatbot', agente: 'Ana Silveira', agenteAvatar: 'AS',
      fechaCreacion: '2024-11-13', fechaActualizacion: '2024-11-16',
      observaciones: 'Comprador solicitó seña del 20%. Coordinar entrega para diciembre.',
      flujosChatbot: [
        {
          sesionId: 'SES-V004', fechaInicio: '2024-11-13 11:30', fechaFin: '2024-11-13 11:58',
          agente: 'Ana Silveira', agenteAvatar: 'AS', totalMensajes: 11, resultado: 'lote_generado',
          mensajes: [
            { id: 'm1', tipo: 'bot',     contenido: 'Buen día, ¿en qué puedo ayudarte?', timestamp: '11:30', leido: true },
            { id: 'm2', tipo: 'cliente', contenido: 'Busco toros Aberdeen para mejorar mi rodeo en Florida', timestamp: '11:31', leido: true },
            { id: 'm3', tipo: 'bot',     contenido: '¿Cuántos toros necesitás y buscás material de cabaña o comercial?', timestamp: '11:32', leido: true },
            { id: 'm4', tipo: 'cliente', contenido: 'De cabaña, con DEP. Entre 10 y 20 animales', timestamp: '11:33', leido: true },
            { id: 'm5', tipo: 'bot',     contenido: 'Tenemos 15 toros Angus puros de Cabaña El Ombú, Paysandú. Certificados INAC. Video:', timestamp: '11:34', leido: true },
            { id: 'm6', tipo: 'bot',     contenido: '🎥 https://youtube.com/pqr321 — DEP ganancia de peso en percentil 90', timestamp: '11:35', leido: true },
            { id: 'm7', tipo: 'cliente', contenido: 'Muy buena genética. ¿Precio y forma de pago?', timestamp: '11:37', leido: true },
            { id: 'm8', tipo: 'bot',     contenido: '$5.200 por toro, aceptamos plazo 60 días. ¿Entrega en campo?', timestamp: '11:38', leido: true },
            { id: 'm9', tipo: 'agente',  contenido: 'Diego, soy Ana. Si la decisión es esta semana puedo reservar el lote con seña del 20%.', timestamp: '11:48', leido: true },
            { id: 'm10', tipo: 'cliente', contenido: 'Reservame los 15. Mañana te transfiero la seña.', timestamp: '11:52', leido: true },
            { id: 'm11', tipo: 'sistema', contenido: '🔒 LV-0003 reservado — seña 20% ($15.600) — Diego Moreira / Cabaña Santa Elena', timestamp: '11:58', leido: true },
          ]
        }
      ]
    },
    {
      id: 'LV-0004',
      descripcion: 'Novillos pesados para exportación, trazabilidad completa, sin antibióticos últimos 90 días. Aptos para mercados premium (UE/China).',
      comprador: { nombre: 'Sergio Battistessa', celular: '+598 91 777 888', email: 'sbattistessa@exportganadera.com', empresa: 'Export Ganadera del Norte', localidad: 'Montevideo', tipo: 'exportador' },
      videoLink: 'https://www.youtube.com/watch?v=exp001',
      tipoGanado: 'Novillos', raza: 'Hereford x Aberdeen', cantidadCabezas: 200,
      precioUnitario: 2350, costoUnitario: 1920, pesoPromedio: 520,
      campo: 'Est. San Jorge', departamento: 'Salto',
      destino: 'exportacion', formaPago: 'contado',
      fechaEntrega: '2024-11-28', lugarEntrega: 'Puerto Montevideo', departamentoEntrega: 'Montevideo',
      condicionEntrega: 'frigorifico', comisionPct: 1.5,
      estado: 'disponible', origen: 'manual', agente: 'Martín Pérez', agenteAvatar: 'MP',
      fechaCreacion: '2024-11-14', fechaActualizacion: '2024-11-14',
      observaciones: 'Requiere certificado HIT (Hormona-free). Gestionar con INAC antes de la entrega.',
      flujosChatbot: []
    },
    {
      id: 'LV-0005',
      descripcion: 'Vacas de refugo con cría al pie, buena condición corporal. Opción ideal para productores que quieren ampliar rodeo de cría económicamente.',
      comprador: { nombre: 'Andrés Pereyra', celular: '+598 94 333 444', localidad: 'Cerro Largo', tipo: 'productor' },
      videoLink: 'https://www.youtube.com/watch?v=xyz789',
      tipoGanado: 'Vacas con cría', raza: 'Criolla', cantidadCabezas: 45,
      precioUnitario: 2300, costoUnitario: 2100, pesoPromedio: 390,
      campo: 'Est. Las Flores', departamento: 'Flores',
      destino: 'recria', formaPago: 'plazo_30',
      condicionEntrega: 'puesto_campo', comisionPct: 2,
      estado: 'disponible', origen: 'chatbot', agente: 'Diego Rodríguez', agenteAvatar: 'DR',
      fechaCreacion: '2024-11-15', fechaActualizacion: '2024-11-15',
      flujosChatbot: [
        {
          sesionId: 'SES-V005', fechaInicio: '2024-11-15 16:40', fechaFin: '2024-11-15 17:00',
          agente: 'Diego Rodríguez', agenteAvatar: 'DR', totalMensajes: 8, resultado: 'lote_generado',
          mensajes: [
            { id: 'm1', tipo: 'bot',     contenido: 'Hola, ¿qué tipo de hacienda estás buscando?', timestamp: '16:40', leido: true },
            { id: 'm2', tipo: 'cliente', contenido: 'Vacas con cría, Criolla o cruzas, para ampliar mi rodeo en Cerro Largo', timestamp: '16:42', leido: true },
            { id: 'm3', tipo: 'bot',     contenido: '¿Cuántas cabezas y cuál es tu presupuesto?', timestamp: '16:43', leido: true },
            { id: 'm4', tipo: 'cliente', contenido: 'Unas 40-50 pares, hasta $2.400 por par', timestamp: '16:45', leido: true },
            { id: 'm5', tipo: 'bot',     contenido: 'Tenemos 45 pares Criolla en Flores, muy buena condición. Video:', timestamp: '16:46', leido: true },
            { id: 'm6', tipo: 'bot',     contenido: '🎥 https://youtube.com/xyz789 — $2.300 por par puesto en campo', timestamp: '16:46', leido: true },
            { id: 'm7', tipo: 'agente',  contenido: 'Andrés, soy Diego. Está dentro de tu presupuesto y tengo flete para Cerro Largo. ¿Te interesa?', timestamp: '16:54', leido: true },
            { id: 'm8', tipo: 'sistema', contenido: '🔔 LV-0005 generado — consulta activa Andrés Pereyra / Cerro Largo', timestamp: '17:00', leido: true },
          ]
        }
      ]
    },
    {
      id: 'LV-0006',
      descripcion: 'Terneras de reposición, Aberdeen Angus puras, excelente conformación. Para incorporar como vientres en próxima temporada.',
      comprador: { nombre: 'Fernando Etcheverry', celular: '+598 99 888 111', email: 'fetcheverry@est.uy', empresa: 'Est. El Ceibo', localidad: 'Tacuarembó', tipo: 'productor' },
      videoLink: 'https://www.youtube.com/watch?v=rep002',
      tipoGanado: 'Vaquillonas', raza: 'Aberdeen Angus', cantidadCabezas: 60,
      precioUnitario: 1650, pesoPromedio: 280,
      campo: 'Est. Don Carlos', departamento: 'Rivera',
      destino: 'reproduccion', formaPago: 'plazo_30',
      fechaEntrega: '2024-12-05', lugarEntrega: 'Est. El Ceibo', departamentoEntrega: 'Tacuarembó',
      condicionEntrega: 'puesto_campo', comisionPct: 2.5,
      estado: 'negociacion', origen: 'chatbot', agente: 'Laura Gómez', agenteAvatar: 'LG',
      fechaCreacion: '2024-11-16', fechaActualizacion: '2024-11-17',
      observaciones: 'Cliente quiere inspección veterinaria independiente antes de cerrar.',
      flujosChatbot: [
        {
          sesionId: 'SES-V006', fechaInicio: '2024-11-16 08:30', fechaFin: '2024-11-16 08:55',
          agente: 'Laura Gómez', agenteAvatar: 'LG', totalMensajes: 9, resultado: 'lote_generado',
          mensajes: [
            { id: 'm1', tipo: 'bot',     contenido: 'Buenos días, ¿en qué te puedo ayudar?', timestamp: '08:30', leido: true },
            { id: 'm2', tipo: 'cliente', contenido: 'Necesito vaquillonas Angus puras para reponer vientres', timestamp: '08:31', leido: true },
            { id: 'm3', tipo: 'bot',     contenido: '¿Cuántas cabezas y en qué rango de peso buscás?', timestamp: '08:32', leido: true },
            { id: 'm4', tipo: 'cliente', contenido: 'Unas 60, de 250-300kg, para entrar en servicio el año que viene', timestamp: '08:34', leido: true },
            { id: 'm5', tipo: 'bot',     contenido: 'Tenemos 60 vaquillonas Angus puras en Rivera, 280kg prom. Video:', timestamp: '08:35', leido: true },
            { id: 'm6', tipo: 'bot',     contenido: '🎥 https://youtube.com/rep002 — excelente conformación de vientres', timestamp: '08:35', leido: true },
            { id: 'm7', tipo: 'cliente', contenido: '¿Puedo solicitar una revisación veterinaria antes de cerrar?', timestamp: '08:38', leido: true },
            { id: 'm8', tipo: 'agente',  contenido: 'Fernando, soy Laura. Sí, coordinamos revisación para la semana que viene.', timestamp: '08:48', leido: true },
            { id: 'm9', tipo: 'sistema', contenido: '🔔 LV-0006 generado — revisación vet. pendiente — Fernando Etcheverry', timestamp: '08:55', leido: true },
          ]
        }
      ]
    },
  ];

  getAll(): LoteVenta[] { return this.lotes; }

  getById(id: string): LoteVenta | undefined {
    return this.lotes.find(l => l.id === id);
  }

  getByEstado(estado: EstadoLoteVenta): LoteVenta[] {
    return this.lotes.filter(l => l.estado === estado);
  }

  getStats() {
    const cerrados = this.lotes.filter(l => l.estado === 'cerrado');
    return {
      total:        this.lotes.length,
      disponible:   this.lotes.filter(l => l.estado === 'disponible').length,
      reservado:    this.lotes.filter(l => l.estado === 'reservado').length,
      negociacion:  this.lotes.filter(l => l.estado === 'negociacion').length,
      cerrado:      cerrados.length,
      cancelado:    this.lotes.filter(l => l.estado === 'cancelado').length,
      deChatbot:    this.lotes.filter(l => l.origen === 'chatbot').length,
      totalCabezas: this.lotes.reduce((s, l) => s + l.cantidadCabezas, 0),
      valorTotal:   this.lotes.reduce((s, l) => s + l.cantidadCabezas * l.precioUnitario, 0),
      margenTotal:  this.lotes
        .filter(l => l.costoUnitario)
        .reduce((s, l) => s + l.cantidadCabezas * (l.precioUnitario - (l.costoUnitario ?? 0)), 0),
      facturadoCerrado: cerrados.reduce((s, l) => s + l.cantidadCabezas * l.precioUnitario, 0),
    };
  }

  nextId(): string {
    const nums = this.lotes.map(l => parseInt(l.id.replace('LV-', '')));
    const next  = Math.max(...nums) + 1;
    return `LV-${String(next).padStart(4, '0')}`;
  }

  add(lote: LoteVenta): void { this.lotes.unshift(lote); }

  updateEstado(id: string, estado: EstadoLoteVenta): void {
    const l = this.lotes.find(x => x.id === id);
    if (l) { l.estado = estado; l.fechaActualizacion = new Date().toISOString().split('T')[0]; }
  }
}
