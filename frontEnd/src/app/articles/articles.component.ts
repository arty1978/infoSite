import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { Articles } from './articles.interface';
import { SignIn } from '../sign-in-user/signIn.interFace';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  articles: Articles[] = [];
  signIn: SignIn;
  title = 'angular-text-search-highlight';
  searchText = '';
  characters: Articles[] = [];
  searchVal: string;

  edit(item: Articles) {
    this.router.navigate(['articles-body', item._id]);
  }
  remove(item: Articles) {
    const confirmation = window.confirm(
      'Are you sure you want to delete this item?'
    );
    if (confirmation) {
      localStorage.getItem('token');
      const sub = this.http
        .delete<Articles>(`articles/deleteone/${item._id}`)
        .subscribe((data) => {
          const i = this.articles.findIndex((x) => x._id === item._id);
          this.articles.splice(i, 1);
          sub.unsubscribe();
        });
    }
  }
  constructor(private http: HttpService, private router: Router) {}

  ngOnInit() {
    localStorage.getItem('token');
    console.log(localStorage.getItem('token'));

    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      console.log(user.id, 'localstora');

      const sub = this.http
        .get<Articles[]>(`articles/getMyArticles?_id=${user.id}`)
        .subscribe((data) => {
          console.log(data, 'articles');

          this.articles = data;
          sub.unsubscribe();
        });
    }
  }
}
