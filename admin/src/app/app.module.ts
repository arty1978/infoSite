import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { routes } from './routing';
import { AdminsPageComponent } from './admins-page/admins-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { UtilityService } from './utility.service';
import { UsersComponent } from './users/users.component';
import { UserBodyComponent } from './user-body/user-body.component';
import { ArticlesComponent } from './articles/articles.component';
import { EditArticlesComponent } from './edit-articles/edit-articles.component';
import { SearchPipe } from './search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginAdminComponent,
    AdminsPageComponent,
    NavbarComponent,
    UsersComponent,
    UserBodyComponent,
    ArticlesComponent,
    EditArticlesComponent,
    SearchPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    FormsModule,
  ],
  providers: [HttpService, UtilityService],
  bootstrap: [AppComponent],
})
export class AppModule {}
