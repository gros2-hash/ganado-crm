export type EstadoLoteVenta  = 'disponible' | 'reservado' | 'negociacion' | 'cerrado' | 'cancelado';
export type DestinoGanado    = 'faena' | 'recria' | 'invernada' | 'exportacion' | 'reproduccion';
export type FormaPago         = 'contado' | 'plazo_30' | 'plazo_60' | 'financiado';
export type OrigenVenta       = 'chatbot' | 'manual';
export type TipoComprador     = 'frigorifico' | 'exportador' | 'invernada' | 'productor' | 'cabana';
export type CondicionEntrega  = 'puesto_campo' | 'en_corrales' | 'frigorifico';
export type TipoMensajeVenta  = 'bot' | 'cliente' | 'agente' | 'sistema';

export interface MensajeChatbotVenta {
  id:        string;
  tipo:      TipoMensajeVenta;
  contenido: string;
  timestamp: string;
  leido:     boolean;
}

export interface FlujoChatbotVenta {
  sesionId:      string;
  fechaInicio:   string;
  fechaFin:      string;
  agente:        string;
  agenteAvatar:  string;
  totalMensajes: number;
  resultado:     'lote_generado' | 'seguimiento' | 'sin_resultado';
  mensajes:      MensajeChatbotVenta[];
}

export interface Comprador {
  nombre:     string;
  celular:    string;
  email?:     string;
  localidad?: string;
  empresa?:   string;
  tipo:       TipoComprador;
}

export interface LoteVenta {
  id:             string;            // LV-0001
  descripcion:    string;
  comprador:      Comprador;
  videoLink:      string;

  // Hacienda (mismos que compra)
  tipoGanado:      string;
  raza:            string;
  cantidadCabezas: number;
  precioUnitario:  number;           // precio de venta
  costoUnitario?:  number;           // precio de compra (margen)
  pesoPromedio?:   number;           // kg
  campo:           string;           // campo de origen
  departamento:    string;

  // Logística de venta — exclusivos de venta
  destino:              DestinoGanado;
  formaPago:            FormaPago;
  fechaEntrega?:        string;
  lugarEntrega?:        string;
  departamentoEntrega?: string;
  condicionEntrega?:    CondicionEntrega;
  comisionPct?:         number;      // % comisión agente
  loteCompraId?:        string;      // referencia LC-XXXX de origen

  // Gestión
  estado:              EstadoLoteVenta;
  origen:              OrigenVenta;
  agente:              string;
  agenteAvatar:        string;
  fechaCreacion:       string;
  fechaActualizacion:  string;
  observaciones?:      string;

  // Chatbot
  flujosChatbot: FlujoChatbotVenta[];
}
