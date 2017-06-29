import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {
  title: string;
  options: any;

  constructor() { }

  ngOnInit() {
    this.options = [];
  }

  /**
   * Push option to options array
   * @param option {string}
   */
  addOption(option) {
    this.options.push(option);
  }

  /**
   * Delete option from options array
   * @param option {string}
   */
  deleteFromOptions(option) {
    this.options = this.options.filter(o => o != option);
  }

}
