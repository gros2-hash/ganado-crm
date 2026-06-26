import { Injectable } from '@angular/core';
import { AuditLog, AccionAudit, EntidadAudit } from '../models/auditoria.model';

const MOCK_LOGS: AuditLog[] = [
  { id: 1,  usuario: 'admin',    usuarioNombre: 'Administrador',   entidad: 'Productor', entidadId: 12, accion: 'editar',   descripcion: 'Modificó razón social',       valorAnterior: 'El Ombú SA',          valorNuevo: 'El Ombú & Cía SA',   fecha: new Date('2026-06-24T09:15:00'), ip: '192.168.1.10', dispositivo: 'Chrome / Windows' },
  { id: 2,  usuario: 'cmercado', usuarioNombre: 'Carlos Mercado',  entidad: 'Lote',      entidadId: 45, accion: 'crear',    descripcion: 'Creó nuevo lote de venta',    valorAnterior: undefined,             valorNuevo: '120 novillos – $4.200/kg', fecha: new Date('2026-06-24T09:02:00'), ip: '192.168.1.22', dispositivo: 'Chrome / Windows' },
  { id: 3,  usuario: 'admin',    usuarioNombre: 'Administrador',   entidad: 'Sistema',                accion: 'login',    descripcion: 'Inicio de sesión',            valorAnterior: undefined,             valorNuevo: undefined,            fecha: new Date('2026-06-24T08:58:00'), ip: '192.168.1.10', dispositivo: 'Chrome / Windows' },
  { id: 4,  usuario: 'lruiz',    usuarioNombre: 'Laura Ruiz',      entidad: 'Pedido',    entidadId: 7,  accion: 'editar',   descripcion: 'Actualizó kg máximo',         valorAnterior: '15.000 kg',           valorNuevo: '20.000 kg',          fecha: new Date('2026-06-23T17:44:00'), ip: '10.0.0.5',     dispositivo: 'Safari / macOS'  },
  { id: 5,  usuario: 'cmercado', usuarioNombre: 'Carlos Mercado',  entidad: 'Productor', entidadId: 3,  accion: 'editar',   descripcion: 'Cambió estado de productor',  valorAnterior: 'potencial',           valorNuevo: 'activo',             fecha: new Date('2026-06-23T16:30:00'), ip: '192.168.1.22', dispositivo: 'Chrome / Windows' },
  { id: 6,  usuario: 'lruiz',    usuarioNombre: 'Laura Ruiz',      entidad: 'Lote',      entidadId: 38, accion: 'eliminar', descripcion: 'Eliminó lote de compra',      valorAnterior: '80 vaquillonas',      valorNuevo: undefined,            fecha: new Date('2026-06-23T15:10:00'), ip: '10.0.0.5',     dispositivo: 'Safari / macOS'  },
  { id: 7,  usuario: 'admin',    usuarioNombre: 'Administrador',   entidad: 'Productor', entidadId: 20, accion: 'crear',    descripcion: 'Registró nuevo productor',    valorAnterior: undefined,             valorNuevo: 'Estancia Don Pedro',  fecha: new Date('2026-06-23T11:22:00'), ip: '192.168.1.10', dispositivo: 'Chrome / Windows' },
  { id: 8,  usuario: 'cmercado', usuarioNombre: 'Carlos Mercado',  entidad: 'Operación', entidadId: 2,  accion: 'crear',    descripcion: 'Registró operación cerrada',  valorAnterior: undefined,             valorNuevo: '$12.400.000',        fecha: new Date('2026-06-22T14:05:00'), ip: '192.168.1.22', dispositivo: 'Chrome / Windows' },
  { id: 9,  usuario: 'lruiz',    usuarioNombre: 'Laura Ruiz',      entidad: 'Sistema',                accion: 'exportar', descripcion: 'Exportó listado de lotes',    valorAnterior: undefined,             valorNuevo: 'lotes-venta.xlsx',   fecha: new Date('2026-06-22T10:48:00'), ip: '10.0.0.5',     dispositivo: 'Safari / macOS'  },
  { id: 10, usuario: 'admin',    usuarioNombre: 'Administrador',   entidad: 'Usuario',   entidadId: 3,  accion: 'editar',   descripcion: 'Modificó rol de usuario',     valorAnterior: 'Comercial',           valorNuevo: 'Supervisor',         fecha: new Date('2026-06-21T09:00:00'), ip: '192.168.1.10', dispositivo: 'Chrome / Windows' },
  { id: 11, usuario: 'cmercado', usuarioNombre: 'Carlos Mercado',  entidad: 'Productor', entidadId: 8,  accion: 'editar',   descripcion: 'Actualizó teléfono',          valorAnterior: '099 111 222',         valorNuevo: '099 333 444',        fecha: new Date('2026-06-20T16:20:00'), ip: '192.168.1.22', dispositivo: 'Chrome / Windows' },
  { id: 12, usuario: 'lruiz',    usuarioNombre: 'Laura Ruiz',      entidad: 'Sistema',                accion: 'login',    descripcion: 'Inicio de sesión',            valorAnterior: undefined,             valorNuevo: undefined,            fecha: new Date('2026-06-20T08:05:00'), ip: '10.0.0.5',     dispositivo: 'Safari / macOS'  },
];

let nextId = MOCK_LOGS.length + 1;

@Injectable({ providedIn: 'root' })
export class AuditoriaService {
  private logs: AuditLog[] = [...MOCK_LOGS];

  registrar(
    usuario: string,
    usuarioNombre: string,
    entidad: EntidadAudit,
    accion: AccionAudit,
    descripcion: string,
    opciones?: { entidadId?: number | string; valorAnterior?: string; valorNuevo?: string }
  ): void {
    this.logs.unshift({
      id: nextId++,
      usuario,
      usuarioNombre,
      entidad,
      accion,
      descripcion,
      entidadId: opciones?.entidadId,
      valorAnterior: opciones?.valorAnterior,
      valorNuevo: opciones?.valorNuevo,
      fecha: new Date(),
      ip: '192.168.1.1',
      dispositivo: 'Chrome / Windows',
    });
  }

  getLogs(): AuditLog[] {
    return [...this.logs].sort((a, b) => b.fecha.getTime() - a.fecha.getTime());
  }

  getUsuarios(): { username: string; nombre: string }[] {
    const seen = new Set<string>();
    return this.logs
      .filter(l => { if (seen.has(l.usuario)) return false; seen.add(l.usuario); return true; })
      .map(l => ({ username: l.usuario, nombre: l.usuarioNombre }));
  }

  getStats() {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const logsHoy = this.logs.filter(l => l.fecha >= hoy);
    return {
      total: this.logs.length,
      hoy: logsHoy.length,
      creaciones: this.logs.filter(l => l.accion === 'crear').length,
      ediciones:  this.logs.filter(l => l.accion === 'editar').length,
      eliminaciones: this.logs.filter(l => l.accion === 'eliminar').length,
    };
  }
}
