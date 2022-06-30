import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { v4 as uuid } from 'uuid';
import { Link } from '../model/model-front';
@Injectable()
export class LinkService {

  private readonly baseUrl = `${environment.baseUrl}/api/v1/link`;

  constructor(private httpClient: HttpClient) { }

  public getLinksByGameId(id: typeof uuid): Observable<Link[]> {
    return this.httpClient.get<Link[]>(`${this.baseUrl}/${id}`,);
  }

}
