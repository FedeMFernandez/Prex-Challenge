import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ColorMode } from '../types/app.types';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationSubject: Subject<any> = new Subject();

  constructor() { }

  getNotification(): Observable<any> {
    return this.notificationSubject.asObservable();
  }
  
  show(message: string, mode: ColorMode): void {
    this.notificationSubject.next({
      message, mode
    });
  }
}