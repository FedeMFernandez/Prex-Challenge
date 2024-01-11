import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPage } from './layout/layout.page';

const routes: Routes = [
  {
    path: '',
    component: LayoutPage,
    children: [
      {
        path: 'movies',
        loadChildren: () => import('./movies/movies.module').then(module => module.MoviesPageModule),
      },
      {
        path: 'logo',
        loadChildren: () => import('./logo/logo.module').then(module => module.LogoPageModule),
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
