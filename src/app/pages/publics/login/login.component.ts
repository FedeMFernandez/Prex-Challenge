import { LogoService } from 'src/app/commons/services/logo.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginRequest } from 'src/app/commons/services/auth.service';
import { NotificationService } from 'src/app/commons/services/notification.service';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  logo: string = '';
  viewPassword: boolean = false;

  backButtonSubscription: Subscription = new Subscription();

  form: FormGroup;

  usernameControl: FormControl = new FormControl('', Validators.required);
  passwordControl: FormControl = new FormControl('', Validators.required);

  constructor(
    private router: Router,
    private authService: AuthService,
    private logoService: LogoService,
    private notificationService: NotificationService,
    private platform: Platform,
  ) {
    this.form = new FormGroup({
      username: this.usernameControl,
      password: this.passwordControl,
    });
  }

  ngOnInit(): void {
    this.platform.backButton.subscribeWithPriority(10, async () => {
      await App.exitApp();
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

  async submitEventHandler(form: LoginRequest): Promise<void> {
    try {
      await this.authService.login(form);
      await this.authService.setLoggedIn(true);
      this.router.navigate(['user']);
    }
    catch (error: any) {
      this.notificationService.show(error.message, 'error');
    }
  }
}
