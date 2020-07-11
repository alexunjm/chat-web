import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) {
    console.log('ChatService -> constructor -> socket', socket);
  }

  newConversation(user: any){
    this.socket.emit('newConversationWith', user);
  }

  onNewConversation(cbFn: (data: {room: string, user: any}) => void) {
    this.socket
    .on('newConversation', cbFn);
  }
}
