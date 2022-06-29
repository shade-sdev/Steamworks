import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/core/services/token.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public tokenService: TokenService) { }

  public showProfileMenu: boolean = false;

  public roles: string[] = this.tokenService.getUserRole();

  ngOnInit(): void {
  }

  public showProfileOptions() {
    this.showProfileMenu = this.showProfileMenu == true ? false : true;
  }

  public logout() {
    this.tokenService.signOut();
    window.location.href = environment.discordTokenUrl;
  }

}
