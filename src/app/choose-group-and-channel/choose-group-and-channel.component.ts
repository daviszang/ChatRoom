import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DbService } from "../db/db.service";

@Component({
  selector: 'app-choose-group-and-channel',
  templateUrl: './choose-group-and-channel.component.html',
  styleUrls: ['./choose-group-and-channel.component.css']
})
export class ChooseGroupAndChannelComponent implements OnInit {
  private groups;
  private channels;
  private choosedGroup;

  constructor(
    private activedRoute: ActivatedRoute,
    private dbService: DbService
  ) {}

  getGroups(){
    return this.dbService.getGroups().then(groups => {
      this.groups = groups;
    })
  }

  getChannels(){
    return this.dbService.getChannels(this.choosedGroup).then(channels =>{
      this.channels = channels;
    })
  }

  changeGroupName(group){
    this.choosedGroup = group.name;
    this.getChannels();
  }


  ngOnInit() {
    this.getGroups();
    this.channels = [];
  }

}
