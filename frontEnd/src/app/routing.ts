// import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ArticlesBodyComponent } from './articles-body/articles-body.component';
import { ArticlesComponent } from './articles/articles.component';
import { FullArticleComponent } from './full-article/full-article.component';
import { HomeComponent } from './home/home.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { SignInUserComponent } from './sign-in-user/sign-in-user.component';
import { SignUpUserComponent } from './sign-up-user/sign-up-user.component';
import { UsersComponent } from './users/users.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'articles-body', component: ArticlesBodyComponent },
  { path: 'articles-body/:id', component: ArticlesBodyComponent },
  { path: 'sign-in-user', component: SignInUserComponent },
  { path: 'sign-up-user', component: SignUpUserComponent },
  { path: 'users', component: UsersComponent },
  { path: 'full-article/:id', component: FullArticleComponent },
  { path: 'password-reset', component: PasswordResetComponent },
];
