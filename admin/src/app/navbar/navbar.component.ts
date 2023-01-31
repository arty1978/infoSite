import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../utility.service';
import { NavigationEnd, Router } from '@angular/router';
import { Menu } from './navbar.interface';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  active: string = '';
  menu: Menu[] = [
    { route: '/users', title: 'Users', icon: 'black-tie' },
    { route: '/articles', title: 'Articles', icon: 'book' },
  ];

  signOut() {
    if (this.utility.getUser()) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.utility.removeUser();
    }
  }

  closeNav() {
    this.utility.isNavOpen = false;
  }
  openNav() {
    this.utility.isNavOpen = true;
  }

  constructor(public utility: UtilityService, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.active = event.url;
      }
    });
  }
  ngOnInit(): void {
    this.utility.getUser();
  }
}
