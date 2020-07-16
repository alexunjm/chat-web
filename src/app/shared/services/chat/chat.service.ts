import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) {
    console.log('ChatService -> constructor -> socket', socket);
  }

  joinToChatRooms(chats, userId){
    console.log("ChatService -> joinToChatRooms -> chats, userId", chats, userId)
    this.socket.emit('joinToRoom', {rooms: chats.map(c => c.id), userId});
  }

  onSomeUserConnected(cbFn: (data: {user: string}) => void) {
    this.socket.on('USER_CONNECTED', cbFn);
  }

  onChatMessage(chat: any, cbFn: (messages: Array<any>) => void) {
    this.socket.on('NEW_MESSAGE', data => {
      console.log('onChatMessage -> message', data['message']);
      // if (message.chat === chat.id) {
      chat.newMessages = [...(chat.newMessages || []), data['message']];
      cbFn(chat);
      // }
    });
  }
}
