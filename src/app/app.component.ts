import { Component } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Leave Management', url: '/home/leave', icon: 'mail' },
    { title: 'Assets', url: '/home/assets', icon: 'paper-plane' },
    // { title: 'Favorites', url: '/home/favorites', icon: 'heart' },
    // { title: 'Archived', url: '/home/archived', icon: 'archive' },
    // { title: 'Trash', url: '/home/trash', icon: 'trash' },
    // { title: 'Spam', url: '/home/spam', icon: 'warning' },
  ];
  public labels = ['Levae management', 'Assets', 
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
