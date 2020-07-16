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
      // console.log('ChatDataService -> list -> response', response);
      return Promise.resolve(response);
    }).catch(err => {
      console.log('ChatDataService -> list -> err', {err});
      return Promise.reject([]);
    });
  }

  getChat(nickname) {

    return this.get(`chat/with/${nickname}`, {}).then(response => {
      // console.log('ChatDataService -> getChat -> response', response);
      return Promise.resolve(response);
    }).catch(err => {
      console.log('ChatDataService -> getChat -> err', {err});
      return Promise.reject([]);
    });
  }

  messagesFromChat(chat) {

    return this.get(`chat/${chat.id}/messages`, {}).then(response => {
      // console.log('ChatDataService -> messagesFromChat -> response', response);
      return Promise.resolve(response);
    }).catch(err => {
      console.log('ChatDataService -> messagesFromChat -> err', {err});
      return Promise.reject([]);
    });
  }
/*
  private create(data) {

    const {name, nicknames} = data;
    return this.get('chat/create', {name, nicknames}).then(response => {
      // console.log('ChatDataService -> create -> response', response);
      return Promise.resolve(response);
    }).catch(err => {
      console.log('ChatDataService -> create -> err', {err});
      return Promise.reject([]);
    });
  }

  chatWith(nickname) {
    return this.create({nicknames: [nickname]});
  }

  chatGroup(name, nicknames = []) {
    return this.create({name, nicknames});
  } */

  newMessage(chatId, data) {
    const message = {...data, date: Date.now()};
    return this.post(`chat/${chatId}/message`, {message}).then(response => {
      // console.log('newMessage -> response', {message, response});
      return Promise.resolve(response);
    }).catch(err => {
      console.log('newMessage -> err', err);
      return Promise.reject();
    });
    // return messageObj;
  }




  /***
   * update events
   */

  private update(data) {

    const {id, name, nicknames} = data;
    return this.post(`chat/update/${id}`, {name, nicknames}).then(response => {
      // console.log('ChatDataService -> update -> response', response);
      return Promise.resolve(response);
    }).catch(err => {
      console.log('ChatDataService -> update -> err', {err});
      return Promise.reject([]);
    });
  }

  joinToChat(chat, nickname) {
    const {id, nicknames} = chat;
    return this.update({id, nicknames: [...nicknames, nickname]});
  }
}
