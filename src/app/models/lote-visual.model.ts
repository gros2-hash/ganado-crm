export interface LoteVisual {
  id:              string;           // LC-0001 | LV-0001
  tipo:            'compra' | 'venta';
  descripcion:     string;
  videoLink:       string;           // URL original
  videoId:         string | null;    // YouTube video ID extraído
  thumbnailUrl:    string;           // img.youtube.com o placeholder
  embedUrl:        string;           // URL para el iframe
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
  // venta-only
  destino?:        string;
  formaPago?:      string;
  loteCompraId?:   string;
  // extras
  totalFlujos:     number;
  observaciones?:  string;
}
