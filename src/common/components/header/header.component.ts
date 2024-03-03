import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from 'src/common/services';
import { MenuController, IonicModule } from '@ionic/angular';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-header',
    template: `<ion-header [translucent]="true">
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button></ion-menu-button>
      </ion-buttons>
      <ion-title>{{title}}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content [fullscreen]="true">
    <ion-header collapse="condense">
      <ion-toolbar>
        <ion-title size="large">sss</ion-title>
      </ion-toolbar>
    </ion-header>`,
    styleUrl: 'header.component.scss',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        NgIf,
    ],
})
export class HeaderComponent implements OnInit {
   @Input() public title: any;
    constructor() {}

    ngOnInit() {
    }
}
