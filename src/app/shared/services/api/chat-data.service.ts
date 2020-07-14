import { LStorageService } from '../storage/l-storage.service';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatDataService extends ApiService {


  constructor(http: HttpClient, lStorage: LStorageService) {
    super(http, lStorage);
  }

  list() {

    return this.get('chat/list', {}).then(response => {
      console.log('ChatDataService -> list -> response', response);
      return Promise.resolve(response);
    }).catch(err => {
      console.log('ChatDataService -> list -> err', {err});
      return Promise.reject([]);
    });
  }
}
