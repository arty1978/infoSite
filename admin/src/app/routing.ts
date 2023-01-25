// import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AdminsPageComponent } from './admins-page/admins-page.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';

export const routes: Routes = [
  { path: 'login-admin', component: LoginAdminComponent },
  { path: 'admins-page', component: AdminsPageComponent },
];
