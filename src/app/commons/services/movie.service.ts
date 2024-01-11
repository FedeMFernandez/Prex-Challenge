import { Injectable } from "@angular/core";
import { Directory, Filesystem, WriteFileResult } from "@capacitor/filesystem";
import { readFileAsBase64 } from "../functions/encoding.functions";
import { Capacitor } from "@capacitor/core";
import { StorageService } from "./storage.service";
import { FileSystemService } from "./filesystem.service";


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(
    private storageService: StorageService,
    private fileSystemService: FileSystemService,
  ) { }

  async getAll(): Promise<MovieRequest[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const movies: MovieRequest[] = await this.storageService.get('movies') || [];
        if (Capacitor.getPlatform() === 'web') {
          resolve(movies);
          return;
        }
        for (const movie of movies) {
          movie.image = await this.fileSystemService.get(movie.image as WriteFileResult);
        }
        resolve(movies);
      } catch (error: any) {
        reject(error);
      }
    });
  }

  async getOne(index: number): Promise<MovieRequest> {
    return new Promise(async (resolve, reject) => {
      try {
        const movies: MovieRequest[] = await this.storageService.get('movies') || [];
        if (!movies.length) {
          throw new Error("Movie not found");
        }
        if (Capacitor.getPlatform() === 'web') {
          resolve(movies[index]);
          return;
        }
        movies[index].image = await this.fileSystemService.get(movies[index].image as WriteFileResult);
        resolve(movies[index]);
      } catch (error: any) {
        reject(error);
      }
    });
  }

  async save(request: MovieRequest): Promise<number> {
    return new Promise(async (resolve, reject) => {
      try {
        const movies: any[] = await this.storageService.get('movies') || [];
        if (movies.some((movie) => movie.title === request.title)) {
          throw new Error("Movie already exists");
        }

        const { data, type } = await readFileAsBase64(request.file);
        const id = movies.push({
          title: request.title,
          image: (Capacitor.getPlatform() !== 'web'
            ? await this.fileSystemService.save(request.file.name, data)
            : data),
          synopsis: request.synopsis,
          stars: 0,
          createdAt: Date.now(),
        });
        this.storageService.set('movies', movies);

        resolve(id - 1);
      } catch (error: any) {
        reject(error);
      }
    });
  }

  async update(id: number, request: MovieRequest): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const movies: any[] = await this.storageService.get('movies') || [];
        if (!movies.length) {
          throw new Error("Movie not found");
        }

        const { data, type } = await readFileAsBase64(request.file);
        movies[id] = {
          ...movies[id],
          title: request.title,
          image: (Capacitor.getPlatform() !== 'web'
            ? await this.fileSystemService.save(request.file.name, data)
            : data),
          synopsis: request.synopsis,
        };
        this.storageService.set('movies', movies);

        resolve();
      } catch (error: any) {
        reject(error);
      }
    });
  }

  async delete(index: number): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const movies: MovieRequest[] = await this.storageService.get('movies') || [];
        if (!movies.length) {
          throw new Error("Movie not found");
        }
        movies.splice(index, 1);
        this.storageService.set('movies', movies);
        resolve();
      } catch (error: any) {
        reject(error);
      }
    });
  }

  async rate(index: number, stars: number): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const movies: MovieRequest[] = await this.storageService.get('movies') || [];
        if (!movies.length) {
          throw new Error("Movie not found");
        }
        movies[index].stars = stars;
        this.storageService.set('movies', movies);
        resolve();
      } catch (error: any) {
        reject(error);
      }
    });
  }
}

export class MovieRequest {
  title!: string;
  image!: string | WriteFileResult;
  synopsis!: string;
  file!: File;
  createdAt!: Date;
  stars!: number;
}