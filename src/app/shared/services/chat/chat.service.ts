import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) {
    console.log("ChatService -> constructor -> socket", socket);
  }

  sendMessage(msg: string){
    this.socket.emit("message", msg);
  }

  getMessage() {
    return this.socket
      .fromEvent("message").toPromise()
      .then((data: any) => {
        const {msg} = data;
        return Promise.resolve(msg);
      });
  }
}
