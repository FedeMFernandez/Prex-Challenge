import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, RecoverPasswordRequest } from 'src/app/commons/services/auth.service';
import { NotificationService } from 'src/app/commons/services/notification.service';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss']
})
export class ForgotPasswordPage implements OnInit, OnDestroy {

  backButtonSubscription: Subscription = new Subscription();

  form: FormGroup;

  usernameControl: FormControl = new FormControl('', Validators.required);

  constructor(
    private router: Router,
    private authService: AuthService,
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
