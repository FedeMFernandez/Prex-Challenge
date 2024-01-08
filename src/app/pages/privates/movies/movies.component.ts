
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { MovieRequest, MoviesService } from 'src/app/commons/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent {

  movies: any[] = [];
  filter: string = '';
  enabledSearchInput: boolean = false;
  backButtonSubscription: Subscription = new Subscription();

  get renderedMovies(): any[] {
    if (this.filter) {
      return this.movies.filter(movie => movie.title.toLowerCase().includes(this.filter.toLowerCase()));
    }
    return this.movies;
  }

  constructor(
    private router: Router,
    private moviesService: MoviesService,
    private platform: Platform,
  ) { }

  ionViewDidLeave(): void {
    if (!this.backButtonSubscription.closed) {
      this.backButtonSubscription.unsubscribe();
    }
  }

  ionViewWillEnter(): void {
    this.platform.backButton.subscribeWithPriority(10, async () => {
      await App.exitApp();
    });
    this.init()
  }

  async init(): Promise<void> {
    this.movies = await this.moviesService.getAll();
  }

  viewMovie(id: number): void {
    this.router.navigate(['user', 'movies', id]);
  }

  addMovie(): void {
    this.router.navigate(['user', 'movies', 'new']);
  }

  editMovie(id: number): void {
    this.router.navigate(['user', 'movies', id], {
      queryParams: {
        edition: true,
      }
    });
  }

  async onStatClickedEvent(id: number, event: number): Promise<void> {
    await this.moviesService.rate(id, event);
    this.movies[id].stars = event;
  }

  resetFilter() {
    this.filter = '';
  }
}