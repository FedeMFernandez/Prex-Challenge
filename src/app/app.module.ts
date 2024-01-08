import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './commons/services/auth.service';
import { NotificationService } from './commons/services/notification.service';
import { NotificationBoxComponent } from './commons/components/notification-box/notification-box.component';
import { LogoService } from './commons/services/logo.service';
import { StorageService } from './commons/services/storage.service';


@NgModule({
  declarations: [
    AppComponent,
    NotificationBoxComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService,
    NotificationService,
    LogoService,
    Platform,
    StorageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
