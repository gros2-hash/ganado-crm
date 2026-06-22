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
  username = '';
  password = '';
  error = '';
  loading = false;
  showPassword = false;

  constructor(private auth: AuthService, private router: Router) {
    if (this.auth.isAuthenticated()) this.router.navigate(['/dashboard']);
  }

  onSubmit(): void {
    this.error = '';
    if (!this.username || !this.password) {
      this.error = 'Ingresá usuario y contraseña.';
      return;
    }
    this.loading = true;
    setTimeout(() => {
      const ok = this.auth.login(this.username, this.password);
      this.loading = false;
      if (ok) {
        this.router.navigate(['/dashboard']);
      } else {
        this.error = 'Usuario o contraseña incorrectos.';
      }
    }, 600);
  }
}
