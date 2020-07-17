import { LStorageService } from './../../shared/services/storage/l-storage.service';
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ChatService } from './../../shared/services/chat/chat.service';
import { ChatDataService } from './../../shared/services/api/chat-data.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit {

  me: any;

  dataSource: Array<any>;
  chat: any;

  typing = '';
  isSendingMessage = false;

  private paramSubscriber: any;

  @ViewChild('lastDiv') lastDiv;

  constructor(
    private route: ActivatedRoute,
    private chatSocketEvt: ChatService,
    private chatPersistenceService: ChatDataService,
    lStorageService: LStorageService
  ) {
    this.me = lStorageService.get('user');
  }

  ngOnInit() {
    this.paramSubscriber = this.route.params.subscribe(params => {
      const nickname = params['nickname'];

      if (!nickname) {
        const channelId = params['channelId'];
        if (!channelId) {
          return this.chatPersistenceService.list().then((data) => {
            this.data = data['chatList'];
          });
        }
      }
      this.queryChat(nickname);
    });
  }

  queryChat(nickname) {

    this.chatPersistenceService.getChat(nickname).then((data) => {
      const selectedChat = data['chat'];
      this.chatPersistenceService.messagesFromChat(selectedChat).then(data => {
        const srcMessages = (data['messageList'] || []).reduce((result, m) => {
          // is it the first element of messageList?
          if (!result.firstBlock) {
            result.firstBlock = {from: m.from, messages: [m]};
            result.lastBlock = result.firstBlock;
            result.blocks = [result.firstBlock];
            return result;
          }
          // is current message from same block that first in result?
          if (result.firstBlock.from === m.from) {
            result.firstBlock.messages = [m, ...result.firstBlock.messages];
          } else {
            // add new block as first
            result.firstBlock = {from: m.from, messages: [m]};
            result.blocks = [result.firstBlock, ...result.blocks];
          }
          return result;
        }, {lastBlock: null, firstBlock: null, blocks: []});

        this.dataChat = {...selectedChat, srcMessages};
        this.joinMessages(this.chat);
      });
    });
  }

  set data(arr: Array<any>) {
    this.dataSource = arr;
    if (arr && arr.length > 0) {

      this.chatSocketEvt.joinToChatRooms(this.dataSource, this.me.id);
      this.dataSource.forEach(chat => {
        this.chatSocketEvt.onChatMessage(chat, this.joinMessages.bind(this));
      });
    }

  }

  set dataChat(chat: any) {
    this.chat = chat;
    this.chat.groupMessage = chat.participants.length > 2;
    this.chat.user = this.chat.participants.reduce((result, p) => {
      result[p.id] = p;
      return result;
    }, {});
    this.chatSocketEvt.joinToChatRooms([this.chat], this.me.id);
    this.chatSocketEvt.onChatMessage(this.chat, this.joinMessages.bind(this));
  }

  joinMessages(chat) {
    console.log("---------Before\nChatComponent -> chat.messages -> chat.messages", {chat});
    chat.messages = (chat.newMessages || []).reduce ((result, m) => {
      if (!m.isNew) {
        m.isNew = true;
      } else {
        return result;
      }
      // is result empty?
      if (!result.lastBlock) {
        result.firstBlock = {from: m.from, messages: [m]};
        result.lastBlock = result.firstBlock;
        result.blocks = [result.firstBlock];
        return result;
      }
      // is current message from same block that last in result?
      if (result.lastBlock.from === m.from) {
        result.lastBlock.messages = [...result.lastBlock.messages, m];
      } else {
        // add new block as last
        result.lastBlock = {from: m.from, messages: [m]};
        result.blocks = [...result.blocks, result.lastBlock];
      }
      return result;
    }, {...chat.srcMessages, v: chat.messages ? chat.messages.v + 1 : 1});
    console.log("ChatComponent -> chat.messages -> chat.messages", {chat});
    this.scrollBottom();

  }

  ngAfterViewInit(): void {
    this.scrollBottom();
  }

  scrollBottom() {
    setTimeout(() => {
      try {
        console.log('--------bottom', this.lastDiv.nativeElement.offsetTop);
        window.scroll({
          top: this.lastDiv.nativeElement.offsetTop,
          behavior: 'smooth'
        });
      } catch (error) {
        this.scrollBottom();
      }
    }, 300);
  }

  newMessage(message) {
    this.isSendingMessage = true;
    this.chatPersistenceService.newMessage(
      this.chat.id,
      {from: this.me.id, text: message}
    ).then(data => {
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
