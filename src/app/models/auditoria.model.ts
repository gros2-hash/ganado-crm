export type AccionAudit = 'crear' | 'editar' | 'eliminar' | 'login' | 'logout' | 'exportar';
export type EntidadAudit = 'Productor' | 'Lote' | 'Pedido' | 'Operación' | 'Match' | 'Usuario' | 'Sistema';

export interface AuditLog {
  id: number;
  usuario: string;
  usuarioNombre: string;
  entidad: EntidadAudit;
  entidadId?: number | string;
  accion: AccionAudit;
  descripcion: string;
  valorAnterior?: string;
  valorNuevo?: string;
  fecha: Date;
  ip: string;
  dispositivo: string;
}
