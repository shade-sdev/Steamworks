import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeroIconModule } from 'ng-heroicon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
