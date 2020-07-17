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

  /***
   * generic data
   */
  me: any;

  /***
   * Data
   */
  dataSource: Array<any>;

  filter: string;
  filteredData: Array<any>;

  chat: any;

  /***
   * behavior
   */
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
    this.clearData();
    this.paramSubscriber = this.route.params.subscribe(params => {

      const nickname = params['nickname'];
      if (nickname) {
        return this.queryChat(nickname);
      }

      const channelId = params['channelId'];
      if (channelId) {
        switch (channelId) {
          case 'all':
            // query all
            this.dataChat = null;
            return this.chatPersistenceService.listChannels().then((data) => {
              this.data = data['chatList'];
            });

          default:
            this.data = null;
            return this.queryGroup(channelId);
        }
      }

      return this.chatPersistenceService.list().then((data) => {
        this.data = data['chatList'];
      });
    });
  }

  clearData() {

    this.dataSource = null;

    this.filter = null;
    this.filteredData = null;

    this.chat = null;
  }

  queryGroup(channelId) {
    this.chatPersistenceService.getChannel(channelId).then(this.loadChat.bind(this));
  }

  queryChat(nickname) {
    this.chatPersistenceService.getChat(nickname).then(this.loadChat.bind(this));
  }

  loadChat(data) {
    const selectedChat = data['chat'];
    this.chatPersistenceService.messagesFromChat(selectedChat).then(data => {
      const messages = (data['messageList'] || []).reduce((result, m) => {
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

      this.dataChat = {...selectedChat, messages};
      this.joinMessages(this.chat);
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
    this.filterInput(this.filter);

  }

  filterInput(str: string) {
    console.log("filterInput -> str", str)
    this.query(str ? {name: str} : null);
  }

  query(params?: any) {
    if (!params) {
      return this.filteredData = this.dataSource;
    }

    this.filteredData = this.dataSource.filter((item) => {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          const field = item[key];

          if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
            return item;
          // } else if (Array.isArray(field) && field.length > 0) {
          //   return item;
          } else if (field === params[key]) {
            return item;
          }
        }
      }
      return null;
    });
  }

  set dataChat(chat: any) {
    this.chat = chat;
    if (!chat) {
      return;
    }
    this.chat.user = this.chat.participants.reduce((result, p) => {
      result[p.id] = p;
      return result;
    }, {});
    this.chatSocketEvt.joinToChatRooms([this.chat], this.me.id);
    this.chatSocketEvt.onChatMessage(this.chat, ((chat) => {
      this.joinMessages(chat);
    }).bind(this));
  }

  joinMessages(chat) {
    chat.messages = chat.messages || {};
    for (const m of (chat.newMessages || [])) {

      if (m.isOld) {
        continue;
      } else {
        m.isOld = true;
      }
      // is chat.messages empty?
      if (!chat.messages.lastBlock) {
        chat.messages.firstBlock = {from: m.from, messages: [m]};
        chat.messages.lastBlock = chat.messages.firstBlock;
        chat.messages.blocks = [chat.messages.firstBlock];
      }
      // is current message from same block that last in chat.messages?
      if (chat.messages.lastBlock.from === m.from) {
        chat.messages.lastBlock.messages.push(m);
      } else {
        // add new block as last
        chat.messages.lastBlock = {from: m.from, messages: [m]};
        chat.messages.blocks.push(chat.messages.lastBlock);
      }
    }
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

  newMessage(input) {

    this.isSendingMessage = true;
    this.chatPersistenceService.newMessage(
      this.chat.id,
      {from: this.me.id, text: this.typing}
    ).then(data => {
      this.typing = '';
      this.isSendingMessage = false;
      setTimeout(() => {
        input.focus();
      }, 1);
    }).catch(err => {
      console.log('ChatComponent -> newMessage -> err', err);
      this.typing = '';
      this.isSendingMessage = false;
    });
  }

  ngOnDestroy() {
    this.paramSubscriber.unsubscribe();
    this.chatSocketEvt.unsubscribe();
  }

}
