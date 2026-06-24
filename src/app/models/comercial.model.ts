export type RolComercial  = 'gerente' | 'supervisor' | 'comercial';
export type ZonaComercial = 'Norte' | 'Sur' | 'Este' | 'Oeste' | 'Centro';

export interface Comercial {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  zona: ZonaComercial;
  rol: RolComercial;
  activo: boolean;
  avatar: string;
}

export interface MatchLote {
  loteCompraId: string;
  loteVentaId: string;
  tipoGanado: string;
  raza: string;
  cabezasCompra: number;
  cabezasVenta: number;
  comercialCompra: string;
  comercialVenta: string;
  esCruzado: boolean;
}

export interface ComercialStats {
  minutosChatbot: number;
  sesiones: number;
  lotesCompraChatbot: number;
  lotesVentaChatbot: number;
  totalLotesCompra: number;
  totalLotesVenta: number;
  matches: MatchLote[];
}
