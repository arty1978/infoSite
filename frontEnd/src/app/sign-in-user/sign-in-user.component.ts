import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Users } from '../users/users.interface';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-user',
  templateUrl: './sign-in-user.component.html',
  styleUrls: ['./sign-in-user.component.scss'],
})
export class SignInUserComponent implements OnInit {
  sub: Subscription;
  user: Users;
  form: FormGroup;

  signIn() {
    const data = this.form.value;
    console.log(data, 'inside signIn function');

    const sub = this.http
      .post<Users>('users/signin', data)
      .subscribe((item) => {
        sub.unsubscribe();
        this.router.navigate(['users']);
        console.log(sub, 'inside post method signin.ts');
      });
  }
  buildForm(item: Users) {
    this.form = new FormGroup({
      email: new FormControl(item.email, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(item.password, [Validators.required]),
    });
  }
  constructor(
    private http: HttpService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.user = {
      _id: 0,
      userName: '',
      fullName: '',
      email: '',
      password: '',
    };
    this.buildForm(this.user);
  }

  ngOnInit() {}
}
