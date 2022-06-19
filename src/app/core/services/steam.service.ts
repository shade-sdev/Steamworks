import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Steam } from '../model/model-back';

@Injectable()
export class SteamService {
  private readonly baseUrl = `${environment.baseUrl}/api/v1/steam`;

  constructor(private httpClient: HttpClient) { }

  public searchSteam(param: Params): Observable<Steam[]> {
    return this.httpClient.get<Steam[]>(`${this.baseUrl}`, { params: param });
  }

}
