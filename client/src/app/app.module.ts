import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PollsComponent } from './pages/polls/polls.component';
import { PollDetailsComponent } from './pages/poll-details/poll-details.component';

import { ChartsModule } from "ng2-charts";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PollsComponent,
    PollDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
