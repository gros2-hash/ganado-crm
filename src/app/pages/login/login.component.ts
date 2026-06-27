import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TimeoutError } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginEmail    = '';
  loginPassword = '';
  showLoginPass = false;
  loginError    = '';
  loginLoading  = false;
  loginShake    = false;

  constructor(private auth: AuthService, private router: Router, private cdr: ChangeDetectorRef) {
    if (this.auth.isAuthenticated()) this.router.navigate(['/dashboard']);
  }

  onLogin(): void {
    this.loginError = '';
    if (!this.loginEmail || !this.loginPassword) {
      this.triggerShake('Ingresá email y contraseña.');
      return;
    }
    this.loginLoading = true;
    this.auth.login(this.loginEmail, this.loginPassword).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: err => {
        this.loginLoading = false;
        this.loginPassword = '';
        this.triggerShake(this.parseHttpError(err, 401, 'Credenciales inválidas.'));
        this.cdr.detectChanges();
      },
    });
  }

  private triggerShake(msg: string): void {
    this.loginError   = msg;
    this.loginShake   = true;
    setTimeout(() => (this.loginShake = false), 600);
  }

  private parseHttpError(err: any, specificStatus: number, specificMsg: string): string {
    if (err instanceof TimeoutError) return 'El servidor no respondió. Verificá tu conexión.';
    if (err.status === 0 || err.status === 502 || err.status === 503 || err.status === 504)
      return 'No se pudo conectar con el servidor.';
    if (err.status === 500 && !err.error) return 'No se pudo conectar con el servidor.';
    if (err.status === 500) return 'Error interno del servidor. Intentá de nuevo.';
    if (specificStatus && err.status === specificStatus)
      return err.error?.detail ?? specificMsg;
    return err.error?.detail ?? 'Ocurrió un error inesperado.';
  }
}
