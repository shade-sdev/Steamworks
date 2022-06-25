import { Component } from '@angular/core';
import { AuthenticationService } from './core/services/authentication.service';
import { TokenService } from './core/services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private tokenService: TokenService, private authService: AuthenticationService) {
    this.authService.authenticate(this.tokenService);
  }
  title = 'Steamworks';
}
