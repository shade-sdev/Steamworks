import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsModule } from './heroicon/icon/icon.module';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

const reusables = [HeaderComponent, SidebarComponent]

@NgModule({
  declarations: [
    reusables
  ],
  imports: [
    CommonModule,
    IconsModule
  ],
  exports: [reusables]
})
export class SharedModule { }
