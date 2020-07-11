import { LStorageService } from './../storage/l-storage.service';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends ApiService {


  constructor(http: HttpClient, lStorage: LStorageService) {
    super(http, lStorage);
  }
}
