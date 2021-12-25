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
  }

}
