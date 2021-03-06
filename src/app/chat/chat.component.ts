import {Component, OnInit} from '@angular/core';
import {Client} from "@stomp/stompjs";
import * as SockJs from 'sockjs-client';
import {Message} from "./model/message";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {


  statusConnect: boolean = false;
  private client: Client;
  message: Message = new Message;
  messages: Message[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.client = new Client();
    this.client.webSocketFactory = () => {
      return new SockJs("http://localhost:8080/chat-websocket")
    }

    this.client.onConnect = (frame) => {
      console.log('connect:' + this.client.connected + ' : ' + frame);
      this.statusConnect = true;
      console.log(' что там со статусом подключениея :' + this.statusConnect);
      this.client.subscribe('/chat/message', data => {
        let message: Message = JSON.parse(data.body) as Message;
        console.log('полученный обьект' + message);
        this.messages = this.messages.filter( data => {
          return data.id !== message.id&&!data.isRemove;
        })
        if(!message.isRemove){
          this.messages.push(message);
        }
        console.log(message);
      });
    }

    this.client.onDisconnect = (frame) => {
      console.log('connect:' + !this.client.connected + ' : ' + frame);
      this.statusConnect = false;
      console.log(' что там со статусом подключениея :' + this.statusConnect)
    }

  }

  connect(): void {
    this.client.activate();
  }

  disconnect(): void {
    this.client.deactivate();
  }

  sendMessage():void {
    this.client.publish({destination: '/chat/message',body: JSON.stringify(this.message)});
    this.message.text = '';
    this.message.id = '';
  }

  edit(msg: Message) {
    let copyMessage = {...msg};
    this.message.id = msg.id;
    this.message.text = msg.text;
  }
  delete(msg: Message) {
    console.log(this.messages);
    this.messages.forEach( data => {
      if(data.id===msg.id) {
        data.isRemove=true;
        this.client.publish({destination: '/chat/message',body: JSON.stringify(data)});
      }
    })
    console.log(this.messages);
  }
}
