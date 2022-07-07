import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HotToastService } from '@ngneat/hot-toast';
import { Genre, LinkType } from 'src/app/core/model/enum-front';
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

  constructor(private gameService: GameService, private toast: HotToastService, public tokenService: TokenService, private domSanitizer: DomSanitizer) { }

  public currentPage: number = -1;
  public games: GameFull[] = [];
  public roles: string[] = this.tokenService.getUserRole();

  public get linkType(): typeof LinkType {
    return LinkType;
  }

  public getKey(value: LinkType) {
    return Object.keys(LinkType)[Object.values(LinkType).indexOf(value)]
  }

  public getGenreValue(value: string) {
    return Object.values(Genre)[Object.keys(Genre).indexOf(value)];
  }

  ngOnInit(): void {
    this.getGamesByPage();
  }

  public getGamesByPage() {
    this.currentPage = this.currentPage + 1;
    const params = {
      page: this.currentPage
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

  public transform(url: string) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
