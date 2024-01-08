import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';



import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NotificationService } from './commons/services/notification.service';
import { NotificationBoxComponent } from './commons/components/notification-box/notification-box.component';
import { of } from 'rxjs';
import { tick, fakeAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AuthService } from './commons/services/auth.service';
import { LogoService } from './commons/services/logo.service';

// describe('AppComponent', () => {
//   let fixture: ComponentFixture<AppComponent>;
//   let component: AppComponent;
//   let notificationServiceSpy: jasmine.SpyObj<NotificationService>;

//   beforeEach(() => {
//     const spy = jasmine.createSpyObj('NotificationService', ['getNotification']);

//     TestBed.configureTestingModule({
//       imports: [
//         IonicModule.forRoot(),
//         IonicStorageModule.forRoot(),
//         RouterTestingModule,
//       ],
//       providers: [
//         // Any additional providers you might have
//       ],
//     });

//     fixture = TestBed.createComponent(AppComponent);
//     component = fixture.componentInstance;
//     notificationServiceSpy = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
//   });

//   it('should create the app component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should subscribe to notifications on init', () => {
//     spyOn(component, 'listenNotifications');
//     component.ngOnInit();
//     expect(component.listenNotifications).toHaveBeenCalled();
//   });

//   it('should unsubscribe on destroy', () => {
//     spyOn(component.subscription, 'unsubscribe');
//     component.ngOnDestroy();
//     expect(component.subscription.unsubscribe).toHaveBeenCalled();
//   });


//   it('should show and hide notification', fakeAsync(() => {
//     spyOn(component.notification, 'show').and.returnValue(Promise.resolve());
//     spyOn(component.notification, 'hide').and.returnValue(Promise.resolve());

//     component.showNotification('Test Message', 'success');

//     expect(component.notification.show).toHaveBeenCalledWith('Test Message', 'success');

//     // Use fakeAsync and tick to simulate the passage of time for the setTimeout
//     tick(3000);

//     expect(component.notification.hide).toHaveBeenCalled();
//   }));
// });

describe('AppComponent', () => {
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        RouterTestingModule,
      ],
      providers: [
        AuthService,
        NotificationService,
        LogoService,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
