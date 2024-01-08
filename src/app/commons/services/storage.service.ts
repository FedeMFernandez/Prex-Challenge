import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(
    private storage: Storage
  ) {
    this.init();
  }

  async init(): Promise<void> {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public set(key: string, value: any): void {
    this._storage?.set(key, value);
  }

  public async get(key: string): Promise<any> {
    return await this._storage?.get(key)
  }

  public async clear(): Promise<void> {
    await this._storage?.clear()
  }
}