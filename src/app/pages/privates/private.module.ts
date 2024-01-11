import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LayoutPageModule } from "./layout/layout.module";
import { PrivateRoutingModule } from './private-routing.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    LayoutPageModule,
  ],
  providers: [],
})
export class PrivateModule { }
