import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/commons/services/auth.service';
import { LogoService } from 'src/app/commons/services/logo.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  logo: string = '';
  public appPages = [
    { title: 'Movies', url: '/user/movies', icon: 'videocam-outline' },
  ];

  constructor(
    private router: Router,
    private menuController: MenuController,
    private logoService: LogoService,
    private authService: AuthService,
  ) { }

  ionViewWillEnter(): void {
    this.init();
  }

  async init(): Promise<void> {
    this.logo = await this.logoService.get(); 
  }

  viewLogo() {
    this.router.navigate(['user', 'logo']);
    this.menuController.close();
  }

  async logout(): Promise<void> {
    await this.authService.setLoggedIn(false);
    this.router.navigate(['login']);
  }
}
