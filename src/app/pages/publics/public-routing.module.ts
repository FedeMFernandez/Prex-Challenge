import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(module => module.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(module => module.RegisterPageModule),
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then(module => module.ForgotPasswordPageModule),
  },
  {
    path: '**',
    redirectTo: 'login',
  }
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
