import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token'
const USER_KEY = 'auth-user'

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  signOut(): void {
    window.sessionStorage.clear();
  }

  guardarToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  obtenerToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY)
  }

  guardarUsuario(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  obtenerUsuario(): any {
    let response: string | null = sessionStorage.getItem(USER_KEY);
    return response ? JSON.parse(response) : null;
  }
}
