import { AnimationController } from '@ionic/angular';
import { Component, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';
import { ColorMode } from '../../types/app.types';

@Component({
  selector: 'app-notification-box-component',
  templateUrl: './notification-box.component.html',
  styleUrls: ['./notification-box.component.scss']
})
export class NotificationBoxComponent {

  @ViewChild('notification') elementRef!: ElementRef<HTMLDivElement>;
  @HostBinding('style.display') display!: string;

  message: string = 'Something went wrong';
  mode: ColorMode = 'success';
  COLORS: any = {
    success: {
      'background-color': 'var(--ion-color-success)',
      'color': 'var(--ion-color-dark-contrast)',
    },
    warning: {
      'background-color': 'var(--ion-color-warning)',
      'color': 'var(--ion-color-dark-contrast)',
    },
    error: {
      'background-color': 'var(--ion-color-danger)',
      'color': 'var(--ion-color-light)',
    },
  }

  constructor(
    private animationController: AnimationController
  ) { }

  async show(message: string, mode: ColorMode): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.display = 'block';
      this.message = message;
      this.mode = mode;

      await this.animationController
        .create()
        .addElement(this.elementRef?.nativeElement)
        .duration(200)
        .iterations(1)
        .fromTo('transform', 'translateY(0px)', 'translateY(100px)')
        .play()

      resolve();
    })
  }

  async hide(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await this.animationController
        .create()
        .addElement(this.elementRef?.nativeElement)
        .duration(200)
        .iterations(1)
        .fromTo('transform', 'translateY(100px)', 'translateY(0px)')
        .play();

      this.display = 'none';
      resolve();
    })
  }
}
