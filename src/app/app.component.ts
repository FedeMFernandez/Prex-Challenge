import { Platform } from '@ionic/angular';
import { NotificationService } from './commons/services/notification.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NotificationBoxComponent } from './commons/components/notification-box/notification-box.component';
import { Subscription } from 'rxjs';
import { AuthService } from './commons/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('notification') notification!: NotificationBoxComponent;
  notificationSubscription: Subscription = new Subscription();
  timeout!: any;

  constructor(
    private notificationService: NotificationService,
    private platform: Platform,
    private authService: AuthService,
    private router: Router,
  ) {
    this.initializeApp();
  }

  ngOnInit(): void {
    this.listenNotifications();
  }

  ngOnDestroy(): void {
    if (!this.notificationSubscription.closed) {
      this.notificationSubscription.unsubscribe();
    }
  }

  initializeApp(): void {
    this.platform.ready().then(async () => {
      const isLogged = await this.authService.getLoggedIn();
      if (isLogged) {
        this.router.navigate(['user', 'movies']);
        return;
      }
    });
  }

  listenNotifications(): void {
    this.notificationService.getNotification().subscribe(async (notification) => {
      await this.showNotification(notification.message, notification.mode);
    })
  }

  async showNotification(message: string, mode: 'success' | 'warning' | 'error'): Promise<void> {
    if (!!this.timeout) {
      clearTimeout(this.timeout);
    }

    await this.notification.show(message, mode);
    this.timeout = setTimeout(async () => {
      await this.notification.hide();
    }, 3000);
  }
}
