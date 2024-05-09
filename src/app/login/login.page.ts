import { Component } from '@angular/core';
import { AuthService } from '../service/authentication.service';
import { Router } from '@angular/router';
import { ToastService } from '../service/toast.service';
import { IonRouterOutlet, MenuController } from '@ionic/angular';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  isSubmitted: boolean = false;
  public isLoading: boolean = false;

  constructor(
    private auth: Auth,
    private router: Router,
    private toastService: ToastService,
    private menuCtrl: MenuController,
    private routerOutlet: IonRouterOutlet
  ) {}

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  async login() {
    this.isSubmitted = true;
    this.isLoading = true;
    if (this.username && this.password) {
      try {
        const user: any = await signInWithEmailAndPassword(
          this.auth,
          this.username,
          this.password
        );
        await localStorage.setItem('ionPOC_auth_token', user.user.accessToken);

        this.toastService.showToast('Login successful');
        setTimeout(() => {
          this.menuCtrl.enable(true);
          this.router.navigate(['/app/dashboard']);
        }, 1000);
        this.isLoading = false;

        return user;
      } catch (e: any) {
        console.log('fksdkjfsdk', e);
        this.toastService.showToast(e.message);
        this.isLoading = false;
      }
    } else {
      return;
    }
  }

  goToRegistration() {
    this.routerOutlet.swipeGesture = false;
    this.router.navigate(['/signup']);
  }
}
