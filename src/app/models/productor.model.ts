export type CategoriaProductor = 'comprador' | 'vendedor' | 'ambos';
export type EstadoProductor    = 'activo' | 'inactivo' | 'potencial' | 'perdido';
export type TipoProductor      = 'criador' | 'invernador' | 'engordador' | 'cabana' | 'frigorifico' | 'exportador' | 'productor_mixto';
export type MedioContacto      = 'telefono' | 'whatsapp' | 'email' | 'visita' | 'chatbot' | 'feria';
export type PrioridadContacto  = 'alta' | 'media' | 'baja';

export interface UltimoLote {
  id:            string;           // LC-0001 | LV-0001
  tipoOp:        'compra' | 'venta';
  tipoGanado:    string;
  raza:          string;
  cabezas:       number;
  montoTotal:    number;
  fechaOp:       string;
}

export interface RegistroContacto {
  fecha:   string;
  medio:   MedioContacto;
  agente:  string;
  resumen: string;
}

export interface Productor {
  id:            string;           // PROD-0001
  nombre:        string;
  estancia?:     string;
  empresa?:      string;           // nombre empresa / frigorífico / exportadora
  rut?:          string;           // RUT empresa o CI persona
  categoria:     CategoriaProductor;
  tipo:          TipoProductor;
  estado:        EstadoProductor;

  // Contacto
  telefono:      string;
  telefonoAlt?:  string;
  email?:        string;
  whatsapp?:     string;

  // Ubicación
  departamento:  string;
  localidad:     string;
  direccionCampo?: string;
  hectareas?:    number;

  // Perfil comercial
  tiposGanado:        string[];    // tipos que maneja habitualmente
  razasPreferidas:    string[];
  volumenAnualCabezas?: number;
  precioPromedioHistorico?: number;
  montoTotalComercializado?: number;
  totalOperaciones?:  number;

  // CRM tracking
  agente:              string;
  agenteAvatar:        string;
  prioridad:           PrioridadContacto;
  ultimaFechaContacto: string;     // ISO date
  ultimoMedioContacto: MedioContacto;
  proximoSeguimiento?: string;     // ISO date
  motivoUltimoContacto?: string;
  ultimoLote?:         UltimoLote;
  historialContactos:  RegistroContacto[];

  fechaAlta:     string;
  observaciones?: string;
  tags?:          string[];        // etiquetas libres
}
