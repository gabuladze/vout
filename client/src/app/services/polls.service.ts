import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PollsService {

  constructor(private http: Http) { }

  /**
   * Retrieve the list of all polls from server
   */
  getAllPolls() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get('http://localhost:3500/api/polls')
      .map(res => res.json());
  }

  /**
   * Retrieve a single poll by id
   * @param id {String}
   */
  getPollById(id: String) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get('http://localhost:3500/api/polls/' + id)
      .map(res => res.json());
  }
}
