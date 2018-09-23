import { Injectable } from "@angular/core";
import { resolve } from "url";

@Injectable({
  providedIn: "root"
})
export class DbService {
  //0 : genneral  1 : group admin 2 : super admin
  private types = [
    { label: "general", type: 0 },
    { label: "group admin", type: 1 },
    { label: "super admin", type: 2 }
  ];

  private users = [
    {
      username: "tbxsx1",
      password: "pass1",
      email: "email1@qq.com",
      type: 0
    },
    {
      username: "tbxsx2",
      password: "pass2",
      email: "email2@qq.com",
      type: 0
    },
    {
      username: "tbxsx3",
      password: "pass3",
      email: "email3@qq.com",
      type: 1
    },
    {
      username: "tbxsx4",
      password: "pass4",
      email: "email4@qq.com",
      type: 2
    }
  ];
  private groups = [
    {
      name: "group1",
      channels: [
        {
          name: "channel11",
          users: [
            {
              username: "tbxsx3",
              password: "pass3",
              email: "email3@qq.com",
              type: 1
            }
          ]
        },
        {
          name: "channel12",
          users: []
        }
      ]
    },
    {
      name: "group2",
      channels: [
        {
          name: "channel21",
          users: []
        },
        {
          name: "channel22",
          users: []
        }
      ]
    },
    {
      name: "group3",
      channels: [
        {
          name: "channel31",
          users: []
        },
        {
          name: "channel32",
          users: []
        },
        {
          name: "channel33",
          users: []
        }
      ]
    }
  ];
  private messages = [];


  getTypes(){
    return new Promise(resolve => {
      resolve(this.types);
    })
  }

  getUsers() {
    return new Promise(resolve => {
      let data = this.users;
      resolve(data);
    });
  }

  getUser(username, password) {
    return new Promise(resolve => {
      const index = this.users.findIndex(
        user => user.username === username && user.password === password
      );
      let ret = index != -1;
      let data = {};
      if (index != -1) {
        data["user"] = this.users[index];
        data["contain"] = true;
      } else {
        data["user"] = {};
        data["contain"] = false;
      }
      resolve(data);
    });
  }

  getGroups() {
    return new Promise(resolve => {
      let data = this.groups;
      resolve(data);
    });
  }

  getChannels(groupname) {
    return new Promise(resolve => {
      const index = this.groups.findIndex(group => group.name === groupname);
      let data = this.groups[index].channels;
      resolve(data);
    });
  }

  addChannel(groupname, channelname) {
    return new Promise(resolve => {
      const index = this.groups.findIndex(group => group.name === groupname);
      let newChannel = {
        name: channelname,
        users: []
      };
      this.groups[index].channels.push(newChannel);
      resolve(this.groups);
    });
  }

  addUser(data) {
    console.log("addUser");
    console.log(data);
    return new Promise(resolve => {
      const index = this.users.findIndex(
        user => user.username == data.username
      );
      if (index == -1) {
        this.users.push(data);
      }
      resolve(data);
    });
  }

  changeUserType(username,type):Promise<any[]>{
    const index = this.users.findIndex(
      user => user.username == username
    );
    this.users[index].type = type;
    return new Promise(resolve => {
      resolve(this.users);
    })
  }

  addGroup(data) {
    return new Promise(resolve => {
      const index = this.groups.findIndex(group => group.name === data.name);
      if (index == -1) {
        this.groups.push(data);
      }
      resolve(data);
    });
  }

  findUsersbyGroupAndChannel(groupname, channelname):Promise<any[]> {
    return new Promise(resolve => {
      let data = [];
      const gindex = this.groups.findIndex(group => group.name === groupname);
      if (gindex != -1) {
        const cindex = this.groups[gindex].channels.findIndex(
          channel => channel.name === channelname
        );
        if (cindex != -1) {
          data = this.groups[gindex].channels[cindex].users;
        }
      }
      resolve(data);
    });
  }

  deleteUserFromChannel(groupname, channelname, username) {
    return new Promise(resolve => {
      let data = [];
      const gindex = this.groups.findIndex(group => group.name === groupname);
      if (gindex != -1) {
        const cindex = this.groups[gindex].channels.findIndex(
          channel => channel.name === channelname
        );
        if (cindex != -1) {
          const uindex = this.groups[gindex].channels[cindex].users.findIndex(
            user => user.username === username
          );
          this.groups[gindex].channels[cindex].users.splice(uindex, 1);
        }
      }
      resolve(true);
    });
  }

  addUserChannel(groupname, channelname, user) {
    return new Promise(resolve => {
      let data = [];
      const gindex = this.groups.findIndex(group => group.name === groupname);
      if (gindex != -1) {
        const cindex = this.groups[gindex].channels.findIndex(
          channel => channel.name === channelname
        );
        if (cindex != -1) {
          this.groups[gindex].channels[cindex].users.push(user);
        }
      }
      resolve(this.groups);
    });
  }

  addGroupByName(groupname) {
    return new Promise(resolve => {
      const index = this.groups.findIndex(group => group.name === groupname);
      let newGroup = {
        name: groupname,
        channels: []
      };
      if (index == -1) {
        this.groups.push(newGroup);
      }
      resolve(this.groups);
    });
  }

  deleteUser(username) {
    return new Promise(resolve => {
      const index = this.users.findIndex(user => user.username === username);
      this.users.splice(index, 1);
      resolve(true);
    });
  }

  deleteGroup(groupname) {
    return new Promise(resolve => {
      const index = this.groups.findIndex(group => group.name === groupname);
      if (index != -1) {
        this.groups.splice(index, 1);
      }
      resolve(true);
    });
  }

  deleteChannel(groupname, channelname) {
    return new Promise(resolve => {
      const index = this.groups.findIndex(group => group.name === groupname);
      if (index != -1) {
        const channelIndex = this.groups[index].channels.findIndex(
          channel => channel.name === channelname
        );
        if (channelIndex != -1) {
          this.groups[index].channels.splice(channelIndex, 1);
        }
      }
      resolve(true);
    });
  }

  updateUser(newuser) {
    return new Promise(resolve => {
      const index = this.users.findIndex(
        user => user.username === newuser.username
      );
      this.users[index] = newuser;
      resolve(true);
    });
  }

  constructor() {}
}
