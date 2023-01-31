import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Admin } from '../admins-page/admins.interface';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SignIn } from './logIn.interFace';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss'],
})
export class LoginAdminComponent {
  sub: Subscription;
  user: Admin;
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  signIn() {
    const data = {
      email: this.form.value.email,
      password: this.form.value.password,
    };
    const sub = this.http
      .post<SignIn>('admin/signin', data)
      .subscribe((item) => {
        // console.log(item, '!!!');

        localStorage.setItem('token', item.token);
        localStorage.setItem('user', JSON.stringify(item.user));

        // console.log(item, 'token of logged ADMIN');
        this.http.setToken();
        this.utility.setUser(item.user);

        sub.unsubscribe();
        this.router.navigate(['users']);
      });
  }

  constructor(
    private http: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    public utility: UtilityService
  ) {
    this.user = {
      _id: 0,
      userName: '',
      fullName: '',
      email: '',
      password: '',
    };
    // this.buildForm(this.user);
  }

  ngOnInit() {}
}
