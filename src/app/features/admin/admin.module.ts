import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { GameService } from 'src/app/core/services/game.service';
import { LinkService } from 'src/app/core/services/link.service';
import { SteamService } from 'src/app/core/services/steam.service';
import { SharedModule } from 'src/app/shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { ViewGameComponent } from './view-game/view-game.component';


@NgModule({
  declarations: [
    AdminComponent,
    CreateGameComponent,
    ViewGameComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgSelectModule,
    HttpClientModule
  ],
  providers: [GameService, SteamService, LinkService]
})
export class AdminModule { }
