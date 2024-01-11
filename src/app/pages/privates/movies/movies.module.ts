import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MovieModule } from 'src/app/commons/components/movie/movie.module';
import { MoviesPage } from './movies.page';
import { MovieFormPage } from './movie-form/movie-form.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from 'src/app/commons/components/rating/rating.module';
import { MoviesService } from 'src/app/commons/services/movie.service';
import { ImageInputModule } from 'src/app/commons/components/image-input/image-input.module';
import { DateFormatPipe } from 'src/app/commons/pipes/date-format.pipe';


@NgModule({
  declarations: [
    MoviesPage,
    MovieFormPage,
    DateFormatPipe,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: MoviesPage,
      },
      {
        path: 'new',
        component: MovieFormPage,
      },
      {
        path: ':id',
        component: MovieFormPage,
      },
    ]),
    RouterModule,
    MovieModule,
    ReactiveFormsModule,
    RatingModule,
    FormsModule,
    ImageInputModule,
  ],
  exports: [],
  providers: [
    MoviesService,
  ]
})
export class MoviesPageModule { }
