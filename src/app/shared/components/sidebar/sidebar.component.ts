import { Component } from '@angular/core';
import { SidebarItem } from 'src/app/core/model/model-front';
import { SidebarService } from 'src/app/core/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  public sidebarItems: SidebarItem[];

  constructor(private readonly sidebarService: SidebarService) {
    this.sidebarItems = this.sidebarService.getSidebarItems();
  }
}
