import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";
import { of } from "rxjs";
import { AppComponent } from "./app.component";
import { AuthService } from "./commons/services/auth.service";
import { NotificationService } from "./commons/services/notification.service";
import { NotificationBoxComponent } from './commons/components/notification-box/notification-box.component';
import { MoviesComponent } from './pages/privates/movies/movies.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let authService: jasmine.SpyObj<AuthService>;
  let notificationService: jasmine.SpyObj<NotificationService>;
  let notificationComponent: jasmine.SpyObj<NotificationBoxComponent>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['getLoggedIn']);
    notificationService = jasmine.createSpyObj('NotificationService', ['getNotification']);
    notificationComponent = jasmine.createSpyObj('NotificationBoxComponent', ['show', 'hide']);

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NotificationBoxComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'user/movies',
            component: MoviesComponent,
          }
        ]),
        IonicModule
      ],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: NotificationService, useValue: notificationService },
      ],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.notification = notificationComponent;
  });

  afterEach(() => {
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize app and navigate if user is logged in', async () => {
    authService.getLoggedIn.and.returnValue(Promise.resolve(true));
    component.initializeApp();
    expect(await authService.getLoggedIn).toHaveBeenCalled();
  });

  it('should listen for notifications and show notification on event', () => {
    const notification = { message: 'Test Notification', mode: 'success' as 'success' };

    notificationService.getNotification.and.returnValue(of(notification));

    component.listenNotifications();

    expect(notificationService.getNotification).toHaveBeenCalled();
  });

  it('should show notification', async () => {
    const message = 'Test Notification';
    const mode = 'success';
    await component.showNotification(message, mode);

    expect(component.notification.show).toHaveBeenCalledWith(message, mode);
  });
});