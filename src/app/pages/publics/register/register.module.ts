import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterPage } from './register.page';
import { IonicModule } from '@ionic/angular';
import { LogoComponentModule } from 'src/app/commons/components/logo/logo.module';

@NgModule({
  declarations: [
    RegisterPage,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: RegisterPage,
      },
    ]),
    FormsModule,
    ReactiveFormsModule,
    LogoComponentModule,
  ],
})
export class RegisterPageModule { }
