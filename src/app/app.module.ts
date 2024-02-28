import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HomeComponent } from 'src/profile/components/home';
import { LoginComponent } from 'src/profile/components/login';
import { ForgotPasswordComponent } from 'src/profile/components/forgotPassword';
import { AlertService, AuthenticationService, UserService } from 'src/common/services';
import { SignupComponent } from 'src/profile/components/signup';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from 'src/components/directives/alert.component';
import { AuthGuard } from 'src/components/guards';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService],
  bootstrap: [AppComponent],
})
export class AppModule { }
