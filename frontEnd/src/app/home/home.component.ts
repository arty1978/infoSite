import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { Articles } from '../articles/articles.interface';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  articles: Articles[] = [];

  constructor(private http: HttpService, private router: Router) {}

  ngOnInit(): void {
    const sub = this.http.get<Articles[]>('articles').subscribe((data) => {
      this.articles = data;
      sub.unsubscribe();
    });
  }
}
