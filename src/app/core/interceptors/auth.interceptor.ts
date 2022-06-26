import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from '../services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let req = request;
    const token = this.tokenService.getToken();

    if (req.url.includes('/token')) {
      return next.handle(req);
    }

    if (token) {
      req = this.addTokenHeader(req, token);
    }

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401 || err.status === 400) {
          this.tokenService.signOut();
          window.location.href = environment.discordTokenUrl
        }
        return throwError(() => err);
      })
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: { Authorization: token },
    });
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];