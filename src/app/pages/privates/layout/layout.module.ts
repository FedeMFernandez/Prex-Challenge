import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutPage } from './layout.page';
import { IonicModule } from '@ionic/angular';
import { LogoComponentModule } from 'src/app/commons/components/logo/logo.module';


@NgModule({
  declarations: [
    LayoutPage
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    LogoComponentModule,
  ],
  providers: []
})
export class LayoutPageModule { }
