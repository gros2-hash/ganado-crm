import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TimeoutError, timeout } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { environment } from '../../../environments/environment';

type Step = 'login' | 'register';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  step: Step = 'login';

  // ── Login ──────────────────────────────────────────────────────────────
  loginEmail    = '';
  loginPassword = '';
  showLoginPass = false;
  loginError    = '';
  loginLoading  = false;
  loginShake    = false;

  // ── Registro ───────────────────────────────────────────────────────────
  regCi       = '';
  regEmail    = '';
  regPassword = '';
  regConfirm  = '';
  showRegPass    = false;
  showRegConfirm = false;
  regLoading  = false;
  regError    = '';
  regShake    = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) {
    if (this.auth.isAuthenticated()) this.router.navigate(['/dashboard']);
  }

  // ── Login ──────────────────────────────────────────────────────────────
  onLogin(): void {
    this.loginError = '';
    if (!this.loginEmail || !this.loginPassword) {
      this.triggerShake('login', 'Ingresá email y contraseña.');
      return;
    }
    this.loginLoading = true;
    this.auth.login(this.loginEmail, this.loginPassword).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: err => {
        this.loginLoading  = false;
        this.loginPassword = '';
        this.triggerShake('login', this.parseHttpError(err, 401, 'Credenciales inválidas.'));
        this.cdr.detectChanges();
      },
    });
  }

  // ── Registro ───────────────────────────────────────────────────────────
  onRegister(): void {
    this.regError = '';
    if (!this.regCi.trim() || !this.regEmail.trim() || !this.regPassword) {
      this.triggerShake('register', 'Completá todos los campos.');
      return;
    }
    if (this.regPassword !== this.regConfirm) {
      this.triggerShake('register', 'Las contraseñas no coinciden.');
      return;
    }

    this.regLoading = true;
    this.http
      .post(`${environment.apiUrl}/api/usuarios`, {
        email:           this.regEmail,
        password:        this.regPassword,
        cedulaEmpleado:  parseInt(this.regCi, 10),
      })
      .pipe(timeout(4000))
      .subscribe({
        next: () => {
          this.regLoading = false;
          // Login automático con las credenciales recién creadas
          this.auth.login(this.regEmail, this.regPassword).subscribe({
            next: () => this.router.navigate(['/dashboard']),
            error: () => {
              this.step = 'login';
              this.loginEmail = this.regEmail;
              this.cdr.detectChanges();
            },
          });
        },
        error: err => {
          this.regLoading = false;
          this.triggerShake('register', this.parseHttpError(err, 409, 'Ya existe una cuenta con esos datos.'));
          this.cdr.detectChanges();
        },
      });
  }

  goTo(s: Step): void { this.step = s; }

  // ── Helpers ────────────────────────────────────────────────────────────
  private triggerShake(scope: 'login' | 'register', msg: string): void {
    if (scope === 'login') {
      this.loginError = msg;
      this.loginShake = true;
      setTimeout(() => (this.loginShake = false), 600);
    } else {
      this.regError = msg;
      this.regShake = true;
      setTimeout(() => (this.regShake = false), 600);
    }
  }

  private parseHttpError(err: any, specificStatus: number, specificMsg: string): string {
    if (err instanceof TimeoutError) return 'El servidor no respondió. Verificá tu conexión.';
    if (err.status === 0 || err.status === 502 || err.status === 503 || err.status === 504)
      return 'No se pudo conectar con el servidor.';
    if (err.status === 500 && !err.error) return 'No se pudo conectar con el servidor.';
    if (err.status === 500) return 'Error interno del servidor. Intentá de nuevo.';
    if (err.status === 404) return 'No se encontró un empleado con esa cédula.';
    if (specificStatus && err.status === specificStatus)
      return err.error?.detail ?? specificMsg;
    return err.error?.detail ?? 'Ocurrió un error inesperado.';
  }
}
