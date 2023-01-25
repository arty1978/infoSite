import { Injectable } from '@angular/core';
import { Admin } from './admins-page/admins.interface';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  public user?: Admin;

  setUser(user?: Admin) {
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
