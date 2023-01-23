import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { HttpService } from './http.service';
import { SignIn } from './sign-in-user/signIn.interFace';
import { UtilityService } from './utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontEnd';
  // logout() {
  //   const sub = this.http
  //     .get('logout')
  //     .pipe(
  //       finalize(() => {
  //         if (sub?.unsubscribe) {
  //           sub.unsubscribe();
  //         }
  //       })
  //     )
  //     .subscribe(() => {
  //       this.utility.setUser();
  //       this.router.navigate(['login']);
  //     });
  // }

  constructor(
    public utility: UtilityService,
    private http: HttpService,
    private router: Router
  ) {}

  ngOnInit() {
    const sub = this.http
      .get<SignIn>('login')
      .pipe(
        finalize(() => {
          if (sub?.unsubscribe) {
            sub.unsubscribe();
          }
        })
      )
      .subscribe((data) => {
        if (data.status == 'error') {
          this.router.navigate(['login']);
        } else {
          this.utility.setUser(data.user);
        }
      });
  }
}
