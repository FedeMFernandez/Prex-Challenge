import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { AuthService } from 'src/app/commons/services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    PublicRoutingModule,
  ],
  providers: [
    AuthService,
  ],
})
export class PublicModule { }
