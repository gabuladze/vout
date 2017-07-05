import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { FlashMessagesService } from "angular2-flash-messages";
import { PollsService } from "../../services/polls.service";
import { LoginService } from "../../services/login.service";

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css'],
  providers: [PollsService, LoginService]
})
export class CreatePollComponent implements OnInit {
  title: string;
  option: string;
  options: any;

  constructor(
    private _polls: PollsService,
    private _login: LoginService,
    private _flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.option = '';
    this.options = [];
  }

  /**
   * Push option to options array
   * @param option {string}
   */
  addOption() {
    this.options.push(this.option);
    this.option = '';
  }

  /**
   * Delete option from options array
   * @param option {string}
   */
  deleteFromOptions(option) {
    this.options = this.options.filter(o => o != option);
  }

  onSubmit() {
    let userId = this._login.getProfile()['id'];
    this._polls.createPoll(this.title, this.options, userId).subscribe(data => {
      if (data.success) {
        this._flashMessage.show('Poll has been added!', { cssClass: 'alert-success', timeout: 5000 });
        this.router.navigate(['/polls']);
      } else {
        this._flashMessage.show(data.message, { cssClass: 'alert-danger', timeout: 5000 });
      }
    });
  }

}
