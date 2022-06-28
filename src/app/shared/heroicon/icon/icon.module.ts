import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  annotation,
  menu,
  chartPie,
  users,
  login,
  plus,
  pencil,
  table,
  creditCard,
  x,
  clipboard,
  trash,
  exclamation,
  arrowNarrowLeft,
  arrowNarrowRight,
  academicCap,
  truck,
  arrowsExpand,
  userGroup,
  menuAlt1,
  identification,
  HeroIconModule,
  eye,
  logout,
  arrowCircleDown
} from 'ng-heroicon';

const selectedHeroIcons = {
  annotation,
  menu,
  chartPie,
  users,
  login,
  table,
  creditCard,
  clipboard,
  plus,
  pencil,
  x,
  trash,
  exclamation,
  arrowNarrowLeft,
  arrowNarrowRight,
  academicCap,
  truck,
  arrowsExpand,
  userGroup,
  menuAlt1,
  identification,
  eye,
  logout,
  arrowCircleDown
};

@NgModule({
  declarations: [],
  imports: [CommonModule, HeroIconModule.withIcons(selectedHeroIcons)],
  exports: [HeroIconModule]
})
export class IconsModule { }
