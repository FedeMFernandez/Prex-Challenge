import { Injectable, SecurityContext } from '@angular/core';
import { Filesystem, Directory, WriteFileResult, ReadFileResult, GetUriResult } from '@capacitor/filesystem';
import { readFileAsBase64 } from '../functions/encoding.functions';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Capacitor } from '@capacitor/core';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class LogoService {

  constructor(
    private storageService: StorageService,
    private domSanitizer: DomSanitizer,
  ) { }

  async get(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const logo: WriteFileResult = await this.storageService.get('logo');
        resolve(Capacitor.convertFileSrc(logo?.uri) || '');
      } catch (error: any) {
        reject(error);
      }
    });
  }

  async saveImage(file: File): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, type } = await readFileAsBase64(file);
        const image = await Filesystem.writeFile({
          path: file.name,
          data: data,
          directory: Directory.Documents,
        });
        this.storageService.set('logo', image);
        resolve();
      } catch (error: any) {
        reject(error);
      }
    });
  }

}