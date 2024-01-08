import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationSubject: Subject<any> = new Subject();

  constructor() { }

  getNotification(): Observable<any> {
    return this.notificationSubject.asObservable();
  }
  
  show(message: string, mode: 'success' | 'warning' | 'error'): void {
    this.notificationSubject.next({
      message, mode
    });
  }
}