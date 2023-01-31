import { HttpClient } from '@angular/common/http';
import { Component, OnInit, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Menu } from '../navbar/navbar.interface';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  active: string = '';
  user: UtilityService;
  screenSize: string;
  menu: Menu[] = [
    { route: '/', title: 'Home', icon: 'home' },
    { route: '/articles', title: 'Articles', isConnected: true, icon: 'book' },
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
    this.utility.getUser();
    this.screenSize = window.innerWidth <= 767 ? 'mobile' : 'desktop';
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenSize = window.innerWidth <= 767 ? 'mobile' : 'desktop';
  }
}
