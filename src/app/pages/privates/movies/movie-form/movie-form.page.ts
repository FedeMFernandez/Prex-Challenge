import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieRequest, MoviesService } from '../../../../commons/services/movie.service';
import { AlertController } from '@ionic/angular';
import { ImageInputComponent } from 'src/app/commons/components/image-input/image-input.component';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/commons/services/notification.service';


@Component({
  selector: 'app-movie-form-page',
  templateUrl: './movie-form.page.html',
  styleUrls: ['./movie-form.page.scss']
})
export class MovieFormPage {

  @ViewChild('imageInput') imageInput!: ImageInputComponent;

  form!: FormGroup;

  titleControl: FormControl = new FormControl('', Validators.required);
  imageControl: FormControl = new FormControl('', Validators.required);
  synopsisControl: FormControl = new FormControl('', Validators.required);
  selectedFile: File | null = null;

  idParam!: number;
  movie: any = {};
  get movieImage(): string {
    return this.imageControl.value;
  }
  onEdition: boolean = false;

  get isEdition(): boolean {
    return this.idParam === undefined  || !!this.idParam && this.onEdition;
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private moviesService: MoviesService,
    private alertController: AlertController,
    private notificationService: NotificationService,
  ) {
    this.form = new FormGroup({
      title: this.titleControl,
      image: this.imageControl,
      synopsis: this.synopsisControl,
    });
  }

  ionViewWillEnter(): void {
    this.init();
  }

  init(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id === undefined) { return; }
    this.idParam = id;    
    this.getMovie(this.idParam);

    this.activatedRoute.queryParams.subscribe((queryParams) => {
      const edition = queryParams['edition'];
      this.onEdition = edition === 'true';
    });
  }

  async submitEventHandler(form: any): Promise<void> {
    form.file = this.selectedFile;
    if (this.idParam !== undefined ) {
      await this.handleEdition(form)
    } else {
      await this.handleAddition(form);
    }
    this.imageInput.reset();
    this.selectedFile = null;
  }

  async handleAddition(request: MovieRequest): Promise<void> {
    try {
      const id = await this.moviesService.save(request);
      this.notificationService.show('Movie saved', 'success');
      this.router.navigate(['user', 'movies', id]);
      this.idParam = id;
      this.getMovie(id);
    }
    catch (error: any) {
      this.notificationService.show(error.message, 'error');
    }
  }

  async handleEdition(request: MovieRequest): Promise<void> {
    try {
      const id = await this.moviesService.update(this.idParam, request);
      this.notificationService.show('Movie edited', 'success');
      this.router.navigate(['user', 'movies', this.idParam], {
        queryParams: {
          edition: true,
        }
      });
      this.idParam = id;
      this.getMovie(id);
    }
    catch (error: any) {
      this.notificationService.show(error.message, 'error');
    }
  }

  async getMovie(id: number) {
    try {
      this.movie = await this.moviesService.getOne(id);
      this.titleControl.setValue(this.movie.title);
      this.synopsisControl.setValue(this.movie.synopsis);
      this.imageControl.setValue(this.movie.image);
    } catch (error: any) {
      this.notificationService.show(error.message, 'error');
    }
  }

  async onStatClickedEvent(id: number, event: number): Promise<void> {
    try {
      await this.moviesService.rate(id, event);
      this.movie.stars = event;
    } catch (error: any) {
      this.notificationService.show(error.message, 'error');
    }
  }

  async deleteMovie() {
    try {
      const confirmDeletion = await this.confirmDeletion();
      if (!confirmDeletion) {
        return;
      }
      this.movie = await this.moviesService.delete(this.idParam);
      this.notificationService.show('Movie deleted', 'success');
      this.router.navigate(['user', 'movies']);
    } catch (error: any) {
      this.notificationService.show(error.message, 'error');
    }
  }

  async confirmDeletion(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const confirm = await this.alertController.create({
        header: 'Warning',
        message: 'Do you want to delete this movie?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              return resolve(true);
            },
          },
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              return resolve(false);
            },
          },
        ],
      });
      await confirm.present();
    });
  }

  async onImageChangedEventHandler(event: File | null): Promise<void> {
    this.selectedFile = event;
    this.imageControl.setValue((event as File).name);
  }
}
