import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from './users/users.interface';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  public user?: Users;

  setUser(user?: Users) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return this.user;
  }
  removeUser() {
    this.user = undefined;
  }
  constructor(private utility: UtilityService) {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      if (user && user !== null && user !== undefined) {
        this.utility.setUser(user);
      }
    }
  }
}
