import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Users } from '../users/users.interface';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';
// import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-sign-up-user',
  templateUrl: './sign-up-user.component.html',
  styleUrls: ['./sign-up-user.component.scss'],
})
export class SignUpUserComponent implements OnInit {
  sub: Subscription;
  user: Users;
  form: FormGroup;

  send() {
    const data = this.form.value;
    console.log(data, 'inside add function');

    const sub = this.http
      .post<Users>('users/create', data)
      .subscribe((item) => {
        sub.unsubscribe();
        this.router.navigate(['users']);
        console.log(this.user, 'inside post method signup.ts');
      });
  }
  buildForm(item: Users) {
    this.form = new FormGroup({
      userName: new FormControl(item.userName, [Validators.required]),
      fullName: new FormControl(item.fullName, [Validators.required]),
      email: new FormControl(item.email, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(item.password, [Validators.required]),
      passwordConfirmation: new FormControl('', {
        validators: [Validators.required, this.passwordMatchValidator],
      }),
    });
  }
  passwordMatchValidator(form: FormControl): { [key: string]: any } | null {
    const password = form.value;
    const passwordConfirmation = form.value;

    if (password !== passwordConfirmation) {
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }
  constructor(
    private http: HttpService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.sub = this.route.params.subscribe((data) => {
      const id: any = data['id'];
      console.log(this.user, 'form constructor in signup component.ts');
      if (id) {
        const sub = this.http
          .get<Users>(`users/finduser/${id}`)
          .subscribe((data) => {
            this.user = data;
            this.buildForm(this.user);
            sub.unsubscribe();
          });
      } else {
        this.user = {
          _id: 0,
          userName: '',
          fullName: '',
          email: '',
          password: '',
        };
        this.buildForm(this.user);
        console.log(this.user, 'inside constructor signup.ts');
      }
    });
  }
  ngOnInit() {}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
