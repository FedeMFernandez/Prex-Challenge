import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable()
export class NotificationService {

  private notificationSubject: Subject<any> = new Subject();
  get getNotification(): Observable<any> {
    return this.notificationSubject.asObservable();
  }

  constructor() { }

  show(message: string, mode: 'success' | 'warning' | 'error'): void {
    this.notificationSubject.next({
      message, mode
    });
  }
}