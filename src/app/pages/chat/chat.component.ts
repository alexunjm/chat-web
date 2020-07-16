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
    private chatSocketEvt: ChatService,
    private chatPersistenceService: ChatDataService,
    lStorageService: LStorageService
  ) {
    this.me = lStorageService.get('user');
    // console.log("ChatComponent -> constructor -> this.me", this.me);
  }

  ngOnInit() {
    this.paramSubscriber = this.route.params.subscribe(params => {
      const nickname = params['nickname'];

      if (!nickname) {
        return this.chatPersistenceService.list().then((data) => {
          this.data = data['chats'];
        });
      }
      this.chatPersistenceService.getChat(nickname).then((data) => {
        // this.dataChat = data['chat'];
        const selectedChat = data['chat'];
        this.chatPersistenceService.messagesFromChat(selectedChat).then(data => {
          // this.dataChat = {...this.chat, srcMessages: data['messageList']};
          this.dataChat = {...selectedChat, srcMessages: data['messageList']};
          this.joinMessages(this.chat);
        });
      });
    });
  }

  set data(arr: Array<any>) {
    this.dataSource = arr;
    this.chatSocketEvt.joinToChatRooms(this.dataSource, this.me.id);
    this.dataSource.forEach(chat => {
      this.chatSocketEvt.onChatMessage(chat, this.joinMessages);
    });

  }

  set dataChat(chat: any) {
    this.chat = chat;
    this.chatSocketEvt.joinToChatRooms([this.chat], this.me.id);
    this.chatSocketEvt.onChatMessage(this.chat, this.joinMessages);
  }

  joinMessages(chat) {
    chat.messages = [...(chat.srcMessages || []).reverse(), ...(chat.newMessages || [])];
    console.log("ChatComponent -> joinMessages -> chatMessages", {chat});
  }

  newMessage(message) {
    this.isSendingMessage = true;
    this.chatPersistenceService.newMessage(
      this.chat.id,
      {from: this.me.id, text: message}
    ).then(data => {
      console.log('ChatComponent -> newMessage -> data', data);
      // this.chat.messages.push(data['message']);
      this.typing = '';
      this.isSendingMessage = false;
    }).catch(err => {
      console.log('ChatComponent -> newMessage -> err', err);
      this.typing = '';
      this.isSendingMessage = false;
    });
  }

  ngOnDestroy() {
    this.paramSubscriber.unsubscribe();
  }

}
