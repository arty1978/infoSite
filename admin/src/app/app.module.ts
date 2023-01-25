import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { AdminsPageComponent } from './admins-page/admins-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { UtilityService } from './utility.service';
import { HttpService } from './http.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginAdminComponent,
    AdminsPageComponent,
    NavbarComponent,
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [HttpService, UtilityService],
  bootstrap: [AppComponent],
})
export class AppModule {}
