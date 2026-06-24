export type EstadoMatch =
  | 'nuevo'
  | 'visto_vendedor'
  | 'visto_comprador'
  | 'ambos_vistos'
  | 'en_negociacion'
  | 'cerrado'
  | 'descartado';

export interface DetalleCompatibilidad {
  tipoGanado:  number;  // 0-40
  raza:        number;  // 0-20
  precio:      number;  // 0-20
  cabezas:     number;  // 0-20
  total:       number;  // 0-100
}

export interface Match {
  id: number;
  loteVentaId: string;
  loteCompraId: string;
  tipoGanado: string;
  raza: string;
  cabezasVenta: number;
  cabezasCompra: number;
  precioVenta: number;
  precioCompra: number;
  departamento: string;
  comercialVendedor: string;
  comercialVendedorAvatar: string;
  comercialComprador: string;
  comercialCompradorAvatar: string;
  esCruzado: boolean;
  fecha: Date;
  vistoVendedor: boolean;
  vistoComprador: boolean;
  estado: EstadoMatch;
  compatibilidad: DetalleCompatibilidad;
  notas?: string;
}
