import { Injectable } from '@angular/core';


const TOKEN_KEY = 'AuthToken';
const IS_ADMIN = 'Admin';

@Injectable()
export class TokenStorage {

  constructor() { }

  signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(IS_ADMIN);
    window.sessionStorage.clear();
  }

  public saveToken(token: string,isAdmin:string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,  token);
    window.sessionStorage.removeItem(IS_ADMIN);
    window.sessionStorage.setItem(IS_ADMIN,  isAdmin);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public getIsAdmin(): string {
    return sessionStorage.getItem(IS_ADMIN);
  }
}