import { LStorageService } from './../../shared/services/storage/l-storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ChatDataService } from './../../shared/services/api/chat-data.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit, OnDestroy {

  me: any;

  dataSource: Array<any>;
  chat: any;
  typing = '';

  private paramSubscriber: any;

  constructor(private route: ActivatedRoute, private chatService: ChatDataService, private lStorageService: LStorageService) {
    this.me = lStorageService.get('user');
    // console.log("ChatComponent -> constructor -> this.me", this.me);
  }

  ngOnInit() {
    this.paramSubscriber = this.route.params.subscribe(params => {
      const nickname = params['nickname'];

      if (!nickname) {
        return this.chatService.list().then((data) => {
          this.data = data['chats'];
        });
      }
      this.chatService.getChat(nickname).then((data) => {
        this.dataChat = data['chat'];
      });
    });
  }

  set data(arr: Array<any>) {
    this.dataSource = arr;
  }

  set dataChat(arr: Array<any>) {
    this.chat = {...arr, messages: [
      {from: 1, text: 'hola'},
      {from: 1, text: 'hola'},
      {from: this.me.id, text: 'hola'},
      {from: 1, text: 'hola'},
      {from: 1, text: 'hola'},
      {from: this.me.id, text: 'hola'},
      {from: 1, text: 'hola'},
      {from: 1, text: 'hola'},
    ]};
  }

  newMessage(message) {
    this.chat.messages.push({from: this.me.id, text: message});
    this.typing = '';
  }

  ngOnDestroy() {
    this.paramSubscriber.unsubscribe();
  }

}
