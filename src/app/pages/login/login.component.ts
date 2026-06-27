import { ChangeDetectorRef, Component, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TimeoutError } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

type Step = 'login' | 'reg1' | 'reg2' | 'reg3';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  // ── Vista activa ──────────────────────────────────────────────────────
  step: Step = 'login';

  // ── Login ─────────────────────────────────────────────────────────────
  loginEmail    = '';
  loginPassword = '';
  showLoginPass = false;
  loginError    = '';
  loginLoading  = false;
  loginShake    = false;

  // ── Registro paso 1 ───────────────────────────────────────────────────
  regEmail    = '';
  regCi       = '';
  regPassword = '';
  regConfirm  = '';
  showRegPass = false;
  reg1Error   = '';
  reg1Loading = false;

  // ── OTP ───────────────────────────────────────────────────────────────
  otpDigits: string[] = ['', '', '', '', '', ''];
  otpError   = '';
  otpLoading = false;
  otpResent  = false;

  // ── Perfil ────────────────────────────────────────────────────────────
  regNombre      = '';
  regApellido    = '';
  regTelefono    = '';
  regDepartamento = '';
  reg3Error      = '';
  reg3Loading    = false;

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  readonly departamentos = [
    'Artigas', 'Canelones', 'Cerro Largo', 'Colonia', 'Durazno',
    'Flores', 'Florida', 'Lavalleja', 'Maldonado', 'Montevideo',
    'Paysandú', 'Río Negro', 'Rivera', 'Rocha', 'Salto',
    'San José', 'Soriano', 'Tacuarembó', 'Treinta y Tres',
  ];

  constructor(private auth: AuthService, private router: Router, private cdr: ChangeDetectorRef) {
    if (this.auth.isAuthenticated()) this.router.navigate(['/dashboard']);
  }

  // ── Login ─────────────────────────────────────────────────────────────
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
        this.loginLoading = false;
        this.loginPassword = '';
        this.triggerShake('login', this.parseHttpError(err, 401, 'Credenciales inválidas.'));
        this.cdr.detectChanges();
      },
    });
  }

  // ── Registro paso 1 ───────────────────────────────────────────────────
  onRegInit(): void {
    this.reg1Error = '';
    if (!this.regEmail || !this.regCi || !this.regPassword || !this.regConfirm) {
      this.reg1Error = 'Completá todos los campos.'; return;
    }
    if (this.regPassword !== this.regConfirm) {
      this.reg1Error = 'Las contraseñas no coinciden.'; return;
    }
    if (this.regPassword.length < 6) {
      this.reg1Error = 'La contraseña debe tener al menos 6 caracteres.'; return;
    }
    this.reg1Loading = true;
    this.auth.registerInit(this.regEmail, this.regCi, this.regPassword).subscribe({
      next: () => { this.reg1Loading = false; this.goTo('reg2'); this.cdr.detectChanges(); },
      error: err => {
        this.reg1Loading = false;
        this.reg1Error = this.parseHttpError(err, 0, 'Error al enviar el código. Intentá de nuevo.');
        this.cdr.detectChanges();
      },
    });
  }

  // ── OTP ───────────────────────────────────────────────────────────────
  onOtpInput(index: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const val = input.value.replace(/\D/g, '').slice(-1);
    this.otpDigits[index] = val;
    input.value = val;
    if (val && index < 5) {
      const inputs = this.otpInputs.toArray();
      inputs[index + 1]?.nativeElement.focus();
    }
  }

  onOtpKeydown(index: number, event: KeyboardEvent): void {
    if (event.key === 'Backspace' && !this.otpDigits[index] && index > 0) {
      const inputs = this.otpInputs.toArray();
      this.otpDigits[index - 1] = '';
      inputs[index - 1]?.nativeElement.focus();
    }
  }

  onOtpPaste(event: ClipboardEvent): void {
    const text = event.clipboardData?.getData('text') ?? '';
    const digits = text.replace(/\D/g, '').slice(0, 6).split('');
    digits.forEach((d, i) => { if (i < 6) this.otpDigits[i] = d; });
    event.preventDefault();
    const inputs = this.otpInputs.toArray();
    const lastFilled = Math.min(digits.length, 5);
    inputs[lastFilled]?.nativeElement.focus();
  }

  onVerifyOtp(): void {
    this.otpError = '';
    const code = this.otpDigits.join('');
    if (code.length < 6) { this.otpError = 'Ingresá el código completo de 6 dígitos.'; return; }
    this.otpLoading = true;
    this.auth.registerVerify(this.regEmail, code).subscribe({
      next: () => { this.otpLoading = false; this.goTo('reg3'); this.cdr.detectChanges(); },
      error: err => {
        this.otpLoading = false;
        this.otpError = this.parseHttpError(err, 0, 'Código incorrecto. Verificá e intentá de nuevo.');
        this.cdr.detectChanges();
      },
    });
  }

  resendOtp(): void {
    this.otpResent = false;
    this.auth.registerInit(this.regEmail, this.regCi, this.regPassword).subscribe({
      next: () => { this.otpResent = true; setTimeout(() => this.otpResent = false, 4000); },
    });
  }

  // ── Perfil ────────────────────────────────────────────────────────────
  onCompleteProfile(): void {
    this.reg3Error = '';
    if (!this.regNombre || !this.regApellido || !this.regDepartamento) {
      this.reg3Error = 'Nombre, apellido y departamento son obligatorios.'; return;
    }
    this.reg3Loading = true;
    this.auth.registerComplete({
      email: this.regEmail,
      nombre: this.regNombre,
      apellido: this.regApellido,
      telefono: this.regTelefono,
      departamento: this.regDepartamento,
    }).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: err => {
        this.reg3Loading = false;
        this.reg3Error = this.parseHttpError(err, 0, 'Error al completar el registro.');
        this.cdr.detectChanges();
      },
    });
  }

  // ── Helpers ───────────────────────────────────────────────────────────
  goTo(s: Step): void { this.step = s; }

  private triggerShake(scope: 'login', msg: string): void {
    this.loginError = msg;
    this.loginShake = true;
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
