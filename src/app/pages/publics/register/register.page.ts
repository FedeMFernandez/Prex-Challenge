import { Platform } from '@ionic/angular';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, RegisterRequest } from 'src/app/commons/services/auth.service';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/commons/services/notification.service';


@Component({
  selector: 'app-register-page',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit, OnDestroy {

  viewPassword: boolean = false;
  backButtonSubscription: Subscription = new Subscription();

  form: FormGroup;

  usernameControl: FormControl = new FormControl('', Validators.required);
  emailControl: FormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl: FormControl = new FormControl('', Validators.required);

  constructor(
    private router: Router,
    private authService: AuthService,
    private platform: Platform,
    private notificationService: NotificationService,
  ) {
    this.form = new FormGroup({
      username: this.usernameControl,
      email: this.emailControl,
      password: this.passwordControl,
      repeatPassword: this.passwordControl,
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

  async submitEventHandler(form: RegisterRequest): Promise<void> {
    try {
      await this.authService.register(form);
      await this.authService.setLoggedIn(true);
      this.router.navigate(['user']);
    }
    catch (error: any) {
      this.notificationService.show(error.message, 'error');
    }
  }
}
