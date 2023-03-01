import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { Articles } from './articles.interface';
import { SignIn } from '../login-admin/logIn.interFace';
@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  articles: Articles[] = [];
  signIn: SignIn;

  edit(item: Articles) {
    this.router.navigate(['edit-articles', item._id]);
  }
  searchVal: string;

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
    localStorage.getItem('user');

    const sub = this.http.get<Articles[]>(`articles`).subscribe((data) => {
      this.articles = data;
      sub.unsubscribe();
    });
  }
}
