import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, MenuController } from '@ionic/angular';
import { of } from 'rxjs';
import { RegistrationPage } from './registration.page';
import { ToastService } from '../../service/toast.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { RouterModule } from '@angular/router';

const mockAuth = {
  createUserWithEmailAndPassword: jasmine.createSpy('createUserWithEmailAndPassword').and.returnValue(Promise.resolve({})),
  authState: of(null)
};

describe('RegistrationPage', () => {
  let component: RegistrationPage;
  let fixture: ComponentFixture<RegistrationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationPage],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        IonicModule.forRoot()
      ],
      providers: [
        { provide: MenuController, useValue: {} },
        { provide: AngularFireAuth, useValue: mockAuth }, 
        { provide: ToastService, useValue: { showToast: () => {} } }
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(RegistrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the registration page', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the signupForm', () => {
    expect(component.signupForm).toBeDefined();
  });

  it('should set isLoading to false initially', () => {
    expect(component.isLoading).toBe(false);
  });

  it('should set previousRoute to null initially', () => {
    expect(component.previousRoute).toBeNull();
  });

  it('should set validationMessages', () => {
    expect(component.validationMessages).toEqual({
      fullName: [{ type: 'required', message: 'Full Name is required' }],
      email: [
        { type: 'required', message: 'Please enter a valid email address' },
      ],
      password: [
        {
          type: 'required',
          message: 'Password must be at least 6 characters long',
        },
      ],
      confirmPassword: [
        { type: 'required', message: 'Confirm Password is required' },
      ],
      phoneNumber: [{ type: 'required', message: 'Phone Number is required' }],
    });
  });

  it('should disable menu on ionViewWillEnter', () => {
    const menuController = TestBed.inject(MenuController);
    component.ionViewWillEnter();
    expect(menuController.enable).toHaveBeenCalledWith(false);
  });

});
