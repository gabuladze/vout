import { Component, OnInit } from '@angular/core';
import { PollsService } from "../../services/polls.service";
import { LoginService } from "../../services/login.service";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: 'app-user-polls',
  templateUrl: './user-polls.component.html',
  styleUrls: ['./user-polls.component.css'],
  providers: [PollsService, LoginService]
})
export class UserPollsComponent implements OnInit {
  userId: string;
  polls: any;

  constructor(
    private _polls: PollsService,
    private _login: LoginService,
    private _flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.userId = this._login.getProfile()['id'];
    this._polls.getUserPolls(this.userId).subscribe(data => {
      if (data.success) {
        this.polls = data.polls;
      } else {
        this.polls = [];
        this._flashMessage.show(data.message, { cssClass: 'alert-danger', timeout: 5000 });
      }
    });
  }

}
