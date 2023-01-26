import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { Articles } from './articles.interface';
import { SignIn } from '../sign-in-user/signIn.interFace';
// import { SignInUserComponent } from '../sign-in-user/sign-in-user.component';
// import { UtilityService } from '../utility.service';
@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  articles: Articles[] = [];
  signIn: SignIn;

  edit(item: Articles) {
    this.router.navigate(['articles-body', item._id]);
  }
  remove(item: Articles) {
    console.log(item);
    localStorage.getItem('token');
    const sub = this.http
      .delete<Articles>(`articles/deleteone/${item._id}`)
      .subscribe((data) => {
        const i = this.articles.findIndex((x) => x._id === item._id);
        this.articles.splice(i, 1);
        sub.unsubscribe();
      });
  }
  constructor(private http: HttpService, private router: Router) {}

  ngOnInit() {
    localStorage.getItem('token');
    const userId = localStorage.getItem('user');

    const sub = this.http
      .get<Articles[]>(`articles/getMyArticles?_id=${userId}`)
      .subscribe((data) => {
        this.articles = data;
        sub.unsubscribe();
      });
  }
}
// import { Controller, Get } from '@nestjs/common';
// import { Session } from '@nestjs/common/decorators';
// import { HttpStatus } from '@nestjs/common/enums';
// import { HttpException } from '@nestjs/common/exceptions';
// import { AppService } from './app.service';

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get()
//   getHello(@Session() session: Record<string, any>) {
//     if (!session.attempts) {
//       session.attempts = 0;
//     }

//     if (session.attempts >= 10) {
//       throw new HttpException('למה אתה מגזים?', HttpStatus.BAD_REQUEST);
//     }

//     // כשהיוזר מצליח להתחבר, יש להוסיף אותו לסשיין
//     // session.user = user;

//     session.attempts++;

//     return {
//       attempts: session.attempts,
//     };
//     // return this.appService.getHello();
//   }
// }
// edit(item: Articles) {
//   this.selectedArticle = item;
//   this.updateSelected(item._id);
//   console.log(item._id, 'edit');

//   // this.router.navigate(['articles-body', item._id]);
// }
// updateSelected(id: string) {
//   this.router.navigate(['articles-body', id]);
//   console.log(id, 'updateSelected');
// }
