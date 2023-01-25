import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './http.service';
import { UtilityService } from './utility.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'admin';
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
        this.router.navigate(['login-admin']);
      });
  }

  constructor(
    public utility: UtilityService,
    private http: HttpService,
    private router: Router
  ) {}
}
