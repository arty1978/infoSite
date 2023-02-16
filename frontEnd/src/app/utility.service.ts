import { Injectable, OnInit } from '@angular/core';
import { Users } from './users/users.interface';

@Injectable({
  providedIn: 'root',
})
export class UtilityService implements OnInit {
  public user?: Users;
  isNavOpen = false;

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
  ngOnInit() {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      if (user && user !== null && user !== undefined) {
        this.setUser(user);
      }
    }
  }
}
