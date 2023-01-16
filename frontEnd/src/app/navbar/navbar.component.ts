import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
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
    { route: '/sign-in-user', title: 'SignIn' },
    { route: '/sign-up-user', title: 'SignUp' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
