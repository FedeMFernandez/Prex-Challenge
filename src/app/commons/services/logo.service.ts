import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { FileSystemService } from './filesystem.service';
import { readFileAsBase64 } from '../functions/encoding.functions';
import { Capacitor } from '@capacitor/core';


@Injectable({
  providedIn: 'root'
})
export class LogoService {

  constructor(
    private storageService: StorageService,
    private fileSystemService: FileSystemService,
  ) { }

  async get(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const logo = await this.storageService.get('logo');
        if (!logo) {
          resolve('./assets/images/logo.png');
          return;
        }
        resolve((Capacitor.getPlatform() !== 'web'
          ? await this.fileSystemService.get(logo)
          : logo))
      } catch (error: any) {
        reject(error);
      }
    });
  }

  async saveImage(file: File): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, type } = await readFileAsBase64(file);
        this.storageService.set('logo',
          (Capacitor.getPlatform() !== 'web'
            ? await this.fileSystemService.save(file.name, data)
            : data)
        );
        resolve();
      } catch (error: any) {
        reject(error);
      }
    });
  }

}