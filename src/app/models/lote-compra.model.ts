export type EstadoLote = 'nuevo' | 'contactado' | 'negociacion' | 'cerrado' | 'cancelado';
export type OrigenLote = 'chatbot' | 'manual';
export type TipoMensaje = 'bot' | 'cliente' | 'agente' | 'sistema';

export interface MensajeChatbot {
  id: string;
  tipo: TipoMensaje;
  contenido: string;
  timestamp: string;
  leido: boolean;
}

export interface FlujoChatbot {
  sesionId: string;
  fechaInicio: string;
  fechaFin: string;
  agente: string;
  agenteAvatar: string;
  totalMensajes: number;
  resultado: 'lote_generado' | 'seguimiento' | 'sin_resultado';
  mensajes: MensajeChatbot[];
}

export interface LoteCompra {
  id: string;                  // LC-0001
  descripcion: string;
  cliente: {
    nombre: string;
    celular: string;
    email?: string;
    localidad?: string;
  };
  videoLink: string;
  // Datos de hacienda
  tipoGanado: string;
  raza: string;
  cantidadCabezas: number;
  precioUnitario: number;
  pesoPromedio?: number;       // kg
  campo: string;
  departamento: string;
  // Gestión
  estado: EstadoLote;
  origen: OrigenLote;
  agente: string;
  agenteAvatar: string;
  fechaCreacion: string;
  fechaActualizacion: string;
  observaciones?: string;
  // Chatbot
  flujosChatbot: FlujoChatbot[];
}
