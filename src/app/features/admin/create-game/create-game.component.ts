import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Genre } from 'src/app/core/model/enum-front';
import { Game, Steam } from 'src/app/core/model/model-back';
import { GameService } from 'src/app/core/services/game.service';
import { SteamService } from 'src/app/core/services/steam.service';
import { v4 as uuid } from 'uuid';
@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {

  private create: boolean = true;
  public genres: string[] = Object.keys(Genre);
  public gameForm: FormGroup;
  public steamGames: Steam[] = [];
  public formTitle: string | undefined;
  public buttonLabel: string | undefined;
  public gameId?: typeof uuid;

  constructor(private formBuilder: FormBuilder, private steamService: SteamService, private gameService: GameService, private toast: HotToastService, private route: ActivatedRoute,) {
    this.gameForm = this.formBuilder.group({
      game: [''],
      genre: ['ACTION']
    })
  }

  ngOnInit(): void {
    this.checkForCreateOrUpdate();
    this.setLabels();
  }

  public getEnumValue(key: string): string {
    if ((<any>Object).keys(Genre).includes(key)) {
      return Object.values(Genre)[Object.keys(Genre).indexOf(key)];
    }
    return '';
  }

  private setLabels() {
    this.formTitle = this.create ? 'Create Game' : 'Update Game';
  }

  public submitForm() {
    if (this.create) {
      this.gameService.createGame(this.getGameObject()).pipe(
        this.toast.observe(
          {
            loading: 'Saving...',
            success: 'Saved',
            error: 'Saving failed',

          })
      )
        .subscribe();

    } else {
      this.gameService.updateGame(this.getGameObject(), this.gameId!).pipe(
        this.toast.observe(
          {
            loading: 'Saving...',
            success: 'Saved',
            error: 'Saving failed',

          })
      )
        .subscribe();

    }
  }

  private getGameObject(): Game {
    let game: Game = new Game();
    game.name = this.steamGames.find(x => x.appid == this.gameForm.controls['game'].value)!.name;
    game.steamId = this.gameForm.controls['game'].value;
    game.genre = this.gameForm.controls['genre'].value;
    return game;
  }

  public searchSteam(event: KeyboardEvent, searchPhrase: any) {
    const params = {
      search: searchPhrase['searchTerm']
    };
    if (event.key == 'Enter') {
      this.steamService.searchSteam(params).pipe(
        this.toast.observe(
          {
            loading: 'Search...',
            success: 'Searched',
            error: 'Searching failed',

          })
      ).subscribe((steamGames: Steam[]) => {
        this.steamGames = steamGames;
      })
    }
  }

  private checkForCreateOrUpdate() {
    this.route.params.subscribe((route) => {
      if (route['id'] == null) {
        this.create = true;
      } else {
        this.gameId = route['id'];
        this.create = false;
        this.gameService.getGameById(this.gameId!).subscribe((game: Game) => {
          const steam = {} as Steam;
          steam.appid = game.steamId;
          steam.name = game.name;
          let sg: Steam[] = []
          sg.push(steam)
          this.steamGames = sg;
          this.gameForm.patchValue({
            game: steam.appid,
            genre: game.genre
          })
        })
      }
    });
  }
}
