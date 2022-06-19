import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Game } from '../model/model-back';

@Injectable()
export class GameService {

  private readonly baseUrl = `${environment.baseUrl}/api/v1/game`;

  constructor(private httpClient: HttpClient) { }

  public createGame(game: Game): Observable<Game> {
    return this.httpClient.post<Game>(`${this.baseUrl}`, game);
  }

}
