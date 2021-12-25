import { Component, OnInit } from '@angular/core';
import { Client} from "@stomp/stompjs";
import * as SockJs from 'sockjs-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  statusConnect: boolean = false;
  private client: Client;
  constructor() { }

  ngOnInit(): void {
    this.client = new Client();
    this.client.webSocketFactory = () => {
      return new SockJs("http://localhost:8080/chat-websocket")
    }

    this.client.onConnect = (frame) => {
      console.log('connect:' + this.client.connected + ' : ' + frame);
      this.statusConnect = true;
      console.log(' что там со статусом подключениея :' + this.statusConnect);
    }

    this.client.onDisconnect = (frame) => {
      console.log('connect:' + !this.client.connected + ' : ' + frame);
      this.statusConnect = false;
      console.log(' что там со статусом подключениея :' + this.statusConnect)
    }

  }
  connect():void {
    this.client.activate();
  }
  disconnect():void {
    this.client.deactivate();
  }
}
