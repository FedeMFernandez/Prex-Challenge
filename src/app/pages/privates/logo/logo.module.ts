import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from 'src/app/commons/components/rating/rating.module';
import { LogoPage } from './logo.page';
import { ImageInputModule } from 'src/app/commons/components/image-input/image-input.module';


@NgModule({
  declarations: [
    LogoPage,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: LogoPage,
      },
    ]),
    RouterModule,
    ReactiveFormsModule,
    RatingModule,
    FormsModule,
    ImageInputModule,
  ],
})
export class LogoPageModule { }
