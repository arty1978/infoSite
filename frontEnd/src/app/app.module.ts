import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ArticlesComponent } from './articles/articles.component';
import { RouterModule } from '@angular/router';
import { routes } from './routing';
import { ArticlesBodyComponent } from './articles-body/articles-body.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from './http.service';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SignUpUserComponent } from './sign-up-user/sign-up-user.component';
import { SignInUserComponent } from './sign-in-user/sign-in-user.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ArticlesComponent,
    ArticlesBodyComponent,
    SignUpUserComponent,
    SignInUserComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [HttpService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
