import { NgModule } from "@angular/core";
import { ImageInputComponent } from "./image-input.component";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";


@NgModule({
  declarations: [
    ImageInputComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    ImageInputComponent,
  ]
})
export class ImageInputModule { }
