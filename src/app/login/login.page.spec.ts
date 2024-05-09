import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { LoginPage } from './login.page';
import { AuthService } from '../service/authentication.service';
import { ToastService } from '../service/toast.service';
import { IonRouterOutlet, MenuController } from '@ionic/angular';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let authService: jasmine.SpyObj<AuthService>;
  let toastService: jasmine.SpyObj<ToastService>;
  let router: jasmine.SpyObj<Router>;
  let menuController: jasmine.SpyObj<MenuController>;

  beforeEach(waitForAsync(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    const toastServiceSpy = jasmine.createSpyObj('ToastService', ['showToast']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const menuControllerSpy = jasmine.createSpyObj('MenuController', [
      'enable',
    ]);

    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot(), RouterTestingModule, FormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ToastService, useValue: toastServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MenuController, useValue: menuControllerSpy },
        { provide: AuthService, useValue: {} },
        { provide: ToastService, useValue: {} },
        IonRouterOutlet,
      ],
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    toastService = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    menuController = TestBed.inject(
      MenuController
    ) as jasmine.SpyObj<MenuController>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable menu on ionViewWillEnter', () => {
    component.ionViewWillEnter();
    expect(menuController.enable).toHaveBeenCalledWith(false);
  });

  it('should login successfully', () => {
    const loggedIn = true;
    authService.login.and.returnValue(of(loggedIn));

    component.username = 'testuser';
    component.password = 'testpassword';
    component.login();

    expect(authService.login).toHaveBeenCalledWith('testuser', 'testpassword');
    expect(toastService.showToast).toHaveBeenCalledWith('Login successful');
    expect(router.navigate).toHaveBeenCalledWith(['/app/dashboard']);
    expect(menuController.enable).toHaveBeenCalledWith(true);
  });

  it('should handle failed login', () => {
    const loggedIn = false;
    authService.login.and.returnValue(of(loggedIn));

    component.username = 'testuser';
    component.password = 'testpassword';
    component.login();

    expect(authService.login).toHaveBeenCalledWith('testuser', 'testpassword');
    expect(toastService.showToast).toHaveBeenCalledWith('Login failed');
    expect(router.navigate).not.toHaveBeenCalled();
    expect(menuController.enable).not.toHaveBeenCalled();
  });

  it('should not login if username or password is empty', () => {
    component.login();
    expect(authService.login).not.toHaveBeenCalled();
    expect(toastService.showToast).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
    expect(menuController.enable).not.toHaveBeenCalled();
  });

  it('should navigate to registration page', () => {
    component.goToRegistration();
    expect(router.navigate).toHaveBeenCalledWith(['/signup']);
  });
});
