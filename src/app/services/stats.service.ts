import { Injectable } from '@angular/core';

export interface Agente {
  id: string;
  nombre: string;
  avatar: string;
  comercializaciones: number;
  montoTotal: number;
  tasaCierre: number;
  interaccionesChatbot: number;
  sesionesChat: number;
  tiempoPromedioRespuesta: number; // minutos
  consultasPendientes: number;
  ultimaActividad: string;
}

export interface LoteStats {
  total: number;
  totalCabezas: number;
  valorTotal: number;
  cerradosEsteMes: number;
  enProceso: number;
  disponibles: number;
  promedioCabezasPorLote: number;
  variacionMensual: number; // porcentaje
}

export interface ProductorStats {
  total: number;
  activos: number;
  nuevosEsteMes: number;
  conLotesActivos: number;
  variacionMensual: number;
}

export interface ChatbotStats {
  totalConversaciones: number;
  conversacionesActivas: number;
  mensajesTotales: number;
  tiempoPromedioSesion: number; // minutos
  tasaConversionACierre: number; // porcentaje
  consultasMasFrecuentes: { tema: string; cantidad: number; porcentaje: number }[];
  actividadPorHora: { hora: string; sesiones: number }[];
  tendenciaSemanal: { dia: string; conversaciones: number; cierres: number }[];
}

@Injectable({ providedIn: 'root' })
export class StatsService {

  getAgentes(): Agente[] {
    return [
      {
        id: 'A01', nombre: 'Martín Pérez', avatar: 'MP',
        comercializaciones: 34, montoTotal: 2840000, tasaCierre: 78,
        interaccionesChatbot: 412, sesionesChat: 98, tiempoPromedioRespuesta: 3.2,
        consultasPendientes: 5, ultimaActividad: '2024-11-14',
      },
      {
        id: 'A02', nombre: 'Laura Gómez', avatar: 'LG',
        comercializaciones: 28, montoTotal: 2210000, tasaCierre: 71,
        interaccionesChatbot: 389, sesionesChat: 87, tiempoPromedioRespuesta: 4.1,
        consultasPendientes: 3, ultimaActividad: '2024-11-14',
      },
      {
        id: 'A03', nombre: 'Diego Rodríguez', avatar: 'DR',
        comercializaciones: 21, montoTotal: 1750000, tasaCierre: 65,
        interaccionesChatbot: 521, sesionesChat: 114, tiempoPromedioRespuesta: 2.8,
        consultasPendientes: 8, ultimaActividad: '2024-11-13',
      },
      {
        id: 'A04', nombre: 'Ana Silveira', avatar: 'AS',
        comercializaciones: 19, montoTotal: 1420000, tasaCierre: 60,
        interaccionesChatbot: 274, sesionesChat: 63, tiempoPromedioRespuesta: 5.5,
        consultasPendientes: 2, ultimaActividad: '2024-11-12',
      },
      {
        id: 'A05', nombre: 'Carlos Méndez', avatar: 'CM',
        comercializaciones: 15, montoTotal: 980000, tasaCierre: 55,
        interaccionesChatbot: 198, sesionesChat: 47, tiempoPromedioRespuesta: 6.2,
        consultasPendientes: 1, ultimaActividad: '2024-11-11',
      },
    ];
  }

  getLotesCompra(): LoteStats {
    return {
      total: 23,
      totalCabezas: 1840,
      valorTotal: 2180000,
      cerradosEsteMes: 8,
      enProceso: 6,
      disponibles: 9,
      promedioCabezasPorLote: 80,
      variacionMensual: 12,
    };
  }

  getLotesVenta(): LoteStats {
    return {
      total: 18,
      totalCabezas: 1320,
      valorTotal: 1740000,
      cerradosEsteMes: 5,
      enProceso: 4,
      disponibles: 9,
      promedioCabezasPorLote: 73,
      variacionMensual: -4,
    };
  }

  getProductores(): ProductorStats {
    return {
      total: 142,
      activos: 98,
      nuevosEsteMes: 11,
      conLotesActivos: 61,
      variacionMensual: 8,
    };
  }

  getChatbotStats(): ChatbotStats {
    return {
      totalConversaciones: 1794,
      conversacionesActivas: 23,
      mensajesTotales: 14230,
      tiempoPromedioSesion: 8.4,
      tasaConversionACierre: 31,
      consultasMasFrecuentes: [
        { tema: 'Precio de lotes',         cantidad: 412, porcentaje: 28 },
        { tema: 'Disponibilidad de hacienda', cantidad: 318, porcentaje: 22 },
        { tema: 'Estado de operación',     cantidad: 247, porcentaje: 17 },
        { tema: 'Datos de productor',      cantidad: 198, porcentaje: 14 },
        { tema: 'Historial de compras',    cantidad: 164, porcentaje: 11 },
        { tema: 'Otros',                   cantidad: 122, porcentaje: 8 },
      ],
      actividadPorHora: [
        { hora: '06h', sesiones: 12 }, { hora: '08h', sesiones: 38 },
        { hora: '09h', sesiones: 64 }, { hora: '10h', sesiones: 89 },
        { hora: '11h', sesiones: 102 },{ hora: '12h', sesiones: 71 },
        { hora: '13h', sesiones: 48 }, { hora: '14h', sesiones: 93 },
        { hora: '15h', sesiones: 118 },{ hora: '16h', sesiones: 97 },
        { hora: '17h', sesiones: 74 }, { hora: '18h', sesiones: 42 },
        { hora: '20h', sesiones: 19 },
      ],
      tendenciaSemanal: [
        { dia: 'Lun', conversaciones: 47, cierres: 14 },
        { dia: 'Mar', conversaciones: 62, cierres: 19 },
        { dia: 'Mié', conversaciones: 58, cierres: 18 },
        { dia: 'Jue', conversaciones: 71, cierres: 22 },
        { dia: 'Vie', conversaciones: 83, cierres: 26 },
        { dia: 'Sáb', conversaciones: 34, cierres: 10 },
        { dia: 'Dom', conversaciones: 18, cierres: 4 },
      ],
    };
  }
}
