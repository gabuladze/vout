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
  getPollById(id: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get('http://localhost:3500/api/polls/' + id)
      .map(res => res.json());
  }

  /**
   * Vote for a poll
   * @param pollId {String}
   * @param optionId {String}
   */
  voteForPoll(pollId: string, optionId: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('http://localhost:3500/api/polls/vote',
      {
        poll: pollId,
        option: optionId
      },
      { headers: headers })
      .map(res => res.json());
  }

  /**
   * Vote for a poll with a custom option
   * @param pollId {string}
   * @param option {string}
   */
  voteForPollCustom(pollId: string, option: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('http://localhost:3500/api/polls/vote/custom',
      {
        poll: pollId,
        option: option
      },
      { headers: headers })
      .map(res => res.json());
  }

  /**
   * Create poll
   * @param title {string}
   * @param options {array}
   * @param userId {string}
   */
  createPoll(title, options, userId) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('http://localhost:3500/api/polls/create',
      {
        title: title,
        options: options,
        userId: userId
      },
      { headers: headers })
      .map(res => res.json());
  }

  /**
   * Fetch polls that belong to user with id, userId
   * @param userId {string}
   */
  getUserPolls(userId: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get('http://localhost:3500/api/polls/user/' + userId,
      { headers: headers })
      .map(res => res.json());
  }

  /**
   * Delete poll
   * @param id {string}
   */
  deletePoll(id: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('http://localhost:3500/api/polls/destroy',
      { id: id },
      { headers: headers })
      .map(res => res.json());
  }
}
