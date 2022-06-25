import { Injectable } from '@angular/core';

const TOKEN_KEY = 'access-token';
const USER_KEY = 'user';
const USER_ROLE_KEY = 'role';

@Injectable()
export class TokenService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  saveUserName(username: string) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, username);
  }

  getUserName(): string | null {
    return window.sessionStorage.getItem(USER_KEY);
  }

  saveUserRole(role: string[]) {
    window.sessionStorage.removeItem(USER_ROLE_KEY);
    window.sessionStorage.setItem(USER_ROLE_KEY, JSON.stringify(role));
  }

  getUserRole(): object {
    return JSON.parse(window.sessionStorage.getItem(USER_ROLE_KEY)!);
  }


  getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
}
