import { Component, OnInit, Inject, forwardRef } from "@angular/core";
import { DbService } from "../db/db.service";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms";

type validateResult = {
  status: string;
  message?: string;
};

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
  providers: [DbService]
})
export class AdminComponent implements OnInit {
  public users;
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
    private dbService: DbService,
    @Inject(forwardRef(() => FormBuilder)) private formBuilder: FormBuilder
  ) {}

  editChannelButton(groupname, channelname) {
    this.editChannelName = channelname;
    this.editGroupName = groupname;
    this.editChannelfilter();
    this.dbService
      .findUsersbyGroupAndChannel(this.editGroupName, this.editChannelName)
      .then(users => {
        this.tableData = users;
      });
  }

  editChannelfilter() {
    return this.dbService
      .findUsersbyGroupAndChannel(this.editGroupName, this.editChannelName)
      .then(cusers => {
        console.log(cusers);
        console.log("FFF");
        this.filteredUsers = this.users.filter(user => {
          const index = cusers.findIndex(
            cuser => cuser.username === user.username
          );
          return index == -1;
        });
      });
  }

  deleteUserFromChannel(scope) {
    return this.dbService
      .deleteUserFromChannel(
        this.editGroupName,
        this.editChannelName,
        scope.username
      )
      .then(data => {
        this.editChannelfilter();
        this.dbService.findUsersbyGroupAndChannel(
          this.editGroupName,
          this.editChannelName
        );
      });
  }

  getUsers() {
    return this.dbService.getUsers().then(users => {
      this.users = users;
    });
  }

  getGroups() {
    return this.dbService.getGroups().then(groups => {
      this.groups = groups;
    });
  }

  deleteUser(user) {
    return this.dbService.deleteUser(user).then(() => {
      return this.getUsers();
    });
  }

  createUser() {
    let newUser = {
      username: this.newUserName,
      email: this.newEmail,
      type: this.newUserType,
      password: this.newPassword
    };
    // console.log("HHHHH1")
    // console.log(newUser);
    this.dbService.addUser(newUser).then(data => {
      this.getUsers();
      this.newUserName = "";
      this.newEmail = "";
      this.newUserType = 0;
      this.newPassword = "";
    });
  }

  editUserButton(user) {
    this.edittingUser = user;
  }
  editUser() {
    this.dbService
      .changeUserType(this.edittingUser.username, this.changeUserType)
      .then(data => {});
    this.edittingUser = {};
    this.changeUserType = "";
  }

  editGroup() {}

  deleteChannel(groupname, channelname) {
    return this.dbService.deleteChannel(groupname, channelname).then(() => {
      this.getGroups();
    });
  }

  createGroup() {
    let newGroup = {
      name: this.newGroupName,
      channels: []
    };
    this.dismissModel = true;
    return this.dbService.addGroup(newGroup).then(data => this.getGroups());
  }

  deleteGroup(groupname) {
    console.log(groupname);
    return this.dbService.deleteGroup(groupname).then(data => {
      return this.getGroups();
    });
  }

  addChannelButton(groupname) {
    this.addGroupChannelButton = groupname;
  }
  addChannel() {
    let tmp = this.addGroupChannelButton;
    return this.dbService.addChannel(tmp, this.newChannelName).then(data => {
      return this.getGroups();
    });
  }

  addUserChannel() {
    return this.dbService
      .addUserChannel(
        this.editGroupName,
        this.editChannelName,
        this.choosedAddUser
      )
      .then(data => {
        this.getGroups();
        this.choosedAddUser = "";
      });
  }

  changeUser() {}

  ngOnInit() {
    let type = localStorage.getItem("type");
    if (type == undefined) {
      location.replace("login");
      return;
    }
    if (type == "0") {
      location.replace("chooseGroupAndChannel");
      return;
    }
    this.dismissModel = false;
    this.type = type;
    this.getUsers();
    this.getGroups();

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
