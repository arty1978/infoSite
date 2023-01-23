import { Injectable } from '@angular/core';
import { Users } from './users/users.interface';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  private user?: Users;

  setUser(user?: Users) {
    this.user = user;
    console.log(user, 'user from utility in set');
  }

  getUser() {
    console.log(this.user, 'user from utility in get');

    return this.user;
  }

  constructor() {}
}
