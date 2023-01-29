import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../utility.service';
import { NavigationEnd, Router } from '@angular/router';
import { Menu } from './navbar.interface';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  active: string = '';
  menu: Menu[] = [
    { route: '/', title: 'Home' },
    { route: '/articles', title: 'Articles', isConnected: true },
    // { route: '/sign-in-user', title: 'SignIn' },
    // { route: '/sign-up-user', title: 'SignUp' },
  ];

  signOut() {
    if (this.utility.getUser()) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.utility.removeUser();
    }
  }
  constructor(
    public utility: UtilityService,
    private router: Router,
    private http: HttpClient
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.active = event.url;
      }
    });
  }
  ngOnInit(): void {
    const user = this.utility.getUser();
    console.log(user, '!!!');
  }
}
