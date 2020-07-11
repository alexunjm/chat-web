import { LStorageService } from '../storage/l-storage.service';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {


  constructor(http: HttpClient, lStorage: LStorageService) {
    super(http, lStorage);
    this.setAPIuri('http://localhost:3000');
  }

  singIn({email, pass}) {
    const user = {email, password: pass};
    return this.post('users/login', {user}).then(response => {
      this.lStorage.set('user', response['user']);
      return Promise.resolve(true);
    }).catch(err => {
      console.log('AuthService -> singIn -> err', {err, user});
      return Promise.reject(false);
    });
  }

  singUp({name, email, pass}) {
    const user = {username: name, email, password: pass};
    return this.post('users', {user}).then(response => {
      // for auto-login
      this.lStorage.set('user', response['user']);
      return Promise.resolve(true);
    }).catch(err => {
      console.log('AuthService -> singUp -> err', {err, user});
      return Promise.reject(false);
    });
  }
}
