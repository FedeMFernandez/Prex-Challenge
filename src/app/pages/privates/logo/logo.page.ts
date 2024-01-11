import { Platform } from '@ionic/angular';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ImageInputComponent } from 'src/app/commons/components/image-input/image-input.component';
import { LogoService } from 'src/app/commons/services/logo.service';
import { NotificationService } from 'src/app/commons/services/notification.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logo-page',
  templateUrl: './logo.page.html',
  styleUrls: ['./logo.page.scss']
})
export class LogoPage implements OnInit, OnDestroy {

  @ViewChild('imageInput') imageInput!: ImageInputComponent;
  backButtonSubscription: Subscription = new Subscription();

  selectedFile!: File | null;
  logo: string = '';

  constructor(
    private logoService: LogoService,
    private notificationService: NotificationService,
    private platform: Platform,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.platform.backButton.subscribeWithPriority(10, async () => {
      this.router.navigate(['user', 'movies']);
    });
  }

  ngOnDestroy(): void {
    if (!this.backButtonSubscription.closed) {
      this.backButtonSubscription.unsubscribe();
    }
  }

  ionViewWillEnter(): void {
    this.getLogo();
  }

  async getLogo(): Promise<void> {
    this.logo = await this.logoService.get();
  }

  async submitEventHandler(): Promise<void> {
    try {
      await this.logoService.saveImage(this.selectedFile as File);
      this.imageInput.reset();
      this.selectedFile = null;
      this.getLogo();
      this.notificationService.show('Logo image changed', 'success');
    } catch (error: any) {
      this.notificationService.show(error.message, 'error');
    }
  }

  async onImageChangedEventHandler(event: File | null): Promise<void> {
    this.selectedFile = event;
  }
}
