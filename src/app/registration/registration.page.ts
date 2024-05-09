import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { ToastService } from '../service/toast.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  public signupForm!: FormGroup;
  public isLoading: boolean = false;
  public previousRoute: string | null = null;
  validationMessages = {
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
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private menuCtrl: MenuController,
    private router: Router,
    private auth: Auth,
    private toastService: ToastService
  ) {
    this.signupForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      phoneNumber: ['', Validators.required, Validators.maxLength(10)],
    });
    // console.log('--------------------', this.signupForm.get('fullName'));
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
    console.log(
      'error ----------> ',
      this.signupForm.get('phoneNumber')?.errors
    );
  }

  async validatePhone() {
    console.log(
      'error ----------> ',
      this.signupForm.get('phoneNumber')?.errors
    );
  }

  ngOnInit() {
    console.log('in signup screen');
    this.previousRoute = this.getPreviousUrl();
    console.log('Previous Route:', this.previousRoute);
  }

  private getPreviousUrl(): string | null {
    const previousRoute =
      this.router.getCurrentNavigation()?.previousNavigation?.initialUrl;
    return previousRoute ? previousRoute.toString() : null;
  }

  // validatePhoneNumber(event: any) {
  //   // Remove non-numeric characters
  //   const inputValue = event.target.value;
  //   const phoneNumber = inputValue.replace(/\D/g, '');

  //   if (phoneNumber.length > 10) {
  //     this.signupForm.patchValue({ phoneNumber: phoneNumber.slice(0, 10) });
  //   } else {
  //     this.signupForm.patchValue({ phoneNumber: phoneNumber });
  //   }
  // }

  async onSubmit() {
    if (this.signupForm.valid) {
      // console.log(this.signupForm.value);
      this.isLoading = true;
      let user: any;
      try {
        user = await createUserWithEmailAndPassword(
          this.auth,
          this.signupForm.value.email,
          this.signupForm.value.password
        );
        this.toastService.showToast(
          'Registration completed, please login to access the app'
        );

        this.router.navigate(['/login']);
      } catch (e: any) {
        console.log(e.message);
        this.toastService.showToast(e.message);
      }
      // setTimeout(() => {
      this.isLoading = false;
      // }, 2000);
      return user;
    } else {
      return;
    }
  }
}
