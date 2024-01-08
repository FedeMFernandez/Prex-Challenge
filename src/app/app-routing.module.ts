import { AuthGuard } from './commons/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./pages/privates/private.module').then(module => module.PrivateModule),
    canActivateChild: [AuthGuard],
  },
  {
    path: '',
    loadChildren: () => import('./pages/publics/public.module').then(module => module.PublicModule),
  },
  {
    path: '**',
    redirectTo: '',
  }
  
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
