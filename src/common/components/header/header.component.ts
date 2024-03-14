import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';
import { RouterLinkActive, RouterLink } from '@angular/router';

import { AlertService, AuthenticationService } from 'src/common/services';
import { MenuController, IonicModule } from '@ionic/angular';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrl: 'header.component.scss',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        NgIf,
        RouterLink,
    ],
})
export class HeaderComponent implements OnInit {
   @Input() public title: any;
    lastName: any;
    image: string | null;
    constructor() {}

    ngOnInit() {
        this.lastName = JSON.parse(localStorage.getItem('userInfo') || '').lastName;
        this.image = localStorage.getItem('profilePic');
    }
}
