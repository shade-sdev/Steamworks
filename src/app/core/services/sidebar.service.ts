import { Injectable } from '@angular/core';
import { SidebarItem } from '../model/model-front';

@Injectable()
export class SidebarService {

  constructor() { }

  public getSidebarItems(): SidebarItem[] {
    return [
      {
        icon: 'menu',
        label: 'View Games',
        url: '/admin/view-game',
        roles: ['ADMIN', 'USER']
      }
    ]
  }
}
