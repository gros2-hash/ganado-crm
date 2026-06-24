import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'estadisticas',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/estadisticas/estadisticas.component').then(
        (m) => m.EstadisticasComponent
      ),
  },
  {
    path: 'lotes-compra',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/lotes-compra/lotes-compra.component').then(
        (m) => m.LotesCompraComponent
      ),
  },
  {
    path: 'lotes-venta',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/lotes-venta/lotes-venta.component').then(
        (m) => m.LotesVentaComponent
      ),
  },
  {
    path: 'productores',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/productores/productores.component').then(
        (m) => m.ProductoresComponent
      ),
  },
  {
    path: 'visualizador',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/visualizador-lotes/visualizador-lotes.component').then(
        (m) => m.VisualizadorLotesComponent
      ),
  },
  {
    path: 'comerciales',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/comerciales/comerciales.component').then(
        (m) => m.ComercialComponent
      ),
  },
  { path: '**', redirectTo: 'dashboard' },
];
