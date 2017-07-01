import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { FlashMessagesService } from "angular2-flash-messages";
import { PollsService } from "../../services/polls.service";
import { ValidateService } from "../../services/validate.service";
import { LoginService } from "../../services/login.service";

@Component({
  selector: 'app-poll-details',
  templateUrl: './poll-details.component.html',
  styleUrls: ['./poll-details.component.css'],
  providers: [PollsService, ValidateService, LoginService]
})
export class PollDetailsComponent implements OnInit {
  id: string;
  poll: any;
  pieChartData: number[] = [];
  pieChartLabels: string[] = [];
  pieChartOptions: object = { responsive: true };
  option: string;
  author: boolean;
  customOption: boolean;

  constructor(
    private route: ActivatedRoute,
    private _flashMessage: FlashMessagesService,
    private _polls: PollsService,
    private _validate: ValidateService,
    private router: Router,
    private _login: LoginService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];

      this._polls.getPollById(this.id).subscribe(data => {
        this.poll = data.poll;
        
        // Construct poll data
        data.poll.options.forEach(option => {
          this.pieChartData.push(option.votes);
          this.pieChartLabels.push(option.name);
        });

        let userId = this._login.getProfile()['id'];
        this.author = data.poll._creator == userId ? true : false;
      });
    });
  }

  onVoteSubmit() {
    if (this._validate.validateVote({ option: this.option })) {
      this._polls.voteForPoll(this.poll._id, this.option).subscribe(data => {
        if (data.success) {
          this._flashMessage.show(data.message, { cssClass: 'alert-success', timeout: 5000 });
          this.router.navigate(['/polls']);
        } else {
          this._flashMessage.show(data.message, { cssClass: 'alert-danger', timeout: 5000 });
          this.router.navigate(['/polls/:id/view', this.poll._id]);
        }
      });
    } else {
      this._flashMessage.show('Please, select one of the options!', { cssClass: 'alert-danger', timeout: 5000 });
    }
  }

  onDeletePollClick() {
    this._polls.deletePoll(this.poll._id).subscribe(data => {
      if (data.success) {
        this._flashMessage.show(data.message, { cssClass: 'alert-success', timeout: 5000 });
        this.router.navigate(['/polls']);
      } else {
        this._flashMessage.show(data.message, { cssClass: 'alert-danger', timeout: 5000 });
      }
    });
  }

  toggleCustomOption() {
    this.customOption = !this.customOption;
    return false;
  }
}
