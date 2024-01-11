import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { LogoComponent } from 'src/app/commons/components/logo/logo.component';
import { AuthService } from 'src/app/commons/services/auth.service';
import { LogoService } from 'src/app/commons/services/logo.service';


@Component({
  selector: 'app-layout-page',
  templateUrl: './layout.page.html',
  styleUrls: ['./layout.page.scss']
})
export class LayoutPage {

  @ViewChild('logoRef') logoRef!: LogoComponent;

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
    this.getLogo();
  }

  async getLogo(): Promise<void> {
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

  menuOpened(): void {
    this.logoRef.getLogo();
  }
}
