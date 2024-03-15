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
    { title: 'Profile', url: '/home/profile', icon: 'person' },
    { title: 'Leave Management', url: '/home/leave', icon: 'calendar' },
    { title: 'Assets', url: '/home/assets', icon: 'laptop' },
    { title: 'Roles', url: '/home/favorites', icon: 'people' },
    { title: 'Dashboard', url: '/home/archived', icon: 'pie-chart' },
    // { title: 'Groups', url: '/home/trash', icon: 'trash' },
    { title: 'Timesheets', url: '/home/spam', icon: 'alarm' },
    { title: 'Shift Management', url: '/home/spam', icon: 'man' },
    { title: 'Hiring', url: '/home/spam', icon: 'bag' },
  ];
  public labels = ['Settings', 
  // 'Notes', 'Work', 'Travel', 'Reminders'
];
  constructor() {}

  async ngOnInit() {
    await SplashScreen.show({
      showDuration: 3000,
      autoHide: true,
    });
  }
}
