import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { PollsService } from "../../services/polls.service";

@Component({
  selector: 'app-poll-details',
  templateUrl: './poll-details.component.html',
  styleUrls: ['./poll-details.component.css']
})
export class PollDetailsComponent implements OnInit {
  id: String;

  constructor(private route: ActivatedRoute, private _polls: PollsService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

}
