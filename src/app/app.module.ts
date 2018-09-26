import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { Routes, RouterModule } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';

import { ElModule } from "element-angular";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { AdminComponent } from "./admin/admin.component";
import { ChatroomComponent } from "./chatroom/chatroom.component";
import { ChooseGroupAndChannelComponent } from "./choose-group-and-channel/choose-group-and-channel.component";
import { TestComponent } from "./test/test.component";
import { ChatComponentComponent } from './chat/chat-component/chat-component.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "admin", component: AdminComponent },
  { path: "chatroom", component: ChatroomComponent},
  { path: "chooseGroupAndChannel", component: ChooseGroupAndChannelComponent },
  { path: "chattest", component: ChatComponentComponent },
  { path: "**", redirectTo: "login" }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    ChatroomComponent,
    ChooseGroupAndChannelComponent,
    TestComponent,
    ChatComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    ElModule.forRoot(),
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
