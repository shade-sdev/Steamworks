import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { IconsModule } from 'src/app/shared/heroicon/icon/icon.module';
import { GameService } from 'src/app/core/services/game.service';
import { HotToastModule } from '@ngneat/hot-toast';
import { TokenService } from 'src/app/core/services/token.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GameComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    IconsModule,
    HotToastModule.forRoot(),
    SharedModule
  ],
  providers: [GameService, TokenService]
})
export class GameModule { }
