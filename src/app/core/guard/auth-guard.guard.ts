import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserRole } from '../model/enum-front';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private tokenService: TokenService, private readonly router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const requiredRoles = route.data['roles'];

    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    }

    let access: boolean = false;

    requiredRoles.forEach((role) => {
      if (this.tokenService.getUserRole().includes(role)) {
        access = true;
      }
    })

    if (!access) {
      this.roleBasedNavigator();
    }

    return access;
  }

  private roleBasedNavigator() {
    if (this.tokenService.getUserRole().length == 1 && this.tokenService.getUserRole().includes(UserRole.USER)) {
      this.router.navigate(['game'])
    } else {
      this.router.navigate(['admin'])
    }
  }

}
