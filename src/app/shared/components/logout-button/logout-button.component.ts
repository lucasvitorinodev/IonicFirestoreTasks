import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { MenuController, NavController } from '@ionic/angular';
import { OverlayService } from '../../../core/services/overlay.service';

@Component({
  selector: 'app-logout-button',
  template: `
    <ion-buttons>
      <ion-button (click)="logout()">
        <ion-icon name="exit" slot="icon-only"></ion-icon>
      </ion-button>
    </ion-buttons>
  `,
})
export class LogoutButtonComponent implements OnInit {

  @Input() menu: string;

  constructor(private authService: AuthService,
              private navCtrl: NavController,
              private menuCtrl: MenuController,
              private overlayService: OverlayService) {
  }

  async ngOnInit(): Promise<void> {
    if (!await this.menuCtrl.isEnabled()) {
      this.menuCtrl.enable(true, this.menu);
    }
  }

  async logout(): Promise<void> {
    this.overlayService.alert({
      message: 'Do you really want to quit?',
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            await this.authService.logout();
            await this.menuCtrl.enable(false, this.menu);
            this.navCtrl.navigateRoot('/login');
          }
        },
        'No'
      ]
    });
  }
}
