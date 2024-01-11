import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ForgotPasswordPage } from './forgot-password.page';
import { IonicModule } from '@ionic/angular';
import { LogoComponentModule } from 'src/app/commons/components/logo/logo.module';


@NgModule({
  declarations: [
    ForgotPasswordPage,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ForgotPasswordPage,
      },
    ]),
    FormsModule,
    ReactiveFormsModule,
    LogoComponentModule,
  ],
})
export class ForgotPasswordPageModule { }
