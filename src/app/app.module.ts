import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtHelperService, JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HeroIconModule } from 'ng-heroicon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { authInterceptorProviders } from './core/interceptors/auth.interceptor';
import { AuthenticationService } from './core/services/authentication.service';
import { TokenService } from './core/services/token.service';
import { FeaturesModule } from './features/features.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FeaturesModule,
    HeroIconModule.forRoot({}, {
      defaultHostDisplay: 'inlineBlock',
      attachDefaultDimensionsIfNoneFound: true
    }),
    HttpClientModule
  ],
  providers: [TokenService, AuthenticationService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService, authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
