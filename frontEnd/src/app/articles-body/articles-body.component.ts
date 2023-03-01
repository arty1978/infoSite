import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Articles } from '../articles/articles.interface';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { SignInUserComponent } from '../sign-in-user/sign-in-user.component';
import { Users } from '../users/users.interface';
import { UsersComponent } from '../users/users.component';

@Component({
  selector: 'app-articles-body',
  templateUrl: './articles-body.component.html',
  styleUrls: ['./articles-body.component.scss'],
})
export class ArticlesBodyComponent implements OnInit {
  sub: Subscription;
  article: Articles;
  form: FormGroup;
  author: Users;

  update() {
    for (const k in this.form.value) {
      (this.article as any)[k] = this.form.value[k];
    }
    const confirmation = window.confirm('Would you like to save changes?');
    if (confirmation) {
      const sub = this.http
        .put<void>(`articles/updateone?_id=${this.article._id}`, this.article)
        .pipe()
        .subscribe(() => {
          sub.unsubscribe();
          alert('Article updated Successfully');
          this.router.navigate(['articles']);
        });
    } else {
      this.router.navigate(['articles']);
    }
  }

  add() {
    const data = this.form.value;

    const sub = this.http
      .post<Articles>('articles/create', data)
      .subscribe((item) => {
        sub.unsubscribe();
        alert('Article published Successfully');
        this.router.navigate(['articles']);
      });
  }

  buildForm(item: Articles) {
    this.form = new FormGroup({
      title: new FormControl(item.title, [Validators.required]),
      subTitle: new FormControl(item.subTitle, [Validators.required]),
      category: new FormControl(item.category, [Validators.required]),
      body: new FormControl(item.body),
    });
  }

  constructor(
    private http: HttpService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.sub = this.route.params.subscribe((data) => {
      const id: any = data['id'];

      if (id) {
        const sub = this.http
          .get<Articles>(`articles/findOneArticle?_id=${id}`)
          .subscribe((data) => {
            this.article = data;

            this.buildForm(this.article);
            sub.unsubscribe();
          });
      } else {
        this.article = {
          _id: 0,
          title: '',
          subTitle: '',
          category: '',
          author: '',
          body: '',
          createdAt: '',
        };

        this.buildForm(this.article);
      }
    });
  }
  ngOnInit() {}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
