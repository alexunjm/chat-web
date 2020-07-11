import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { LStorageService } from './../storage/l-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService {


  constructor(http: HttpClient, lStorage: LStorageService) {
    super(http, lStorage);
  }

  list() {

    return this.get('user/list', {}).then(response => {
      console.log('UserService -> list -> response', response);
      return Promise.resolve(response);
    }).catch(err => {
      console.log('AuthService -> singIn -> err', {err});
      return Promise.reject([]);
    });
  }
}
