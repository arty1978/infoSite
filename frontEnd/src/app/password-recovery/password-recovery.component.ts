import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../http.service';
import { Users } from '../users/users.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss'],
})
export class PasswordRecoveryComponent {
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
        this.router.navigate(['articles']);
        console.log(this.user, 'inside post method signup.ts');
      });
  }
  buildForm(item: Users) {
    this.form = new FormGroup({
      password: new FormControl(item.password, [
        Validators.required,
        Validators.pattern(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        ),
      ]),
      passwordConfirmation: new FormControl('', {
        validators: [Validators.required, this.passwordMatchValidator],
      }),
    });
  }
  passwordMatchValidator(form: FormGroup): { [key: string]: any } | null {
    const password = form.get('password')?.value;
    const passwordConfirmation = form.get('passwordConfirmation')?.value;

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
