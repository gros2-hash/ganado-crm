export interface LoteVisual {
  id:              string;           // LC-0001 | LV-0001
  tipo:            'compra' | 'venta';
  descripcion:     string;
  videoLink:       string;
  videoId:         string | null;
  thumbnailUrl:    string;
  embedUrl:        string;
  tipoGanado:      string;
  raza:            string;
  cantidadCabezas: number;
  precioUnitario:  number;
  departamento:    string;
  campo:           string;
  estado:          string;
  origen:          string;
  agente:          string;
  agenteAvatar:    string;
  fechaCreacion:   string;
  contactoNombre:  string;
  contactoCelular: string;
  contactoEmpresa?: string;
  // compra-only: ficha técnica
  pesoPromedio?:      number;   // kg
  claseAnimal?:       string;   // MB | B | BMB | G
  estadoAnimal?:      string;   // MB | B | BMB | BR
  categoria?:         string;
  paraje?:            string;
  detalleUbicacion?:  string;
  precioMinKg?:       number;   // USD/kg
  precioMaxKg?:       number;   // USD/kg
  // venta-only
  destino?:        string;
  formaPago?:      string;
  loteCompraId?:   string;
  // extras
  totalFlujos:     number;
  observaciones?:  string;
}
