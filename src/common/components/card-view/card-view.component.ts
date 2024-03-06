import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from 'src/common/services';
import { MenuController, IonicModule } from '@ionic/angular';
import { NgIf } from '@angular/common';

@Component({
    selector: 'card-view',
    templateUrl: 'card-view.component.html',
    styleUrl: 'card-view.component.scss',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        NgIf,
    ],
})
export class CardViewComponent implements OnInit {
   @Input() public title: any;
   @Input() public description: any;
    
   constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        public menuCtrl: MenuController) {}

    ngOnInit() {
    
    }
}
