import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './core/guard/auth-guard.guard';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuardGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'game',
    loadChildren: () => import('./features/game/game.module').then(m => m.GameModule),
    canActivate: [AuthGuardGuard],
    data: { roles: ['ADMIN', 'USER'] }
  },
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
