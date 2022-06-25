import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccessToken } from '../model/model-back';
import { TokenService } from './token.service';

@Injectable()
export class AuthenticationService {

  private readonly baseUrl = `${environment.baseUrl}/api/v1/auth`;

  constructor(private httpClient: HttpClient, private router: Router, private jwtService: JwtHelperService) { }

  public authenticate(tokenService: TokenService): void {
    if (!tokenService.getToken()) {
      let params = new URLSearchParams(window.location.search);
      let someParam = params.get('code');
      if (someParam != null) {
        const parameters = { code: someParam };
        this.getAccessToken(parameters).subscribe({
          next: (accessToken: AccessToken) => {
            tokenService.saveToken(accessToken.accessToken);
            this.setUserData(tokenService);
          },
          error: (err: HttpErrorResponse) => {
            window.location.href = environment.discordTokenUrl
          },
          complete: () => {
            this.router.navigate(['admin'])
          }
        })
      } else {
        window.location.href = environment.discordTokenUrl
      }
    }
  }

  public getAccessToken(param: Params): Observable<AccessToken> {
    return this.httpClient.get<AccessToken>(`${this.baseUrl}/token`, { params: param });
  }

  private setUserData(tokenService: TokenService) {
    const token: string = tokenService.getToken()!;
    const userRoles: string[] = this.jwtService.decodeToken(token)['roles'];
    const userName: string = this.jwtService.decodeToken(token)['sub'];
    tokenService.saveUserRole(userRoles);
    tokenService.saveUserName(userName);
  }
}
