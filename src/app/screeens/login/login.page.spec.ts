import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, IonRouterOutlet, MenuController } from '@ionic/angular';
import { AngularFireAuthModule , AngularFireAuth} from "@angular/fire/compat/auth";
import { ToastService } from '../../service/toast.service';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { of } from 'rxjs';

import { LoginPage } from './login.page';
import { Router } from '@angular/router';
import { firebaseConfig } from 'src/app/app.module';
import { AuthModule } from '@angular/fire/auth';
import { FirebaseAppModule } from '@angular/fire/app';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let mockAuthService: any;
  let mockRouter: any;
  let mockMenuController: any;
  let mockRouterOutlet: any;
  let mockToastService: any;

  beforeEach(waitForAsync(() => {
    mockAuthService = jasmine.createSpyObj('AngularFireAuth', ['signInWithEmailAndPassword']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockMenuController = jasmine.createSpyObj('MenuController', ['enable']);
    mockRouterOutlet = jasmine.createSpyObj('IonRouterOutlet', ['swipeGesture']);
    mockToastService = jasmine.createSpyObj('ToastService', ['showToast']);

    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [ IonicModule.forRoot(), RouterTestingModule,AngularFireAuthModule,AuthModule, FirebaseAppModule ],
      providers: [
        { provide: AngularFireAuth, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: MenuController, useValue: mockMenuController },
        { provide: IonRouterOutlet, useValue: mockRouterOutlet },
        { provide: ToastService, useValue: mockToastService },
        { provide: FIREBASE_OPTIONS, useValue: firebaseConfig }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable menu on ionViewWillEnter', () => {
    component.ionViewWillEnter();
    expect(mockMenuController.enable).toHaveBeenCalledWith(false);
  });

  it('should navigate to registration page on goToRegistration', () => {
    component.goToRegistration();
    expect(mockRouterOutlet.swipeGesture).toHaveBeenCalledWith(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/signup']);
  });

  it('should log in successfully', async () => {
    const user = { user: { accessToken: 'mockAccessToken' } };
    mockAuthService.signInWithEmailAndPassword.and.returnValue(Promise.resolve(user));

    await component.login();

    expect(mockAuthService.signInWithEmailAndPassword).toHaveBeenCalledWith(component.auth, component.username, component.password);
    expect(mockToastService.showToast).toHaveBeenCalledWith('Login successful');
    expect(mockMenuController.enable).toHaveBeenCalledWith(true);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/app/dashboard']);
  });

  it('should handle login failure', async () => {
    const error = { message: 'Invalid credentials' };
    mockAuthService.signInWithEmailAndPassword.and.returnValue(Promise.reject(error));

    await component.login();

    expect(mockToastService.showToast).toHaveBeenCalledWith('Invalid credentials');
  });
});
