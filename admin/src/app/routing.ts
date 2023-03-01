// import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AdminsPageComponent } from './admins-page/admins-page.component';
import { ArticlesComponent } from './articles/articles.component';
import { EditArticlesComponent } from './edit-articles/edit-articles.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { UserBodyComponent } from './user-body/user-body.component';
import { UsersComponent } from './users/users.component';

export const routes: Routes = [
  { path: '', component: AdminsPageComponent },
  { path: 'login-admin', component: LoginAdminComponent },
  { path: 'users', component: UsersComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'user-body/:id', component: UserBodyComponent },
  { path: 'edit-articles/:id', component: EditArticlesComponent },
];
