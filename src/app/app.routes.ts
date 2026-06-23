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
    path: 'lotes-venta',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/lotes-venta/lotes-venta.component').then(
        (m) => m.LotesVentaComponent
      ),
  },
  { path: '**', redirectTo: 'dashboard' },
];
