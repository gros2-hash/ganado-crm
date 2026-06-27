import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, timeout } from 'rxjs';
import { environment } from '../../environments/environment';

export interface User {
  email: string;
  name: string;
  role: string;
  avatar: string;
}

interface LoginResponse {
  token: string;
  tipo: string;
  expiraEnSegundos: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'crm_token';
  private readonly USER_KEY  = 'crm_user';
  private readonly TIMEOUT_MS = 4000;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${environment.apiUrl}/api/auth/login`, { email, password })
      .pipe(timeout(this.TIMEOUT_MS), tap(res => this.storeSession(res.token)));
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUser(): User | null {
    const stored = localStorage.getItem(this.USER_KEY);
    return stored ? (JSON.parse(stored) as User) : null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    return !this.isExpired(token);
  }

  private storeSession(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(this.parseUser(token)));
  }

  private parseUser(token: string): User {
    try {
      const payload = this.decodePayload(token);
      const email   = (payload['sub'] as string) ?? '';
      const roles   = (payload['roles'] as string[]) ?? [];
      const rawRole = roles[0]?.replace('ROLE_', '') ?? 'USUARIO';
      const role    = rawRole.charAt(0) + rawRole.slice(1).toLowerCase();
      const name    = email.split('@')[0];
      const avatar  = name.substring(0, 2).toUpperCase();
      return { email, name, role, avatar };
    } catch {
      return { email: '', name: 'Usuario', role: 'Usuario', avatar: 'U' };
    }
  }

  private isExpired(token: string): boolean {
    try {
      const payload = this.decodePayload(token);
      return (payload['exp'] as number) * 1000 < Date.now();
    } catch {
      return true;
    }
  }

  // JWT usa base64url (-/_) en lugar del base64 estándar (+/); atob requiere el estándar.
  private decodePayload(token: string): Record<string, unknown> {
    const base64Url = token.split('.')[1];
    const base64    = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  }
}
