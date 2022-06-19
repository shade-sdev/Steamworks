import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsModule } from './heroicon/icon/icon.module';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarService } from '../core/services/sidebar.service';
import { RouterModule } from '@angular/router';

const reusables = [HeaderComponent, SidebarComponent]

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
  providers: [SidebarService]
})
export class SharedModule { }
