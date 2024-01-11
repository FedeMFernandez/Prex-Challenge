import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginPage } from './login.page';
import { IonicModule } from '@ionic/angular';
import { LogoComponentModule } from 'src/app/commons/components/logo/logo.module';


@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginPage,
      },
    ]),
    FormsModule,
    ReactiveFormsModule,
    LogoComponentModule,
  ],
})
export class LoginPageModule { }
