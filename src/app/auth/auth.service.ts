import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  username: string;
  name: string;
  role: string;
  avatar: string;
}

const DEMO_USER = {
  username: 'admin',
  password: 'ganado2024',
  name: 'Administrador',
  role: 'Gerente General',
  avatar: 'AG',
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser: User | null = null;

  constructor(private router: Router) {
    const stored = sessionStorage.getItem('crm_user');
    if (stored) this.currentUser = JSON.parse(stored);
  }

  login(username: string, password: string): boolean {
    if (username === DEMO_USER.username && password === DEMO_USER.password) {
      this.currentUser = {
        username: DEMO_USER.username,
        name: DEMO_USER.name,
        role: DEMO_USER.role,
        avatar: DEMO_USER.avatar,
      };
      sessionStorage.setItem('crm_user', JSON.stringify(this.currentUser));
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser = null;
    sessionStorage.removeItem('crm_user');
    this.router.navigate(['/login']);
  }

  getUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }
}
