import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Genre } from 'src/app/core/model/enum-front';
import { Game, Steam } from 'src/app/core/model/model-back';
import { GameService } from 'src/app/core/services/game.service';
import { SteamService } from 'src/app/core/services/steam.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {

  public genres: string[] = Object.keys(Genre);
  public gameForm: FormGroup;
  public steamGames: Steam[] = [];

  constructor(private formBuilder: FormBuilder, private steamService: SteamService, private gameService: GameService) {
    this.gameForm = this.formBuilder.group({
      game: [''],
      genre: ['ACTION']
    })
  }

  ngOnInit(): void {
  }

  public getEnumValue(key: string): string {
    if ((<any>Object).keys(Genre).includes(key)) {
      return Object.values(Genre)[Object.keys(Genre).indexOf(key)];
    }
    return '';
  }

  public submitForm() {
    let game: Game = new Game();
    game.name = this.steamGames.find(x => x.appid == this.gameForm.controls['game'].value)!.name;
    game.steamId = this.gameForm.controls['game'].value;
    game.genre = this.gameForm.controls['genre'].value;
    this.gameService.createGame(game).subscribe();

  }

  public searchSteam(event: KeyboardEvent, searchPhrase: any) {
    const params = {
      search: searchPhrase['searchTerm']
    };
    if (event.key == 'Enter') {
      this.steamService.searchSteam(params).subscribe((steamGames: Steam[]) => {
        this.steamGames = steamGames;
      })
    }
  }
}
