import { Component, OnInit } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/common/components/header/header.component';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
    standalone: true,
    imports: [
        IonicModule,
        NgFor,
        RouterLinkActive,
        RouterLink,
        HeaderComponent,
        NgIf,
    ],
})
export class ProfileComponent  implements OnInit {
  public title = 'Profile';
  public imageAvailable:boolean=false;
  segment: any = 'Personal';
  constructor() { }

  ngOnInit() {}

  upload() {
    console.log('upload clicked');
  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }
}
