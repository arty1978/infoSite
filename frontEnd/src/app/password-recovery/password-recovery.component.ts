import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../http.service';
import { Users } from '../users/users.interface';
import { Subscription } from 'rxjs';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss'],
})
export class PasswordRecoveryComponent {
  sub: Subscription;
  user: any = this.utility.user;
  form: FormGroup = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})'),
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})'),
    ]),
  });

  send() {
    if (this.form.value.password === this.form.value.passwordConfirmation) {
      if (this.utility.user) {
        this.utility.user.password = this.form.value.password;
        this.utility.user.passwordConfirmation =
          this.form.value.passwordConfirmation;
        this.user.tempReset = false;
        this.user.tempPassword = '';
      }
    }
    const sub = this.http
      .put<void>(`users/updateone?_id=${this.user.id}`, this.user)
      .subscribe((item) => {
        sub.unsubscribe();
        this.router.navigate(['articles']);
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
    private router: Router,
    public utility: UtilityService
  ) {}
  ngOnInit() {
    this.user = this.utility.user;
  }

  // ngOnDestroy() {
  //   this.sub.unsubscribe();
  // }
}
