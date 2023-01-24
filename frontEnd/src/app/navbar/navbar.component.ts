import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../utility.service';
import { Router } from '@angular/router';
import { Menu } from './navbar.interface';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  active: string = '';
  menu: Menu[] = [
    { route: '/', title: 'Home' },
    { route: '/articles', title: 'Articles' },
    // { route: '/sign-in-user', title: 'SignIn' },
    // { route: '/sign-up-user', title: 'SignUp' },
  ];

  signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.utility.removeUser();
    // this.router.navigate(['/signin']);
  }
  constructor(public utility: UtilityService) {}
  ngOnInit(): void {}
}
