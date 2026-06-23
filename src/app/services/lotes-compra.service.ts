import { Injectable } from '@angular/core';
import { LoteCompra, EstadoLote } from '../models/lote-compra.model';

@Injectable({ providedIn: 'root' })
export class LotesCompraService {
  private lotes: LoteCompra[] = [
    {
      id: 'LC-0001',
      descripcion: 'Lote de novillos gordos listos para faena, excelente estado corporal, campo natural',
      cliente: { nombre: 'Juan Fernández', celular: '+598 99 123 456', email: 'jfernandez@campo.uy', localidad: 'Tacuarembó' },
      videoLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      tipoGanado: 'Novillos', raza: 'Hereford', cantidadCabezas: 120,
      precioUnitario: 1850, pesoPromedio: 480, campo: 'Est. La Querencia', departamento: 'Tacuarembó',
      estado: 'negociacion', origen: 'chatbot', agente: 'Martín Pérez', agenteAvatar: 'MP',
      fechaCreacion: '2024-11-02', fechaActualizacion: '2024-11-10',
      observaciones: 'Cliente muy interesado, solicitó visita al campo el 15/11',
      flujosChatbot: [
        {
          sesionId: 'SES-001', fechaInicio: '2024-11-02 09:14', fechaFin: '2024-11-02 09:38',
          agente: 'Martín Pérez', agenteAvatar: 'MP', totalMensajes: 14, resultado: 'lote_generado',
          mensajes: [
            { id: 'm1', tipo: 'bot',     contenido: '¡Hola! Soy el asistente de GanadoCRM. ¿En qué puedo ayudarte hoy?', timestamp: '09:14', leido: true },
            { id: 'm2', tipo: 'cliente', contenido: 'Quiero vender unos novillos que tengo en Tacuarembó', timestamp: '09:15', leido: true },
            { id: 'm3', tipo: 'bot',     contenido: '¡Perfecto! ¿Cuántas cabezas tenés y de qué tipo son?', timestamp: '09:15', leido: true },
            { id: 'm4', tipo: 'cliente', contenido: 'Son 120 novillos Hereford, gordos para faena, peso promedio 480kg', timestamp: '09:17', leido: true },
            { id: 'm5', tipo: 'bot',     contenido: '¿Tenés algún video o foto del lote que puedas compartir?', timestamp: '09:17', leido: true },
            { id: 'm6', tipo: 'cliente', contenido: 'Sí, acá te mando el video: https://youtube.com/...', timestamp: '09:19', leido: true },
            { id: 'm7', tipo: 'bot',     contenido: 'Video recibido ✅ ¿Cuál sería el precio por cabeza que estás buscando?', timestamp: '09:19', leido: true },
            { id: 'm8', tipo: 'cliente', contenido: 'Estoy pensando en $1.850 por cabeza, son Hereford puros', timestamp: '09:21', leido: true },
            { id: 'm9', tipo: 'bot',     contenido: 'Entendido. Te conecto con Martín Pérez, nuestro comercial de la zona norte, para coordinar.', timestamp: '09:22', leido: true },
            { id: 'm10', tipo: 'agente', contenido: 'Hola Juan, soy Martín. Vi tu lote, me interesa mucho. ¿Podemos coordinar una visita?', timestamp: '09:28', leido: true },
            { id: 'm11', tipo: 'cliente', contenido: 'Claro, el 15 o 16 de noviembre me viene bien', timestamp: '09:30', leido: true },
            { id: 'm12', tipo: 'agente', contenido: 'Perfecto, el 15 a las 10am. Te mando los datos por WhatsApp.', timestamp: '09:32', leido: true },
            { id: 'm13', tipo: 'sistema', contenido: '🔔 Lote LC-0001 creado automáticamente por el sistema', timestamp: '09:33', leido: true },
            { id: 'm14', tipo: 'sistema', contenido: '📋 Visita coordinada: 15/11/2024 10:00 — Est. La Querencia, Tacuarembó', timestamp: '09:33', leido: true },
          ]
        },
        {
          sesionId: 'SES-002', fechaInicio: '2024-11-10 14:05', fechaFin: '2024-11-10 14:22',
          agente: 'Martín Pérez', agenteAvatar: 'MP', totalMensajes: 6, resultado: 'seguimiento',
          mensajes: [
            { id: 'm1', tipo: 'agente', contenido: 'Juan, ¿cómo estás? Confirmo la visita para mañana a las 10.', timestamp: '14:05', leido: true },
            { id: 'm2', tipo: 'cliente', contenido: 'Perfecto Martín, te espero. Acordate que el acceso es por la ruta 5.', timestamp: '14:08', leido: true },
            { id: 'm3', tipo: 'agente', contenido: 'Anotado. ¿El precio de $1.850 sigue en pie?', timestamp: '14:09', leido: true },
            { id: 'm4', tipo: 'cliente', contenido: 'Sí, aunque si cerramos más de 100 cabezas podría hacer algún descuento.', timestamp: '14:12', leido: true },
            { id: 'm5', tipo: 'agente', contenido: 'Hablamos mañana en persona. Hasta mañana!', timestamp: '14:15', leido: true },
            { id: 'm6', tipo: 'sistema', contenido: '📝 Estado actualizado: nuevo → negociacion', timestamp: '14:22', leido: true },
          ]
        }
      ]
    },
    {
      id: 'LC-0002',
      descripcion: 'Terneros destetados, muy uniformes, con todos los registros sanitarios al día',
      cliente: { nombre: 'Roberto Silva', celular: '+598 98 765 432', email: 'rsilva@estancia.com', localidad: 'Rivera' },
      videoLink: 'https://www.youtube.com/watch?v=abc123',
      tipoGanado: 'Terneros', raza: 'Aberdeen Angus', cantidadCabezas: 85,
      precioUnitario: 920, pesoPromedio: 210, campo: 'Est. Don Carlos', departamento: 'Rivera',
      estado: 'contactado', origen: 'chatbot', agente: 'Laura Gómez', agenteAvatar: 'LG',
      fechaCreacion: '2024-11-08', fechaActualizacion: '2024-11-09',
      observaciones: 'Terneros Aberdeen de calidad, cliente regular del mercado',
      flujosChatbot: [
        {
          sesionId: 'SES-003', fechaInicio: '2024-11-08 11:30', fechaFin: '2024-11-08 11:55',
          agente: 'Laura Gómez', agenteAvatar: 'LG', totalMensajes: 10, resultado: 'lote_generado',
          mensajes: [
            { id: 'm1', tipo: 'bot',     contenido: '¡Buen día! ¿Qué tipo de hacienda querés comercializar?', timestamp: '11:30', leido: true },
            { id: 'm2', tipo: 'cliente', contenido: 'Tengo 85 terneros Aberdeen Angus para vender', timestamp: '11:31', leido: true },
            { id: 'm3', tipo: 'bot',     contenido: '¿Cuál es el peso promedio y tienen sanidad al día?', timestamp: '11:32', leido: true },
            { id: 'm4', tipo: 'cliente', contenido: 'Sí, todos vacunados. Peso promedio 210kg', timestamp: '11:34', leido: true },
            { id: 'm5', tipo: 'bot',     contenido: '¿Podés compartir un video del lote para evaluar calidad?', timestamp: '11:34', leido: true },
            { id: 'm6', tipo: 'cliente', contenido: 'Claro, acá va: https://youtube.com/abc123', timestamp: '11:37', leido: true },
            { id: 'm7', tipo: 'bot',     contenido: 'Excelente material. ¿Qué precio estás manejando?', timestamp: '11:37', leido: true },
            { id: 'm8', tipo: 'cliente', contenido: '$920 por cabeza', timestamp: '11:39', leido: true },
            { id: 'm9', tipo: 'agente',  contenido: 'Hola Roberto! Soy Laura, tu comercial asignada. Hablamos hoy a la tarde?', timestamp: '11:48', leido: true },
            { id: 'm10', tipo: 'sistema', contenido: '🔔 Lote LC-0002 creado — agente asignada: Laura Gómez', timestamp: '11:55', leido: true },
          ]
        }
      ]
    },
    {
      id: 'LC-0003',
      descripcion: 'Vacas con cría, excelente condición corporal, campo mejorado con lotus y trébol',
      cliente: { nombre: 'María Pérez', celular: '+598 91 234 567', localidad: 'Flores' },
      videoLink: 'https://www.youtube.com/watch?v=xyz789',
      tipoGanado: 'Vacas con cría', raza: 'Criolla', cantidadCabezas: 45,
      precioUnitario: 2100, pesoPromedio: 390, campo: 'Est. Las Flores', departamento: 'Flores',
      estado: 'nuevo', origen: 'manual', agente: 'Diego Rodríguez', agenteAvatar: 'DR',
      fechaCreacion: '2024-11-12', fechaActualizacion: '2024-11-12',
      flujosChatbot: []
    },
    {
      id: 'LC-0004',
      descripcion: 'Novillos de recría, uniformes, buen marco óseo, listo para engordar',
      cliente: { nombre: 'Carlos Bentancur', celular: '+598 94 456 789', email: 'cbentancur@gmail.com', localidad: 'Salto' },
      videoLink: 'https://www.youtube.com/watch?v=lmn456',
      tipoGanado: 'Novillos', raza: 'Hereford x Aberdeen', cantidadCabezas: 200,
      precioUnitario: 1920, pesoPromedio: 350, campo: 'Est. San Jorge', departamento: 'Salto',
      estado: 'cerrado', origen: 'chatbot', agente: 'Martín Pérez', agenteAvatar: 'MP',
      fechaCreacion: '2024-11-01', fechaActualizacion: '2024-11-10',
      observaciones: 'Operación cerrada el 10/11. Entrega coordinada para el 20/11.',
      flujosChatbot: [
        {
          sesionId: 'SES-004', fechaInicio: '2024-11-01 08:55', fechaFin: '2024-11-01 09:20',
          agente: 'Martín Pérez', agenteAvatar: 'MP', totalMensajes: 8, resultado: 'lote_generado',
          mensajes: [
            { id: 'm1', tipo: 'bot',     contenido: '¡Buenos días! ¿En qué puedo ayudarte?', timestamp: '08:55', leido: true },
            { id: 'm2', tipo: 'cliente', contenido: 'Quiero cotizar 200 novillos Hereford x Angus en Salto', timestamp: '08:57', leido: true },
            { id: 'm3', tipo: 'bot',     contenido: '¿Tenés video del lote disponible?', timestamp: '08:58', leido: true },
            { id: 'm4', tipo: 'cliente', contenido: 'Sí: https://youtube.com/lmn456 — son todos 350kg aprox', timestamp: '09:01', leido: true },
            { id: 'm5', tipo: 'bot',     contenido: 'Muy buena hacienda. ¿Cuál es tu precio objetivo?', timestamp: '09:02', leido: true },
            { id: 'm6', tipo: 'cliente', contenido: '$1.920 la cabeza, negociable por volumen', timestamp: '09:04', leido: true },
            { id: 'm7', tipo: 'agente',  contenido: 'Carlos, soy Martín. Este lote nos interesa mucho. ¿Hablamos hoy?', timestamp: '09:15', leido: true },
            { id: 'm8', tipo: 'sistema', contenido: '✅ Operación cerrada — LC-0004 — $384.000 total', timestamp: '09:20', leido: true },
          ]
        }
      ]
    },
    {
      id: 'LC-0005',
      descripcion: 'Toros reproductores de alto valor genético, certificados por INAC',
      cliente: { nombre: 'Eduardo Suárez', celular: '+598 99 888 777', localidad: 'Paysandú' },
      videoLink: 'https://www.youtube.com/watch?v=pqr321',
      tipoGanado: 'Toros', raza: 'Aberdeen Angus', cantidadCabezas: 15,
      precioUnitario: 4500, campo: 'Cabaña El Ombú', departamento: 'Paysandú',
      estado: 'negociacion', origen: 'chatbot', agente: 'Ana Silveira', agenteAvatar: 'AS',
      fechaCreacion: '2024-11-12', fechaActualizacion: '2024-11-13',
      flujosChatbot: [
        {
          sesionId: 'SES-005', fechaInicio: '2024-11-12 16:20', fechaFin: '2024-11-12 16:45',
          agente: 'Ana Silveira', agenteAvatar: 'AS', totalMensajes: 9, resultado: 'lote_generado',
          mensajes: [
            { id: 'm1', tipo: 'bot',     contenido: '¡Hola! ¿En qué te puedo ayudar?', timestamp: '16:20', leido: true },
            { id: 'm2', tipo: 'cliente', contenido: 'Tengo toros Aberdeen Angus puros para vender, son de cabaña', timestamp: '16:21', leido: true },
            { id: 'm3', tipo: 'bot',     contenido: '¡Interesante! ¿Cuántos toros y tienen certificado genético?', timestamp: '16:22', leido: true },
            { id: 'm4', tipo: 'cliente', contenido: 'Son 15 toros, todos certificados por INAC, con DEP disponible', timestamp: '16:24', leido: true },
            { id: 'm5', tipo: 'bot',     contenido: '¿Podés compartir video y cuál es el precio?', timestamp: '16:25', leido: true },
            { id: 'm6', tipo: 'cliente', contenido: 'Video: https://youtube.com/pqr321 — precio $4.500 c/u', timestamp: '16:28', leido: true },
            { id: 'm7', tipo: 'bot',     contenido: 'Excelente material genético. Te asigno a Ana Silveira, especialista en reproductores.', timestamp: '16:29', leido: true },
            { id: 'm8', tipo: 'agente',  contenido: 'Eduardo, soy Ana. Vi los toros, son de calidad. ¿Cuándo podemos hablar?', timestamp: '16:38', leido: true },
            { id: 'm9', tipo: 'sistema', contenido: '🔔 Lote LC-0005 creado — especialista asignada: Ana Silveira', timestamp: '16:45', leido: true },
          ]
        }
      ]
    },
  ];

