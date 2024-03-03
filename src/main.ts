import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertService, AuthenticationService, UserService } from 'src/common/services';
import { AuthGuard } from 'src/common/guards';
import { IonicRouteStrategy, IonicModule } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, BrowserAnimationsModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, ReactiveFormsModule),
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        provideHttpClient(withInterceptorsFromDi()),
    ]
})
  .catch(err => console.log(err));
