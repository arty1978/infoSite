// import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AdminsPageComponent } from './admins-page/admins-page.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { UserBodyComponent } from './user-body/user-body.component';
import { UsersComponent } from './users/users.component';

export const routes: Routes = [
  { path: '', component: LoginAdminComponent },
  { path: 'admins-page', component: AdminsPageComponent },
  { path: 'users', component: UsersComponent },
  // { path: 'user-body', component: UserBodyComponent },
  { path: 'user-body/:id', component: UserBodyComponent },
];