  getAll(): LoteCompra[] { return this.lotes; }

  getById(id: string): LoteCompra | undefined {
    return this.lotes.find(l => l.id === id);
  }

  getByEstado(estado: EstadoLote): LoteCompra[] {
    return this.lotes.filter(l => l.estado === estado);
  }

  getStats() {
    return {
      total:        this.lotes.length,
      nuevo:        this.lotes.filter(l => l.estado === 'nuevo').length,
      contactado:   this.lotes.filter(l => l.estado === 'contactado').length,
      negociacion:  this.lotes.filter(l => l.estado === 'negociacion').length,
      cerrado:      this.lotes.filter(l => l.estado === 'cerrado').length,
      cancelado:    this.lotes.filter(l => l.estado === 'cancelado').length,
      deChatbot:    this.lotes.filter(l => l.origen === 'chatbot').length,
      totalCabezas: this.lotes.reduce((s, l) => s + l.cantidadCabezas, 0),
      valorTotal:   this.lotes.reduce((s, l) => s + l.cantidadCabezas * l.precioUnitario, 0),
    };
  }

  nextId(): string {
    const nums = this.lotes.map(l => parseInt(l.id.replace('LC-', '')));
    const next = Math.max(...nums) + 1;
    return `LC-${String(next).padStart(4, '0')}`;
  }

  add(lote: LoteCompra): void { this.lotes.unshift(lote); }

  updateEstado(id: string, estado: EstadoLote): void {
    const l = this.lotes.find(x => x.id === id);
    if (l) { l.estado = estado; l.fechaActualizacion = new Date().toISOString().split('T')[0]; }
  }
}
