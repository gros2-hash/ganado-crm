import { Injectable } from '@angular/core';

export interface LoteOferta {
  id: string;
  tipoGanado: string;
  raza: string;
  cabezas: number;
  pesoPromedio: number;
  precioUnitario: number;
  departamento: string;
  campo: string;
  descripcion: string;
  detalles: string;
  comercial: string;
  comercialAvatar: string;
  estado: string;
  videoUrl: string;
  fecha: string;
  destino: string;
  sanidad: string[];
  origen: 'chatbot' | 'manual';
}

export interface LoteDemanda {
  id: string;
  tipoGanado: string;
  raza: string;
  cabezas: number;
  pesoMin?: number;
  pesoMax?: number;
  presupuesto: number;
  departamento: string;
  descripcion: string;
  comercial: string;
  comercialAvatar: string;
  estado: string;
  urgencia: 'baja' | 'media' | 'alta';
  fecha: string;
  destino: string;
  origen: 'chatbot' | 'manual';
}

const OFERTAS: LoteOferta[] = [
  {
    id: 'LV-0001',
    tipoGanado: 'Novillos', raza: 'Hereford',
    cabezas: 120, pesoPromedio: 480, precioUnitario: 2100,
    departamento: 'Tacuarembó', campo: 'Est. La Querencia',
    descripcion: 'Novillos gordos Hereford, excelente terminación, listos para faena inmediata.',
    detalles: '120 animales uniformes en peso y condición corporal. Vacunados fiebre aftosa y brucelosis. Certificados INAC. Disponibles para entrega inmediata en frigorífico o campo. El lote fue visto en persona por 3 compradores. Precio negociable para cantidad completa.',
    comercial: 'Martín Pérez', comercialAvatar: 'MP',
    estado: 'disponible', fecha: '2024-11-05',
    destino: 'Faena', sanidad: ['Fiebre aftosa', 'Brucelosis', 'INAC'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    origen: 'chatbot',
  },
  {
    id: 'LV-0002',
    tipoGanado: 'Terneros', raza: 'Aberdeen Angus',
    cabezas: 85, pesoPromedio: 210, precioUnitario: 1050,
    departamento: 'Rivera', campo: 'Est. Don Carlos',
    descripcion: 'Terneros destetados Aberdeen Angus para invernada. Sanidad completa, registros al día.',
    detalles: 'Excelente lote de terneros destetados a los 7 meses. Todos los animales con carnet sanitario individual. Ideal para campo bueno de invernada en Soriano o Colonia. Campo natural + siembra de raigrás. Flete coordinado a cargo del comprador o incluido con descuento.',
    comercial: 'Laura Gómez', comercialAvatar: 'LG',
    estado: 'negociacion', fecha: '2024-11-10',
    destino: 'Invernada', sanidad: ['Vacuna aftosa', 'Desparasitación', 'Vitaminas A+D'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    origen: 'chatbot',
  },
  {
    id: 'LV-0003',
    tipoGanado: 'Toros', raza: 'Aberdeen Angus',
    cabezas: 15, pesoPromedio: 720, precioUnitario: 5200,
    departamento: 'Paysandú', campo: 'Cabaña El Ombú',
    descripcion: 'Toros de alto valor genético para mejoramiento de rodeo. Certificados INAC con DEP superiores.',
    detalles: 'Material de cabaña con DEP ganancia de peso en percentil 90. Aptos para cualquier tipo de rodeo comercial. Certif. INAC. Con toda la genealogía documentada. Entrega en campo o puesto en establecimiento. Consultar planes de pago en cuotas. Cabaña El Ombú tiene 30 años de trayectoria en mejoramiento genético.',
    comercial: 'Ana Silveira', comercialAvatar: 'AS',
    estado: 'reservado', fecha: '2024-11-13',
    destino: 'Reproducción', sanidad: ['INAC', 'Brucelosis', 'Tuberculosis', 'Andrológico'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    origen: 'chatbot',
  },
  {
    id: 'LV-0004',
    tipoGanado: 'Novillos', raza: 'Hereford x Aberdeen',
    cabezas: 200, pesoPromedio: 420, precioUnitario: 2350,
    departamento: 'Salto', campo: 'Est. Los Sauces',
    descripcion: 'Gran lote de novillos cruzas Hereford x Aberdeen, excelentes para exportación. Campo mejorado con praderas.',
    detalles: '200 novillos uniformes en peso y condición. Criados en campo mejorado con praderas artificiales. Excelente rendimiento en frigorífico. Habilitados para exportación a la UE. El lote puede dividirse en sublotes de 50 animales mínimo. Precio por volumen: -3% en lote completo.',
    comercial: 'Martín Pérez', comercialAvatar: 'MP',
    estado: 'disponible', fecha: '2024-11-14',
    destino: 'Exportación / Faena', sanidad: ['Traceabilidad UE', 'Fiebre aftosa', 'INAC', 'Brucelosis'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    origen: 'manual',
  },
  {
    id: 'LV-0005',
    tipoGanado: 'Vacas con cría', raza: 'Criolla',
    cabezas: 30, pesoPromedio: 390, precioUnitario: 2300,
    departamento: 'Flores', campo: 'Est. Santa Rosa',
    descripcion: 'Vacas con cría al pie, rodeo Criollo puro. Excelente aptitud materna y adaptación al campo natural.',
    detalles: '30 vacas preñadas con ternero al pie. Rodeo Criollo con más de 10 años de selección interna. Excelente aptitud materna. Parición espontánea sin asistencia. Ideal para quienes buscan rusticidad y adaptación. El precio incluye la cría. Sin destetar. Posibilidad de visita al campo previo acuerdo.',
    comercial: 'Diego Rodríguez', comercialAvatar: 'DR',
    estado: 'disponible', fecha: '2024-11-15',
    destino: 'Cría / Mejoramiento', sanidad: ['Aftosa', 'Carbunclo', 'Mancha'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    origen: 'manual',
  },
  {
    id: 'LV-0006',
    tipoGanado: 'Corderos', raza: 'Corriedale',
    cabezas: 180, pesoPromedio: 28, precioUnitario: 350,
    departamento: 'Lavalleja', campo: 'Est. La Perdiz',
    descripcion: 'Corderos Corriedale para faena, excelente estado de carnes. Ideal para exportación de carne ovina.',
    detalles: 'Corderos con terminación en campo natural de Lavalleja. Excelente cobertura de lana y condición corporal. Listos para exportación directa. Sanidad completa. Habilitados INAC para mercado europeo. El lote ya tiene interesados; primera oferta tiene prioridad.',
    comercial: 'Sofía Brum', comercialAvatar: 'SB',
    estado: 'disponible', fecha: '2024-11-16',
    destino: 'Faena ovina', sanidad: ['INAC', 'Aftosa ovina', 'Mange'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    origen: 'manual',
  },
];

const DEMANDAS: LoteDemanda[] = [
  {
    id: 'LC-0001',
    tipoGanado: 'Novillos', raza: 'Hereford',
    cabezas: 120, pesoMin: 450, pesoMax: 510,
    presupuesto: 1850, departamento: 'Tacuarembó',
    descripcion: 'Busco novillos gordos Hereford para faena esta semana. Pago contado, entrega en frigorífico.',
    comercial: 'Martín Pérez', comercialAvatar: 'MP',
    estado: 'negociacion', urgencia: 'alta',
    fecha: '2024-11-02', destino: 'Faena inmediata',
    origen: 'chatbot',
  },
  {
    id: 'LC-0002',
    tipoGanado: 'Terneros', raza: 'Aberdeen Angus',
    cabezas: 85, pesoMin: 190, pesoMax: 230,
    presupuesto: 920, departamento: 'Rivera',
    descripcion: 'Terneros Angus para invernada. Sanidad completa requerida. Plazo 30 días.',
    comercial: 'Laura Gómez', comercialAvatar: 'LG',
    estado: 'contactado', urgencia: 'media',
    fecha: '2024-11-10', destino: 'Invernada',
    origen: 'chatbot',
  },
  {
    id: 'LC-0003',
    tipoGanado: 'Vacas con cría', raza: 'Criolla',
    cabezas: 45, presupuesto: 2100, departamento: 'Flores',
    descripcion: 'Se buscan vacas con cría Criolla para reposición de vientre. Campo natural disponible.',
    comercial: 'Diego Rodríguez', comercialAvatar: 'DR',
    estado: 'nuevo', urgencia: 'baja',
    fecha: '2024-11-12', destino: 'Cría',
    origen: 'manual',
  },
  {
    id: 'LC-0004',
    tipoGanado: 'Novillos', raza: 'Hereford x Aberdeen',
    cabezas: 200, pesoMin: 400, pesoMax: 480,
    presupuesto: 1920, departamento: 'Salto',
    descripcion: 'Lote grande de novillos para exportación. Necesito trazabilidad UE certificada.',
    comercial: 'Martín Pérez', comercialAvatar: 'MP',
    estado: 'nuevo', urgencia: 'media',
    fecha: '2024-11-14', destino: 'Exportación',
    origen: 'manual',
  },
  {
    id: 'LC-0005',
    tipoGanado: 'Toros', raza: 'Aberdeen Angus',
    cabezas: 15, pesoMin: 680, presupuesto: 4500,
    departamento: 'Paysandú',
    descripcion: 'Cabaña busca toros Aberdeen de alta genética (DEP ganancia de peso). Plazo 60 días.',
    comercial: 'Ana Silveira', comercialAvatar: 'AS',
    estado: 'negociacion', urgencia: 'alta',
    fecha: '2024-11-13', destino: 'Reproducción',
    origen: 'chatbot',
  },
  {
    id: 'LC-0006',
    tipoGanado: 'Ovejas', raza: 'Merino',
    cabezas: 250, presupuesto: 280, departamento: 'Durazno',
    descripcion: 'Se buscan ovejas Merino para esquila y cría. Zona Durazno. Buen precio al contado.',
    comercial: 'Laura Gómez', comercialAvatar: 'LG',
    estado: 'nuevo', urgencia: 'baja',
    fecha: '2024-11-16', destino: 'Lana y cría',
    origen: 'manual',
  },
  {
    id: 'LC-0007',
    tipoGanado: 'Vaquillonas', raza: 'Hereford',
    cabezas: 60, pesoMin: 330, pesoMax: 380,
    presupuesto: 1650, departamento: 'Cerro Largo',
    descripcion: 'Vaquillonas Hereford para reposición. Preferimos con servicio dado o preñadas.',
    comercial: 'Diego Rodríguez', comercialAvatar: 'DR',
    estado: 'contactado', urgencia: 'media',
    fecha: '2024-11-08', destino: 'Reposición de vientre',
    origen: 'chatbot',
  },
  {
    id: 'LC-0008',
    tipoGanado: 'Novillos', raza: 'Polled Hereford',
    cabezas: 70, pesoMin: 460, presupuesto: 2000,
    departamento: 'Rocha',
    descripcion: 'Novillos pesados Polled Hereford para faena. Pago contado. Entrega en corrales Treinta y Tres.',
    comercial: 'Ana Silveira', comercialAvatar: 'AS',
    estado: 'nuevo', urgencia: 'alta',
    fecha: '2024-11-17', destino: 'Faena',
    origen: 'manual',
  },
];

@Injectable({ providedIn: 'root' })
export class LotesMarketplaceService {
  getOfertas(): LoteOferta[] { return [...OFERTAS]; }
  getDemandas(): LoteDemanda[] { return [...DEMANDAS]; }

  estadoLabelVenta(estado: string): string {
    const map: Record<string, string> = {
      disponible: 'Disponible', reservado: 'Reservado',
      negociacion: 'En negociación', cerrado: 'Cerrado', cancelado: 'Cancelado',
    };
    return map[estado] ?? estado;
  }

  estadoLabelCompra(estado: string): string {
    const map: Record<string, string> = {
      nuevo: 'Buscando', contactado: 'Contactado',
      negociacion: 'Negociando', cerrado: 'Cerrado',
    };
    return map[estado] ?? estado;
  }
}
