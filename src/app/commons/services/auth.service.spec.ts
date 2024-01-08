import { TestBed } from "@angular/core/testing";
import { IonicStorageModule } from "@ionic/storage-angular";


describe('AuthService', () => {
  let service: Storage;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicStorageModule.forRoot(),
      ]
    });
    service = TestBed.inject(Storage);
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be register an user', () => {
    expect(service).toBeTruthy();
  })
})