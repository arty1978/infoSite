import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { Users } from './users.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: Users[] = [];
  edit(item: Users) {
    this.router.navigate(['users-body', item._id]);
  }
  remove(item: Users) {
    const sub = this.http
      .delete<void>(`users/deleteone/${item._id}`)
      .subscribe((data) => {
        const i = this.users.findIndex((x) => x._id == item._id);
        this.users.splice(i, 1);
        sub.unsubscribe();
      });
  }

  constructor(private http: HttpService, private router: Router) {}

  ngOnInit(): void {
    const sub = this.http.get<Users[]>('users').subscribe((data) => {
      this.users = data;
    });
    sub.unsubscribe();
  }
}
