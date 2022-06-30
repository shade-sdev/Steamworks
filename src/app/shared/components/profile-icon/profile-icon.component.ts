import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/core/services/token.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-icon',
  templateUrl: './profile-icon.component.html',
  styleUrls: ['./profile-icon.component.css']
})
export class ProfileIconComponent implements OnInit {

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
