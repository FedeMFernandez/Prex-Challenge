import { Injectable } from '@angular/core';
import { Filesystem, Directory, WriteFileResult } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';


@Injectable({
    providedIn: 'root'
})
export class FileSystemService {

    constructor() { }

    async get(fileResult: WriteFileResult): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(Capacitor.convertFileSrc(fileResult.uri));
            } catch (error: any) {
                reject(error);
            }
        });
    }

    async save(name: string, data: string): Promise<WriteFileResult> {
        return new Promise(async (resolve, reject) => {
            try {
                const currentDate = new Date().toLocaleString().replace(/[,:\s\/]/g, '-');
                const savedFile = await Filesystem.writeFile({
                    path: `${currentDate}-${name}`,
                    data: data,
                    directory: Directory.Documents,
                });
                resolve(savedFile);
            } catch (error: any) {
                reject(error);
            }
        });
    }

}