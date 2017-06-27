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

import { Angular2SocialLoginModule } from "angular2-social-login";
import { ChartsModule } from "ng2-charts";

let providers = {
  "google": {
    "clientId": "22850615934-r0lrae7sd5ik8i4vpf43gp9u6hkdm48l.apps.googleusercontent.com"
  }
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PollsComponent,
    PollDetailsComponent
  ],
  imports: [
    BrowserModule,
    FlashMessagesModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ChartsModule,
    Angular2SocialLoginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

Angular2SocialLoginModule.loadProvidersScripts(providers);