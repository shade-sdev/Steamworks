import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Game } from '../model/model-back';
import { GameFull, GameResponse, Page } from '../model/model-front';

@Injectable()
export class GameService {

  private readonly baseUrl = `${environment.baseUrl}/api/v1/game`;

  constructor(private httpClient: HttpClient) { }

  public createGame(game: Game): Observable<Game> {
    return this.httpClient.post<Game>(`${this.baseUrl}`, game);
  }

  public getGamesBypage(param: Params): Observable<Page<Game[]>> {
    return this.httpClient.get<Page<Game[]>>(`${this.baseUrl}`, { params: param });
  }

  public getGamesFullBypage(param: Params): Observable<Page<GameFull[]>> {
    return this.httpClient.get<Page<GameFull[]>>(`${this.baseUrl}`, { params: param });
  }

}
