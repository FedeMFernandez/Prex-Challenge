import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private storageService: StorageService,
  ) { }

  async getLoggedIn(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const logged = localStorage.getItem('logged');
        if (!logged) {
          resolve(false);
          return;
        }
        resolve(logged === 'true')
      } catch (error: any) {
        reject(false);
      }
    });
  }

  async setLoggedIn(logged: boolean): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        localStorage.setItem('logged', JSON.stringify(logged));
        resolve();
      } catch (error: any) {
        reject(error);
      }
    });
  }

  async login(request: LoginRequest): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.storageService.get(request.username);
        if (!!!user) {
          throw new Error("User not found");
        }
        if (btoa(request.password) !== user.password) {
          throw new Error("Login error");
        }
        resolve();
      } catch (error: any) {
        reject(error);
      }
    });
  }

  async register(request: RegisterRequest): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.storageService.get(request.username);
        if (!!user) {
          throw new Error("Username already in use");
        }
        this.storageService.set(request.username, {
          username: request.username,
          email: request.email,
          password: btoa(request.password),
        })
        resolve();
      } catch (error: any) {
        reject(error);
      }
    });
  }

  async recoverPassword(request: RecoverPasswordRequest): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.storageService.get(request.username);
        if (!!!user) {
          throw new Error("User not found");
        }
        resolve('We will send you an email with your new password');
      } catch (error: any) {
        reject(error);
      }
    });
  }
}

export class LoginRequest {
  username!: string;
  password!: string;
}

export class RegisterRequest {
  email!: string;
  username!: string;
  password!: string
}

export class RecoverPasswordRequest {
  email!: string;
  username!: string;
  password!: string
}