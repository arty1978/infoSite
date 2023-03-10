import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ArticlesComponent } from './articles/articles.component';
import { routes } from './routing';
import { ArticlesBodyComponent } from './articles-body/articles-body.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from './http.service';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SignUpUserComponent } from './sign-up-user/sign-up-user.component';
import { SignInUserComponent } from './sign-in-user/sign-in-user.component';
import { UsersComponent } from './users/users.component';
import { FullArticleComponent } from './full-article/full-article.component';
import { UtilityService } from './utility.service';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { FooterComponent } from './footer/footer.component';
import { SearchPipe } from './search.pipe';

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
    FullArticleComponent,
    PasswordResetComponent,
    PasswordRecoveryComponent,
    FooterComponent,
    SearchPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [HttpService, DatePipe, UtilityService],
  bootstrap: [AppComponent],
})
export class AppModule {}
