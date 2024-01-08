import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from 'src/app/commons/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'movies',
        loadChildren: () => import('./movies/movies.module').then(module => module.MoviesModule),
      },
      {
        path: 'logo',
        loadChildren: () => import('./logo/logo.module').then(module => module.LogoModule),
      },
      {
        path: '**',
        redirectTo: 'movies',
      }
    ],
  },
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
