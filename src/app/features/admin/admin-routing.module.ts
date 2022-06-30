import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { ViewGameComponent } from './view-game/view-game.component';
import { ViewLinkComponent } from './view-link/view-link.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      { path: 'view-game', component: ViewGameComponent },
      { path: 'create-game', component: CreateGameComponent },
      { path: 'update-game/:id', component: CreateGameComponent },
      { path: 'view-link/:id', component: ViewLinkComponent },
      {
        path: '',
        redirectTo: 'view-game',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
