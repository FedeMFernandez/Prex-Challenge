import { Injectable } from "@angular/core";
import { Directory, Encoding, Filesystem, WriteFileResult } from "@capacitor/filesystem";
import { readFileAsBase64 } from "../functions/encoding.functions";
import { Capacitor } from "@capacitor/core";
import { StorageService } from "./storage.service";


@Injectable()
export class MoviesService {

  constructor(
    private storageService: StorageService,
  ) { }

  async getAll(): Promise<MovieRequest[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const movies: MovieRequest[] = await this.storageService.get('movies') || [];
        for (const movie of movies) {
          movie.image = Capacitor.convertFileSrc(movie.image);
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
        movies[index].image = Capacitor.convertFileSrc(movies[index].image);
        resolve(movies[index]);
      } catch (error: any) {
        reject(error);
      }
    });
  }

  async save(request: MovieRequest): Promise<number> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, type } = await readFileAsBase64(request.file);
        const image = await Filesystem.writeFile({
          path: request.file.name,
          data: data,
          directory: Directory.Documents,
        });

        const movies: any[] = await this.storageService.get('movies') || [];
        if (movies.some((movie) => movie.title === request.title)) {
          throw new Error("Movie already exists");
        }


        const id = movies.push({
          title: request.title,
          image: image.uri,
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
        let image!: WriteFileResult;
        if (request.file) {
          const { data, type } = await readFileAsBase64(request.file);
          image = await Filesystem.writeFile({
            path: request.file.name,
            data: data,
            directory: Directory.Documents,
          });
        }

        const movies: any[] = await this.storageService.get('movies') || [];
        if (!movies.length) {
          throw new Error("Movie not found");
        }

        movies[id] = {
          ...movies[id],
          title: request.title,
          image: image?.uri || movies[id].image,
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
  image!: string;
  synopsis!: string;
  file!: File;
  createdAt!: Date;
  stars!: number;
}