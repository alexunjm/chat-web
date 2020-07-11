import { Injectable } from '@angular/core';

/**
 * @author Alexander Jaramillo <contacto@alexanderjaramillo.com>
 */
@Injectable({
  providedIn: 'root'
})
export class LStorageService {

  constructor() {
    // console.log('Hello LStorageService Provider');
  }

  clear() {
    localStorage.clear();
  }

  get(key): any {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      // console.log(`retrieving key:${key}`/*, value*/);
      return value;
    } catch (error) {
      console.error(error);
    }
    return {};
  }

  set(key, val) {
    const value = JSON.stringify(val);
    // console.log(`saving key:${key} value:${value}`/*, val*/);
    localStorage.setItem(key, value);
  }

  getToken() {
    const user = this.get('user');
    if (user) {
      // console.log(`query token: ${user.token}`/*, user*/);
      return user && user.hasOwnProperty('token') ? user['token'] : null;
    }
    return null;
  }

  setLoggedIn() {
    this.set('isLoggedin', 'true');
  }

  hasRole(role) {
    try {
      const user = this.get('user');
      return user && user.hasOwnProperty('role') && user.role.toLowerCase() === role.toLowerCase();
    } catch (error) {
      return false;
    }
  }
}
