import { AuthGuard } from './auth.guard';
import { AuthService } from '../service/authentication.service';
import { NavController } from '@ionic/angular';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TestBed } from '@angular/core/testing';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let navCtrl: jasmine.SpyObj<NavController>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'isAuthenticated',
    ]);
    const navCtrlSpy = jasmine.createSpyObj('NavController', ['navigateRoot']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: NavController, useValue: navCtrlSpy },
      ],
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    navCtrl = TestBed.inject(NavController) as jasmine.SpyObj<NavController>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {
    it('should return true if authenticated', async () => {
      authService.isAuthenticated.and.returnValue(await Promise.resolve(true));
      const result = await guard.canActivate(
        new ActivatedRouteSnapshot(),
        {} as RouterStateSnapshot
      );
      expect(result).toBeTrue();
    });

    it('should return false and route to login page if not authenticated', async () => {
      authService.isAuthenticated.and.returnValue(await Promise.resolve(false));
      const result = await guard.canActivate(
        new ActivatedRouteSnapshot(),
        {} as RouterStateSnapshot
      );
      expect(result).toBeFalse();
      expect(navCtrl.navigateRoot).toHaveBeenCalledWith('/login');
    });
  });
});
