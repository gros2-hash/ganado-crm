import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  loading = false;
  showPassword = false;
  shake = false;

  constructor(private auth: AuthService, private router: Router) {
    if (this.auth.isAuthenticated()) this.router.navigate(['/dashboard']);
  }

  onSubmit(): void {
    this.error = '';
    if (!this.email || !this.password) {
      this.error = 'Ingresá email y contraseña.';
      return;
    }
    this.loading = true;
    this.auth.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => {
        this.loading = false;
        this.password = '';
        this.error =
          err.status === 401
            ? (err.error?.detail ?? 'Credenciales inválidas.')
            : err.status === 0
            ? 'No se pudo conectar con el servidor.'
            : `Error ${err.status}: ${err.error?.detail ?? err.message}`;
        this.shake = true;
        setTimeout(() => (this.shake = false), 600);
      },
    });
  }
}
