import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { FlashMessagesService } from "angular2-flash-messages";
import { PollsService } from "../../services/polls.service";

@Component({
  selector: 'app-poll-details',
  templateUrl: './poll-details.component.html',
  styleUrls: ['./poll-details.component.css'],
  providers: [PollsService]
})
export class PollDetailsComponent implements OnInit {
  id: string;
  poll: any;
  pieChartData: number[] = [];
  pieChartLabels: string[] = [];
  pieChartOptions: object = { responsive: true };
  option: string;

  constructor(
    private route: ActivatedRoute,
    private _flashMessage: FlashMessagesService,
    private _polls: PollsService,
    private router: Router
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

      });
    });
  }

  onVoteSubmit() {
    this._polls.voteForPoll(this.poll._id, this.option).subscribe(data => {
      if (data.success) {
        this._flashMessage.show(data.message, { cssClass: 'alert-success', timeout: 5000 });
        this.router.navigate(['/polls']);
      } else {
        this._flashMessage.show(data.message, { cssClass: 'alert-danger', timeout: 5000 });
        this.router.navigate(['/polls/:id/view', this.poll._id]);
      }
    });
  }

}
