import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { IconsModule } from 'src/app/shared/heroicon/icon/icon.module';
import { GameService } from 'src/app/core/services/game.service';
import { HotToastModule } from '@ngneat/hot-toast';


@NgModule({
  declarations: [
    GameComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    IconsModule,
    HotToastModule.forRoot()
  ],
  providers: [GameService]
})
export class GameModule { }
