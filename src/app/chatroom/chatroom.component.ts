import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {
  //server send all the users when log into the channel.
  private users;

  constructor() { }

  ngOnInit() {
    
  }

}
