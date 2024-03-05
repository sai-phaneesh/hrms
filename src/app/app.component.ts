import { Component } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: true,
    imports: [
        IonicModule,
        NgFor,
        RouterLinkActive,
        RouterLink,
    ],
})
export class AppComponent {
  public appPages = [
    { title: 'Leave Management', url: '/home/leave', icon: 'mail' },
    { title: 'Assets', url: '/home/assets', icon: 'paper-plane' },
    { title: 'Roles', url: '/home/favorites', icon: 'heart' },
    { title: 'Dashboard', url: '/home/archived', icon: 'archive' },
    { title: 'Groups', url: '/home/trash', icon: 'trash' },
    { title: 'Timesheets', url: '/home/spam', icon: 'warning' },
    { title: 'Shift Management', url: '/home/spam', icon: 'home' },
    { title: 'Hiring', url: '/home/spam', icon: 'mail' },
    { title: 'Company Settings', url: '/home/spam', icon: 'home' },
  ];
  public labels = ['Report', 'Settings', 
  // 'Notes', 'Work', 'Travel', 'Reminders'
];
  constructor() {}

  async ngOnInit() {
    await SplashScreen.show({
      showDuration: 2000,
      autoHide: true,
    });
  }
}
