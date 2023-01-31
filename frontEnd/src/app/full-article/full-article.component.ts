import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Articles } from '../articles/articles.interface';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-full-article',
  templateUrl: './full-article.component.html',
  styleUrls: ['./full-article.component.scss'],
})
export class FullArticleComponent {
  sub: Subscription;
  article: Articles;

  constructor(
    private http: HttpService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.sub = this.route.params.subscribe((data) => {
      const id: any = data['id'];

      if (id) {
        const sub = this.http
          .get<Articles>(`articles/findarticle?_id=${id}`)
          .subscribe((data) => {
            this.article = data;
            sub.unsubscribe();
          });
      }
    });
  }
}
