import { NgModule } from "@angular/core";
import { RatingComponent } from "./rating.component";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";


@NgModule({
  declarations: [
    RatingComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    RatingComponent,
  ]
})
export class RatingModule { }
