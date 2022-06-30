import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HotToastModule } from '@ngneat/hot-toast';
import { authInterceptorProviders } from 'src/app/core/interceptors/auth.interceptor';
import { GameService } from 'src/app/core/services/game.service';
import { LinkService } from 'src/app/core/services/link.service';
import { SteamService } from 'src/app/core/services/steam.service';
import { TokenService } from 'src/app/core/services/token.service';
import { IconsModule } from 'src/app/shared/heroicon/icon/icon.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { ViewGameComponent } from './view-game/view-game.component';
import { ViewLinkComponent } from './view-link/view-link.component';
import { CreateLinkComponent } from './create-link/create-link.component';


@NgModule({
  declarations: [
    AdminComponent,
    CreateGameComponent,
    ViewGameComponent,
    ViewLinkComponent,
    CreateLinkComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgSelectModule,
    HttpClientModule,
    IconsModule,
    HotToastModule.forRoot()
  ],
  providers: [GameService, SteamService, LinkService, TokenService, authInterceptorProviders]
})
export class AdminModule { }
