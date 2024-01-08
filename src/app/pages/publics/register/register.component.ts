import { Platform } from '@ionic/angular';
import { LogoService } from 'src/app/commons/services/logo.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, RegisterRequest } from 'src/app/commons/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  logo: string = '';
  viewPassword: boolean = false;
  backButtonSubscription: Subscription = new Subscription();

  form: FormGroup;

  usernameControl: FormControl = new FormControl('', Validators.required);
  emailControl: FormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl: FormControl = new FormControl('', Validators.required);

  constructor(
    private router: Router,
    private authService: AuthService,
    private logoService: LogoService,
    private platform: Platform
    // private NotificationService: NotificationService,
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

  ionViewWillEnter(): void {
    this.init();
  }

  async init(): Promise<void> {
    this.logo = await this.logoService.get();
  }

  async submitEventHandler(form: RegisterRequest): Promise<void> {
    try {
      await this.authService.register(form);
      await this.authService.setLoggedIn(true);
      this.router.navigate(['user']);
    }
    catch (error: any) {
      // this.NotificationService.show(error.message, 'error');
    }
  }
}
