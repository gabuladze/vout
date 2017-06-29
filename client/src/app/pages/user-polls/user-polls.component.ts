import { Component, OnInit } from '@angular/core';
import { PollsService } from "../../services/polls.service";

@Component({
  selector: 'app-user-polls',
  templateUrl: './user-polls.component.html',
  styleUrls: ['./user-polls.component.css'],
  providers: [PollsService]
})
export class UserPollsComponent implements OnInit {

  constructor(private _polls: PollsService) { }

  ngOnInit() {
  }

}
