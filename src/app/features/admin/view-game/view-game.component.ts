import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { HeroIconName } from 'ng-heroicon';
import { Genre } from 'src/app/core/model/enum-front';
import { Game } from 'src/app/core/model/model-back';
import { GameResponse, Page, TableHeader } from 'src/app/core/model/model-front';
import { GameService } from 'src/app/core/services/game.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-view-game',
  templateUrl: './view-game.component.html',
  styleUrls: ['./view-game.component.css']
})
export class ViewGameComponent implements OnInit {

  public gameHeader!: TableHeader[];
  public games: GameResponse[] = [];
  public icon: HeroIconName = 'link'
  public currentPage: number = 0;
  public maxPage?: number;
  public tableOptions = {
    misc: {
      icon: this.icon,
      view: true
    },
    edit: true,
    delete: true
  }

  constructor(private gameService: GameService, private toast: HotToastService, private router: Router) { }

  ngOnInit(): void {
    this.setHeader();
    this.getGamesByPage(this.currentPage);
  }

  private setHeader(): void {
    this.gameHeader = [
      {
        displayLabel: 'Steam Id',
        key: 'steamId'
      },
      {
        displayLabel: 'Name',
        key: 'name'
      },
      {
        displayLabel: 'Genre',
        key: 'genre'
      }
    ];
  }

  private getGamesByPage(page: number) {
    const params = {
      page: page
    };

    this.gameService.getGamesBypage(params).pipe(
      this.toast.observe(
        {
          loading: 'Loading games...',
          success: 'Games loaded',
          error: 'Loading games failed',

        }
      )
    )
      .subscribe((games: Page<Game[]>) => {
        this.setTableBody(games);
      });
  }

  private setTableBody(games: Page<Game[]>) {
    const gamesResponse: Game[] = games.content;
    this.maxPage = games.totalPages;
    this.games = gamesResponse.map((game: Game) => {
      const gameItem = {} as GameResponse;
      gameItem.id = game.id!;
      gameItem.genre = Object.values(Genre)[Object.keys(Genre).indexOf(game.genre)];
      gameItem.name = game.name;
      gameItem.steamId = game.steamId;
      return gameItem;
    })
  }

  public update(id: typeof uuid) {
    this.router.navigate([`admin/update-game/${id}`]);
  }

  public delete(id: typeof uuid) {
    this.gameService.deleteGameById(id).pipe(
      this.toast.observe(
        {
          loading: 'Deleting game...',
          success: 'Game deleted',
          error: 'Deleting game failed',

        }
      )
    ).subscribe({
      complete: () => {
        this.games = this.games.filter(game => {
          return game.id !== id;
        });
      }
    })
  }

  public addGame() {
    this.router.navigate(['admin/create-game'])
  }

  public viewLink(id: typeof uuid) {
    this.router.navigate([`admin/view-link/${id}`]);
  }

  public nextPage() {
    if (this.currentPage != (this.maxPage! - 1)) {
      this.currentPage = this.currentPage + 1;
      this.getGamesByPage(this.currentPage);
    }
  }

  public previousPage() {
    if (this.currentPage != 0) {
      this.currentPage = this.currentPage - 1;
      this.getGamesByPage(this.currentPage);
    }
  }

}
