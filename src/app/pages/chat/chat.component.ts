import { LStorageService } from './../../shared/services/storage/l-storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ChatService } from './../../shared/services/chat/chat.service';
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
  isSendingMessage = false;

  private paramSubscriber: any;

  constructor(
    private route: ActivatedRoute,
    private chatEvt: ChatService,
    private chatService: ChatDataService,
    lStorageService: LStorageService
  ) {
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
        this.chatService.messagesFromChat(this.chat).then(data => {
          this.chat.messages = data['messageList'].sort((a, b) => -1);
        });
      });
    });
  }

  set data(arr: Array<any>) {
    this.dataSource = arr;
  }

  set dataChat(chat: any) {
    this.chat = {...chat, messages: [/*
      {from: 1, text: 'hola'},
      {from: this.me.id, text: 'hola'}, */
    ]};
  }

  newMessage(message) {
    this.isSendingMessage = true;
    this.chatService.newMessage(
      this.chat.id,
      {from: this.me.id, text: message}
    ).then(data => {
      console.log('ChatComponent -> newMessage -> data', data);
      this.chat.messages.push(data['message']);
      this.typing = '';
      this.isSendingMessage = false;
    }).catch(err => {
      console.log('ChatComponent -> newMessage -> err', err)
      this.typing = '';
      this.isSendingMessage = false;
    });
  }

  ngOnDestroy() {
    this.paramSubscriber.unsubscribe();
  }

}
