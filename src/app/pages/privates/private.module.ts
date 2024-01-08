import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LayoutModule } from "./layout/layout.module";
import { PrivateRoutingModule } from './private-routing.module';
import { DateFormatPipe } from "src/app/commons/pipes/date-format.pipe";



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    LayoutModule,
  ],
  providers: [],
})
export class PrivateModule { }
