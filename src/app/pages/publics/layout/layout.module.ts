import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
  ],
  providers: []
})
export class LayoutModule { }
