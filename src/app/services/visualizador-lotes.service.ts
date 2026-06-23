import { Injectable } from '@angular/core';
import { LoteVisual } from '../models/lote-visual.model';
import { LotesCompraService } from './lotes-compra.service';
import { LotesVentaService } from './lotes-venta.service';

@Injectable({ providedIn: 'root' })
export class VisualizadorLotesService {

  constructor(
    private compraSvc: LotesCompraService,
    private ventaSvc:  LotesVentaService
  ) {}

  private extractYoutubeId(url: string): string | null {
    if (!url) return null;
    const patterns = [
      /[?&]v=([a-zA-Z0-9_-]{11})/,
      /youtu\.be\/([a-zA-Z0-9_-]{11})/,
      /embed\/([a-zA-Z0-9_-]{11})/,
    ];
    for (const p of patterns) {
      const m = url.match(p);
      if (m) return m[1];
    }
    return null;
  }

  private thumbnailUrl(videoId: string | null): string {
    return videoId
      ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      : 'https://placehold.co/480x270/1a4731/ffffff?text=Sin+Video';
  }

  private embedUrl(videoId: string | null): string {
    return videoId
      ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
      : '';
  }

  private mapLabel(key: string, map: Record<string, string>): string {
    return map[key] ?? key;
  }

  private estadoCompraLabel(e: string) {
    return this.mapLabel(e, {
      nuevo: 'Nuevo', contactado: 'Contactado', negociacion: 'Negociación',
      cerrado: 'Cerrado', cancelado: 'Cancelado',
    });
  }

  private estadoVentaLabel(e: string) {
    return this.mapLabel(e, {
      disponible: 'Disponible', reservado: 'Reservado', negociacion: 'Negociación',
      cerrado: 'Cerrado', cancelado: 'Cancelado',
    });
  }

  private destinoLabel(d: string) {
    return this.mapLabel(d, {
      faena: 'Faena', recria: 'Recría', invernada: 'Invernada',
      exportacion: 'Exportación', reproduccion: 'Reproducción',
    });
  }

  private formaPagoLabel(f: string) {
    return this.mapLabel(f, {
      contado: 'Contado', plazo_30: 'Plazo 30d', plazo_60: 'Plazo 60d', financiado: 'Financiado',
    });
  }

  getAll(): LoteVisual[] {
    const compras: LoteVisual[] = this.compraSvc.getAll().map(l => {
      const vid = this.extractYoutubeId(l.videoLink);
      return {
        id: l.id,
        tipo: 'compra',
        descripcion: l.descripcion,
        videoLink: l.videoLink,
        videoId: vid,
        thumbnailUrl: this.thumbnailUrl(vid),
        embedUrl: this.embedUrl(vid),
        tipoGanado: l.tipoGanado,
        raza: l.raza,
        cantidadCabezas: l.cantidadCabezas,
        precioUnitario: l.precioUnitario,
        departamento: l.departamento,
        campo: l.campo,
        estado: this.estadoCompraLabel(l.estado),
        origen: l.origen,
        agente: l.agente,
        agenteAvatar: l.agenteAvatar,
        fechaCreacion: l.fechaCreacion,
        contactoNombre: l.cliente.nombre,
        contactoCelular: l.cliente.celular,
        totalFlujos: l.flujosChatbot.length,
        observaciones: l.observaciones,
      };
    });

    const ventas: LoteVisual[] = this.ventaSvc.getAll().map(l => {
      const vid = this.extractYoutubeId(l.videoLink);
      return {
        id: l.id,
        tipo: 'venta',
        descripcion: l.descripcion,
        videoLink: l.videoLink,
        videoId: vid,
        thumbnailUrl: this.thumbnailUrl(vid),
        embedUrl: this.embedUrl(vid),
        tipoGanado: l.tipoGanado,
        raza: l.raza,
        cantidadCabezas: l.cantidadCabezas,
        precioUnitario: l.precioUnitario,
        departamento: l.departamento,
        campo: l.campo,
        estado: this.estadoVentaLabel(l.estado),
        origen: l.origen,
        agente: l.agente,
        agenteAvatar: l.agenteAvatar,
        fechaCreacion: l.fechaCreacion,
        contactoNombre: l.comprador.nombre,
        contactoCelular: l.comprador.celular,
        contactoEmpresa: l.comprador.empresa,
        destino: this.destinoLabel(l.destino),
        formaPago: this.formaPagoLabel(l.formaPago),
        loteCompraId: l.loteCompraId,
        totalFlujos: l.flujosChatbot.length,
        observaciones: l.observaciones,
      };
    });

    return [...compras, ...ventas].sort(
      (a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime()
    );
  }

  tiposGanado():   string[] { return [...new Set(this.getAll().map(l => l.tipoGanado))].sort(); }
  razas():         string[] { return [...new Set(this.getAll().map(l => l.raza))].sort(); }
  departamentos(): string[] { return [...new Set(this.getAll().map(l => l.departamento))].sort(); }
  estados():       string[] { return [...new Set(this.getAll().map(l => l.estado))].sort(); }
}
