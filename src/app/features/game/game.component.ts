import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { GameFull, Page } from 'src/app/core/model/model-front';
import { GameService } from 'src/app/core/services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(private gameService: GameService, private toast: HotToastService) { }

  public currentPage: number = 0;
  public games: GameFull[] = [];

  ngOnInit(): void {
    this.getGamesByPage(this.currentPage);
  }

  public getGamesByPage(page: number) {
    const params = {
      page: page
    };

    this.gameService.getGamesFullBypage(params).pipe(
      this.toast.observe(
        {
          loading: 'Loading games...',
          success: 'Games loaded',
          error: 'Loading games failed',

        }
      )
    )
      .subscribe((games: Page<GameFull[]>) => {
        const gamesToAdd: GameFull[] = games.content;
        gamesToAdd.forEach((game: GameFull) => {
          this.games.push(game);
        })
      });
  }

}
