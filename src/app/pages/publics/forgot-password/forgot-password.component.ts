import { LogoService } from 'src/app/commons/services/logo.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationBoxComponent } from 'src/app/commons/components/notification-box/notification-box.component';
import { AuthService, RecoverPasswordRequest } from 'src/app/commons/services/auth.service';
import { NotificationService } from 'src/app/commons/services/notification.service';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  logo: string = '';
  backButtonSubscription: Subscription = new Subscription();

  form: FormGroup;

  usernameControl: FormControl = new FormControl('', Validators.required);

  constructor(
    private router: Router,
    private authService: AuthService,
    private logoService: LogoService,
    private notificationService: NotificationService,
    private platform: Platform,
  ) {
    this.form = new FormGroup({
      username: this.usernameControl,
    });
  }

  ngOnInit(): void {
    this.platform.backButton.subscribeWithPriority(10, async () => {
      this.router.navigate(['login']);
    });
  }
  
  ngOnDestroy(): void {
    if (!this.backButtonSubscription.closed) {
      this.backButtonSubscription.unsubscribe();
    }
  }

  ionViewWillEnter(): void {
    this.init();
  }

  async init(): Promise<void> {
    this.logo = await this.logoService.get();
  }

  async submitEventHandler(form: RecoverPasswordRequest): Promise<void> {
    try {
      const message = await this.authService.recoverPassword(form);
      this.notificationService.show(message, 'success');
    }
    catch (error: any) {
      this.notificationService.show(error.message, 'error');
    }
  }
}
