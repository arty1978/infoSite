import { Injectable } from '@angular/core';
import { Users } from './users/users.interface';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  public user?: Users;

  setUser(user?: Users) {
    this.user = user;
    // console.log(user, 'user from utility in set');
  }

  getUser() {
    return this.user;
  }
  removeUser() {
    this.user = undefined;
  }
  constructor() {}
}
