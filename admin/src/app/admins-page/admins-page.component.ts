import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { Users } from '../../../../frontEnd/src/app/users/users.interface';
import { SignIn } from '../login-admin/logIn.interFace';

@Component({
  selector: 'app-admins-page',
  templateUrl: './admins-page.component.html',
  styleUrls: ['./admins-page.component.scss'],
})
export class AdminsPageComponent implements OnInit {
  users: Users[] = [];
  sigIn: SignIn;
  edit(item: Users) {
    this.router.navigate(['users/updateone', item._id]);
  }
  remove(item: Users) {
    const sub = this.http
      .delete<Users>(`users/deleteone/${item._id}`)
      .subscribe((data) => {
        const i = this.users.findIndex((x) => x._id == item._id);
        this.users.splice(i, 1);
        sub.unsubscribe();
      });
  }

  constructor(private http: HttpService, private router: Router) {}

  ngOnInit(): void {
    localStorage.getItem('token');
    const adminId = localStorage.getItem('user');

    const sub = this.http.get<Users[]>('users').subscribe((data) => {
      this.users = data;
    });
    sub.unsubscribe();
  }
}
