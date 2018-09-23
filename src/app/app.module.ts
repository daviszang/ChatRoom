import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from "@angular/core";
import { ReactiveFormsModule,FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { Routes, RouterModule } from "@angular/router";

import { ElModule } from 'element-angular'


import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { AdminComponent } from "./admin/admin.component";
import { ChatroomComponent } from "./chatroom/chatroom.component";
import { ChooseGroupAndChannelComponent } from "./choose-group-and-channel/choose-group-and-channel.component";
import { TestComponent } from "./test/test.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "admin", component: AdminComponent },
  { path: "chatroom", component: ChatroomComponent },
  { path: "chooseGroupAndChannel", component: ChooseGroupAndChannelComponent },
  { path: "test", component: TestComponent },
  { path: "**", redirectTo: "login" }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    ChatroomComponent,
    ChooseGroupAndChannelComponent,
    TestComponent 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    ElModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
