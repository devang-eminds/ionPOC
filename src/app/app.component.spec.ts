import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AuthService } from './service/authentication.service';
import { ActionSheetController } from '@ionic/angular';
// import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let actionSheetController: jasmine.SpyObj<ActionSheetController>;

  beforeEach(waitForAsync(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);
    const actionSheetControllerSpy = jasmine.createSpyObj(
      'ActionSheetController',
      ['create']
    );

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [IonicModule.forRoot(), RouterModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ActionSheetController, useValue: actionSheetControllerSpy },
      ],
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    actionSheetController = TestBed.inject(
      ActionSheetController
    ) as jasmine.SpyObj<ActionSheetController>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout method on presentLogoutActionSheet', async () => {
    const actionSheet = jasmine.createSpyObj('ActionSheet', ['present']);
    actionSheetController.create.and.returnValue(Promise.resolve(actionSheet));

    await component.presentLogoutActionSheet();

    expect(actionSheetController.create).toHaveBeenCalled();
    expect(actionSheet.present).toHaveBeenCalled();
  });

  it('should call logout method on logout', () => {
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
  });
});
