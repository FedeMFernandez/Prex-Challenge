import { IonicModule } from '@ionic/angular';
import { Component, ViewChild } from '@angular/core';
import { ImageInputComponent } from 'src/app/commons/components/image-input/image-input.component';
import { LogoService } from 'src/app/commons/services/logo.service';
import { SafeResourceUrl } from '@angular/platform-browser';
import { NotificationService } from 'src/app/commons/services/notification.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {

  @ViewChild('imageInput') imageInput!: ImageInputComponent;

  selectedFile!: File | null;
  image: string = 'https://fakeimg.pl/250x100/';

  constructor(
    private logoService: LogoService,
    private notificationService: NotificationService,
  ) { }

  ionViewWillEnter(): void {
    this.getLogo();
  }

  async getLogo(): Promise<void> {
    this.image = await this.logoService.get();
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
