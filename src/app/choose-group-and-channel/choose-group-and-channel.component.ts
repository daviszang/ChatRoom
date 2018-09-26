import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DbService } from "../db/db.service";

@Component({
  selector: "app-choose-group-and-channel",
  templateUrl: "./choose-group-and-channel.component.html",
  styleUrls: ["./choose-group-and-channel.component.css"]
})
export class ChooseGroupAndChannelComponent implements OnInit {
  public groups;
  public channels;
  public choosedGroup;

  constructor(
    private activedRoute: ActivatedRoute,
    private dbService: DbService
  ) {}

  getGroups() {
    return this.dbService.getGroups().subscribe(
      groups => {
        this.groups = groups;
      },
      err => console.log(err)
    );
  }

  getChannels() {
    return this.dbService.getChannels(this.choosedGroup).subscribe(
      channels => {
        this.channels = channels;
      },
      err => console.log(err)
    );
  }

  changeGroupName(group) {
    this.choosedGroup = group._id;
    this.getChannels();
  }

  ngOnInit() {
    this.getGroups();
    this.channels = [];
  }
}
