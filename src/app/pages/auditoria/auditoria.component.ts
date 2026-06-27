import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { UserMenuComponent } from '../../components/user-menu/user-menu.component';
import { AuditoriaService } from '../../services/auditoria.service';
import { AuditLog, AccionAudit, EntidadAudit } from '../../models/auditoria.model';

@Component({
  selector: 'app-auditoria',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SidebarComponent, UserMenuComponent],
  templateUrl: './auditoria.component.html',
  styleUrl: './auditoria.component.scss',
})
export class AuditoriaComponent implements OnInit {
  sidebarOpen = true;

  logs: AuditLog[] = [];
  filtrados: AuditLog[] = [];

  filtroUsuario  = 'todos';
  filtroEntidad  = 'todos';
  filtroAccion   = 'todos';
  filtroFechaDesde = '';
  filtroFechaHasta = '';
  busqueda = '';

  usuarios: { username: string; nombre: string }[] = [];
  stats: ReturnType<AuditoriaService['getStats']> | null = null;

  readonly entidades: EntidadAudit[] = ['Productor', 'Lote', 'Pedido', 'Operación', 'Match', 'Usuario', 'Sistema'];
  readonly acciones: { valor: AccionAudit; label: string }[] = [
    { valor: 'crear',    label: 'Crear'    },
    { valor: 'editar',   label: 'Editar'   },
    { valor: 'eliminar', label: 'Eliminar' },
    { valor: 'login',    label: 'Login'    },
    { valor: 'logout',   label: 'Logout'   },
    { valor: 'exportar', label: 'Exportar' },
  ];

  constructor(
    public auth: AuthService,
    private auditoriaService: AuditoriaService
  ) {}

  ngOnInit(): void {
    this.logs     = this.auditoriaService.getLogs();
    this.usuarios = this.auditoriaService.getUsuarios();
    this.stats    = this.auditoriaService.getStats();
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    let resultado = [...this.logs];

    if (this.filtroUsuario !== 'todos') {
      resultado = resultado.filter(l => l.usuario === this.filtroUsuario);
    }
    if (this.filtroEntidad !== 'todos') {
      resultado = resultado.filter(l => l.entidad === this.filtroEntidad);
    }
    if (this.filtroAccion !== 'todos') {
      resultado = resultado.filter(l => l.accion === this.filtroAccion);
    }
    if (this.filtroFechaDesde) {
      const desde = new Date(this.filtroFechaDesde);
      resultado = resultado.filter(l => l.fecha >= desde);
    }
    if (this.filtroFechaHasta) {
      const hasta = new Date(this.filtroFechaHasta);
      hasta.setHours(23, 59, 59, 999);
      resultado = resultado.filter(l => l.fecha <= hasta);
    }
    if (this.busqueda.trim()) {
      const q = this.busqueda.toLowerCase();
      resultado = resultado.filter(l =>
        l.usuarioNombre.toLowerCase().includes(q) ||
        l.descripcion.toLowerCase().includes(q) ||
        l.entidad.toLowerCase().includes(q)
      );
    }

    this.filtrados = resultado;
  }

  limpiarFiltros(): void {
    this.filtroUsuario   = 'todos';
    this.filtroEntidad   = 'todos';
    this.filtroAccion    = 'todos';
    this.filtroFechaDesde = '';
    this.filtroFechaHasta = '';
    this.busqueda        = '';
    this.aplicarFiltros();
  }

  iconAccion(accion: AccionAudit): string {
    const icons: Record<AccionAudit, string> = {
      crear: '➕', editar: '✏️', eliminar: '🗑️',
      login: '🔑', logout: '🚪', exportar: '📤',
    };
    return icons[accion];
  }

  badgeClass(accion: AccionAudit): string {
    const map: Record<AccionAudit, string> = {
      crear: 'badge-crear', editar: 'badge-editar', eliminar: 'badge-eliminar',
      login: 'badge-login', logout: 'badge-logout', exportar: 'badge-exportar',
    };
    return map[accion];
  }

  logout(): void {
    this.auth.logout();
  }
}
