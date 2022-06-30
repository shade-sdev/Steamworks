import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { v4 as uuid } from 'uuid';
import { Link } from '../model/model-front';
import { LinkBack } from '../model/model-back';
@Injectable()
export class LinkService {

  private readonly baseUrl = `${environment.baseUrl}/api/v1/link`;

  constructor(private httpClient: HttpClient) { }

  public getLinksByGameId(id: typeof uuid): Observable<Link[]> {
    return this.httpClient.get<Link[]>(`${this.baseUrl}/${id}`,);
  }

  public getLinkById(id: typeof uuid): Observable<Link> {
    return this.httpClient.get<Link>(`${this.baseUrl}/get/${id}`,);
  }

  public deleteLinkById(id: typeof uuid): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`,);
  }

  public createLink(link: Link): Observable<LinkBack> {
    return this.httpClient.post<LinkBack>(`${this.baseUrl}`, link);
  }

  public updateLink(id: typeof uuid, link: LinkBack): Observable<LinkBack> {
    return this.httpClient.put<LinkBack>(`${this.baseUrl}/${id}`, link);
  }
}
