import { Component, OnInit, Inject, forwardRef } from "@angular/core";
import { DbService } from "../db/db.service";
import { ActivatedRoute, Router } from "@angular/router";
import {
  FormGroup,
  FormBuilder,
} from "@angular/forms";

@Component({
  selector: "app-edit-channel",
  templateUrl: "./edit-channel.component.html",
  styleUrls: ["./edit-channel.component.css"],
  providers: [DbService]
})
export class EditChannelComponent implements OnInit {
  public groupId;
  public channels;
  public group;

  public groups;

  public type;
  public dismissModel;
  public cardToggle;
  public types;

  public choosedAddUser;

  public addGroupChannelButton;
  public newChannelName;
  public newGroupName;

  public editGroupName;
  public editChannelName;

  public filteredUsers;

  public newUserName;
  public newEmail;
  public newUserType;
  public newPassword;
  public edittingUser;

  public tableData: any[] = [];

  public changeUserType;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dbService: DbService,
    @Inject(forwardRef(() => FormBuilder)) private formBuilder: FormBuilder
  ) {}

  // editChannelButton(groupname, channelname) {
  //   this.editChannelName = channelname;
  //   this.editGroupName = groupname;
  //   this.editChannelfilter();
  //   this.dbService
  //     .findUsersbyGroupAndChannel(this.editGroupName, this.editChannelName)
  //     .then(users => {
  //       this.tableData = users;
  //     });
  // }

  // editChannelfilter() {
  //   return this.dbService
  //     .findUsersbyGroupAndChannel(this.editGroupName, this.editChannelName)
  //     .then(cusers => {
  //       console.log(cusers);
  //       console.log("FFF");
  //       this.filteredUsers = this.users.filter(user => {
  //         const index = cusers.findIndex(
  //           cuser => cuser.username === user.username
  //         );
  //         return index == -1;
  //       });
  //     });
  // }

  // deleteUserFromChannel(scope) {
  //   return this.dbService
  //     .deleteUserFromChannel(
  //       this.editGroupName,
  //       this.editChannelName,
  //       scope.username
  //     )
  //     .then(data => {
  //       this.editChannelfilter();
  //       this.dbService.findUsersbyGroupAndChannel(
  //         this.editGroupName,
  //         this.editChannelName
  //       );
  //     });
  // }

  deleteChannel(groupname, channelname) {
    return this.dbService.deleteChannel(groupname, channelname).then(() => {
      // this.getGroups();
    });
  }

  getChannels(groupId) {
    // let self = this;
    return this.dbService.getChannels(groupId).subscribe(
      channels => {
        this.channels = channels;
      },
      err => console.log(err)
    );
  }

  getGroups() {
    // return this.dbService.getGroups().then(groups => {
    //   this.groups = groups;
    // });

    return this.dbService.getGroups().subscribe(
      groups => {
        this.groups = groups;
      },
      err => console.log(err)
    );
  }


  addUserChannel() {
    return this.dbService
      .addUserChannel(
        this.editGroupName,
        this.editChannelName,
        this.choosedAddUser
      )
      .then(data => {
        // this.getGroups();
        this.choosedAddUser = "";
      });
  }

  getGroup(groupId) {
    return this.dbService.getGroupById(groupId).subscribe(
      group => {
        this.group = group;
        console.log(this.group);
      },
      err => console.log(err)
    );
  }

  changeUser() {}

  ngOnInit() {
    this.groupId = this.route.snapshot.params["id"];
    this.getChannels(this.groupId);
    this.getGroup(this.groupId);
    this.getGroups();
    console.log(this.groups);
    console.log(this.group);
    console.log(this.channels);

    let type = localStorage.getItem("type");
    if (type == undefined) {
      location.replace("./login");
      return;
    }
    if (type == "0") {
      location.replace("./chooseGroupAndChannel");
      return;
    }

    this.dismissModel = false;
    this.newUserType = 0;
    this.type = type;

    this.validateForm = this.formBuilder.group({});
    this.dbService.getTypes().then(types => {
      this.types = types;
    });
    this.edittingUser = {};
  }

  private validateForm: FormGroup;
  submit(): void {
    console.log(this.validateForm.value);
  }
}
