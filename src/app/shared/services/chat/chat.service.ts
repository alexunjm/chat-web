import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) { }

  joinToChatRooms(chats, userId){
    this.socket.emit('joinToRoom', {rooms: chats.map(c => c.id), userId});
  }

  onSomeUserConnected(cbFn: (data: {user: string}) => void) {
    this.socket.on('USER_CONNECTED', cbFn);
  }

  onChatMessage(chat: any, cbFn: (messages: Array<any>) => void) {
    this.socket.on('NEW_MESSAGE', data => {
      // if (message.chat === chat.id) {
      chat.newMessages = chat.newMessages || [];
      chat.newMessages.push(data['message']);
      cbFn(chat);
      // }
    });
  }
}
