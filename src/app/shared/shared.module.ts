import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsModule } from './heroicon/icon/icon.module';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarService } from '../core/services/sidebar.service';
import { RouterModule } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { TokenService } from '../core/services/token.service';
import { ProfileIconComponent } from './components/profile-icon/profile-icon.component';

const reusables = [HeaderComponent, SidebarComponent, TableComponent, ProfileIconComponent]

@NgModule({
  declarations: [
    reusables
  ],
  imports: [
    CommonModule,
    IconsModule,
    RouterModule
  ],
  exports: [reusables],
  providers: [SidebarService, TokenService]
})
export class SharedModule { }
