import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent  implements OnInit {
  public appPages = [
    { title: 'Inbox', url: '/home/inbox', icon: 'mail' },
    { title: 'Outbox', url: '/home/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/home/favorites', icon: 'heart' },
    { title: 'Archived', url: '/home/archived', icon: 'archive' },
    { title: 'Trash', url: '/home/trash', icon: 'trash' },
    { title: 'Spam', url: '/home/spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() { }

  ngOnInit() {}

}
