import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from '../services';
import { NgIf, NgClass } from '@angular/common';

@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html',
    standalone: true,
    imports: [NgIf, NgClass]
})

export class AlertComponent implements OnInit, OnDestroy {
    private subscription: Subscription = new Subscription;
    message: any;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.subscription = this.alertService.getMessage().subscribe(message => { 
            this.message = message; 
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}