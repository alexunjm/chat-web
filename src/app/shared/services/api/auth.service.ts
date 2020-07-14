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
  }

  singIn({nickname, pass}) {
    const user = {nickname, password: pass};
    return this.post('user/login', {user}).then(response => {
      this.lStorage.set('user', response['user']);
      return Promise.resolve(true);
    }).catch(err => {
      console.log('AuthService -> singIn -> err', {err, user});
      return Promise.reject(false);
    });
  }

  singUp({fullName, nickname, pass}) {
    const user = {fullName, nickname, password: pass};
    return this.post('user/sign-up', {user}).then(response => {
      // for auto-login
      this.lStorage.set('user', response['user']);
      return Promise.resolve(true);
    }).catch(err => {
      console.log('AuthService -> singUp -> err', {err, user});
      return Promise.reject(false);
    });
  }
}
