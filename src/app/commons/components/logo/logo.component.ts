import { Component, OnInit } from '@angular/core';
import { LogoService } from 'src/app/commons/services/logo.service';


@Component({
  selector: 'app-logo-component',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  logo: string = '';

  constructor(
    private logoService: LogoService,
  ) { }

  ngOnInit(): void {
    this.getLogo();
  }

  async getLogo(): Promise<void> {
    this.logo = await this.logoService.get();
  }
}
