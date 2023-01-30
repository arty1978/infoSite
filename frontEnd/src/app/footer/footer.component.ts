import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Menu } from '../navbar/navbar.interface';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  active: string = '';
  user: UtilityService;
  menu: Menu[] = [
    { route: '/', title: 'Home', icon: 'home' },
    { route: '/articles', title: 'Articles', isConnected: true, icon: 'book' },
    /* { route: '/signup', title: 'SignUp' },
    { route: '/signin', title: 'SignIn' }, */
  ];
  date: any = new Date().getFullYear();

  logout() {
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
  }
}
