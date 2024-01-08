import { NgModule } from "@angular/core";
import { MovieComponent } from "./movie.component";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { RatingModule } from "../rating/rating.module";


@NgModule({
  declarations: [
    MovieComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RatingModule,
  ],
  exports: [
    MovieComponent,
  ]
})
export class MovieModule { }
