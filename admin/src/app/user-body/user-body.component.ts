import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from '../http.service';
import { Users } from '../users/users.interface';

@Component({
  selector: 'app-user-body',
  templateUrl: './user-body.component.html',
  styleUrls: ['./user-body.component.css'],
})
export class UserBodyComponent {
  sub: Subscription;
  user: Users;
  form: FormGroup;

  update() {
    console.log(this.form);

    for (const k in this.form.value) {
      (this.user as any)[k] = this.form.value[k];
    }

    const sub = this.http
      .put<void>(`users/updateone?_id=${this.user._id}`, this.user)
      .pipe()
      .subscribe(() => {
        console.log(this.user, 'put method');
        sub.unsubscribe();
        this.router.navigate(['users']);
      });
  }

  buildForm(item: Users) {
    console.log('inside buildForm');
    this.form = new FormGroup({
      userName: new FormControl(item.userName, [Validators.required]),
      fullName: new FormControl(item.fullName, [Validators.required]),
      email: new FormControl(item.email, [Validators.required]),
      password: new FormControl(item.password, [Validators.required]),
      passwordConfirm: new FormControl(item.passwordConfirmation, [
        Validators.required,
      ]),
    });
  }

  constructor(
    private http: HttpService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.sub = this.route.params.subscribe((data) => {
      const id: any = data['id'];
      console.log(id);

      if (id) {
        const sub = this.http
          .get<Users>(`users/finduser?_id=${id}`)
          .subscribe((data) => {
            this.user = data;
            console.log(this.user);

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
          passwordConfirmation: '',
          createdAt: '',
        };

        this.buildForm(this.user);
      }
    });
  }
  ngOnInit() {}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}