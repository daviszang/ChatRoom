import { Component, OnInit } from "@angular/core";
import { Action } from "../action";
import { ChatMessage } from "../chat-message";
import { Event } from "../event";
import { ChatSocketService } from "../chat-socket.service";

@Component({
  selector: "app-chat-component",
  templateUrl: "./chat-component.component.html",
  styleUrls: ["./chat-component.component.css"]
})
export class ChatComponentComponent implements OnInit {
  action = Action;
  // user: User;
  messages: ChatMessage[] = [];
  messageContent: string;
  ioConnection: any;

  constructor(private socketService: ChatSocketService) {}

  ngOnInit(): void {
    console.log("initing");
    this.initIoConnection();
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService
      .onMessage()
      .subscribe((message: ChatMessage) => {
        this.messages.push(message);
      });

    this.socketService.onEvent(Event.CONNECT).subscribe(() => {
      console.log("connected");
    });

    this.socketService.onEvent(Event.DISCONNECT).subscribe(() => {
      console.log("disconnected");
    });
  }

  public sendMessage(message: string): void {
    if (!message) {
      return;
    }
    console.log("send message");
    console.log(message);
    this.socketService.send({
      content: message,
      type: this.action.MESSAGE,
      from: localStorage.getItem("username"),
      group: localStorage.getItem("groupId"),
      channel: localStorage.getItem("channelId")
    });
    this.messageContent = null;
  }

  public sendNotification(params: any, action: Action): void {
    let message: ChatMessage;
    // if (action === Action.JOINED) {
    //   message = {
    //     action: action
    //   };
    // } else if (action === Action.RENAME) {
    //   message = {
    //     action: action,
    //     content: {
    //       previousUsername: params.previousUsername
    //     }
    //   };
    // }
    this.socketService.send(message);
  }
}
