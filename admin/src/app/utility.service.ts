import { Injectable, OnInit } from '@angular/core';
import { Admin } from './admins-page/admins.interface';

@Injectable({
  providedIn: 'root',
})
export class UtilityService implements OnInit {
  public user?: Admin;
  isNavOpen = true;

  setUser(user?: Admin) {
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
