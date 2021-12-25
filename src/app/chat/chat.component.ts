import { Component, OnInit } from '@angular/core';
import { Client} from "@stomp/stompjs";
import * as SockJs from 'sockjs-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  private client: Client;
  constructor() { }

  ngOnInit(): void {
    this.client = new Client();
    this.client.webSocketFactory = () => {
      return new SockJs("http://localhost:8080/chat")
    }

    this.client.onConnect = (frame) => {
      console.log('connect:' + this.client.connected + ' : ' + frame)
    }

    this.client.activate();
  }

}
