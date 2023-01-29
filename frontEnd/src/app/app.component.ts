import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { HttpService } from './http.service';
import { Users } from './users/users.interface';
import { UtilityService } from './utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontEnd';
  logout() {
    const sub = this.http
      .get('signOut')
      .pipe(
        finalize(() => {
          if (sub?.unsubscribe) {
            sub.unsubscribe();
          }
        })
      )
      .subscribe(() => {
        this.utility.setUser();
        this.router.navigate(['sign-in-user']);
      });
  }

  constructor(
    private utility: UtilityService,
    private http: HttpService,
    private router: Router
  ) {}

  ngOnInit() {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      if (user && user !== null && user !== undefined) {
        this.utility.setUser(user);
      } else {
        const sub = this.http
          .get<Users>('users/signin')
          .pipe(
            finalize(() => {
              if (sub?.unsubscribe) {
                sub.unsubscribe();
              }
            })
          )
          .subscribe((data) => {
            this.utility.setUser(data);
          });
      }
    } else {
      const sub = this.http
        .get<Users>('users/signin')
        .pipe(
          finalize(() => {
            if (sub?.unsubscribe) {
              sub.unsubscribe();
            }
          })
        )
        .subscribe((data) => {
          this.utility.setUser(data);
        });
    }
  }
}
