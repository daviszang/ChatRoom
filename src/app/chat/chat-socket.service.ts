import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { ChatMessage } from "./chat-message";
import { Event } from "./event";

import * as socketIo from "socket.io-client";

const SERVER_URL = "http://localhost:3000";

@Injectable({
  providedIn: "root"
})
export class ChatSocketService {
  private socket;

  public initSocket(): void {
    this.socket = socketIo(SERVER_URL);
  }

  public send(message: ChatMessage): void {
    this.socket.emit("message", message);
  }

  public onMessage(): Observable<ChatMessage> {
    return new Observable<ChatMessage>(observer => {
      this.socket.on("message", (data: ChatMessage) => observer.next(data));
    });
  }

  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }
}
