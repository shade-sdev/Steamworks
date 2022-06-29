import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { LinkType } from 'src/app/core/model/enum-front';
import { GameFull, Page } from 'src/app/core/model/model-front';
import { GameService } from 'src/app/core/services/game.service';
import { TokenService } from 'src/app/core/services/token.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(private gameService: GameService, private toast: HotToastService, public tokenService: TokenService) { }

  public currentPage: number = 0;
  public games: GameFull[] = [];
  public roles: string[] = this.tokenService.getUserRole();
  public showProfileMenu: boolean = false;

  public get linkType(): typeof LinkType {
    return LinkType;
  }

  public getKey(value: LinkType) {
    return Object.keys(LinkType)[Object.values(LinkType).indexOf(value)]
  }

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

  public logout() {
    this.tokenService.signOut();
    window.location.href = environment.discordTokenUrl;
  }

  public showProfileOptions() {
    this.showProfileMenu = this.showProfileMenu == true ? false : true;
  }

}
