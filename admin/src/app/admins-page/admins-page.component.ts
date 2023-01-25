import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { Admin } from './admins.interface';

@Component({
  selector: 'app-admins-page',
  templateUrl: './admins-page.component.html',
  styleUrls: ['./admins-page.component.css'],
})
export class AdminsPageComponent implements OnInit {
  users: Admin[] = [];
  edit(item: Admin) {
    this.router.navigate(['users-body', item._id]);
  }
  remove(item: Admin) {
    console.log(item);
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
    const sub = this.http.get<Admin[]>('users').subscribe((data) => {
      this.users = data;
    });
    sub.unsubscribe();
  }
}
