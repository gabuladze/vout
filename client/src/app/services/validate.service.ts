import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  /**
   * Validates the submitted vote
   * returns true if valid | false if invalid
   * @param vote {Object}
   */
  validateVote(vote) {
    return vote.option != undefined;
  }
}
