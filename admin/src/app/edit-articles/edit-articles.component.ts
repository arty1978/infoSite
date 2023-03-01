import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Articles } from '../articles/articles.interface';
import { HttpService } from '../http.service';
import { Users } from '../users/users.interface';

@Component({
  selector: 'app-edit-articles',
  templateUrl: './edit-articles.component.html',
  styleUrls: ['./edit-articles.component.css'],
})
export class EditArticlesComponent implements OnInit {
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
        .put<void>(
          `articles/adminUpdateone?_id=${this.article._id}`,
          this.article
        )
        .pipe()
        .subscribe(() => {
          sub.unsubscribe();
          this.router.navigate(['articles']);
        });
    } else {
      this.router.navigate(['articles']);
    }
  }

  buildForm(item: Articles) {
    if (item) {
      this.form = new FormGroup({
        title: new FormControl(item.title, [Validators.required]),
        subTitle: new FormControl(item.subTitle, [Validators.required]),
        category: new FormControl(item.category, [Validators.required]),
        body: new FormControl(item.body),
      });
    }
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
          .get<Articles>(`articles/adminfindarticle?_id=${id}`)
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
