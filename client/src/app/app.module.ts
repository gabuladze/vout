import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlashMessagesModule } from "angular2-flash-messages";
import { NavbarComponent } from './components/navbar/navbar.component';
import { PollsComponent } from './pages/polls/polls.component';
import { PollDetailsComponent } from './pages/poll-details/poll-details.component';

import { ChartsModule } from "ng2-charts";
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PollsComponent,
    PollDetailsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FlashMessagesModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
