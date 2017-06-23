import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { PollsService } from "../../services/polls.service";

@Component({
  selector: 'app-poll-details',
  templateUrl: './poll-details.component.html',
  styleUrls: ['./poll-details.component.css'],
  providers: [PollsService]
})
export class PollDetailsComponent implements OnInit {
  id: String;
  poll: any;
  pieChartData: number[] = [];
  pieChartLabels: string[] = [];
  pieChartOptions: object = { responsive: true };

  constructor(private route: ActivatedRoute, private _polls: PollsService) { }

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

}