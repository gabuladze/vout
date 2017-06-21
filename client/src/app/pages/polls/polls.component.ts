import { Component, OnInit } from '@angular/core';
import { PollsService } from "../../services/polls.service";

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.css'],
  providers: [PollsService]
})
export class PollsComponent implements OnInit {

  constructor(protected _polls: PollsService) { }

  ngOnInit() {
  }

}
