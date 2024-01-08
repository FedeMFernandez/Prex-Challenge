import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from 'src/app/commons/components/rating/rating.module';
import { LogoComponent } from './logo.component';
import { ImageInputModule } from 'src/app/commons/components/image-input/image-input.module';
import { LogoService } from 'src/app/commons/services/logo.service';

@NgModule({
  declarations: [
    LogoComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: LogoComponent,
      },
    ]),
    RouterModule,
    ReactiveFormsModule,
    RatingModule,
    FormsModule,
    ImageInputModule,
  ],
})
export class LogoModule { }
