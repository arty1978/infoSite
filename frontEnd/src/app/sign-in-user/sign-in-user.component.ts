import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Users } from '../users/users.interface';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SignIn } from './signIn.interFace';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-sign-in-user',
  templateUrl: './sign-in-user.component.html',
  styleUrls: ['./sign-in-user.component.scss'],
})
export class SignInUserComponent {
  sub: Subscription;
  user: Users;
  form: FormGroup;
  attempts: number = 0;
  message: string;
  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  signIn() {
    const data = {
      email: this.form.value.email,
      password: this.form.value.password,
    };
    const sub = this.http
      .post<SignIn>('users/signin', data)
      .subscribe((item) => {

        localStorage.setItem('token', item.token);
        localStorage.setItem('user', JSON.stringify(item.user));

        if (this.form.value.password == item.user.tempPassword) {
          this.router.navigate(['password-recovery']);
          sub.unsubscribe();
          return;
        }
        this.http.setToken();
        this.utility.setUser(item.user);

        sub.unsubscribe();
        this.router.navigate(['articles']);
      });
    this.attempts++;
    this.message = `Incorrect Email or Password. your signin Attempts ${this.attempts}`;
    setTimeout(() => {
      this.message = '';
    }, 3000);
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
    public router: Router,
    public utility: UtilityService
  ) {
    this.user = {
      _id: 0,
      userName: '',
      fullName: '',
      email: '',
      password: '',
      tempPassword: '',
      tempReset: false,
    };
    this.buildForm(this.user);
  }

  ngOnInit() { }
}
