import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
import { AuthService } from './service/authentication.service';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },
    { title: 'Signup', url: '/signup', icon: 'form' },
  ];
  public labels = [{ title: 'Logout', icon: 'log-out' }];

  constructor(
    private actionSheetController: ActionSheetController,
    private auth: AuthService
  ) {}

  async presentLogoutActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Confirm Logout',
      buttons: [
        {
          text: 'Yes',
          icon: 'log-out',
          handler: () => {
            this.logout();
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  logout() {
    this.auth.logout();
  }
}
