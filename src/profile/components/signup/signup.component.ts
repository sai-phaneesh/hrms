import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService } from 'src/common/services';;
import { MenuController, IonicModule } from '@ionic/angular';
import { NgClass, NgIf } from '@angular/common';

@Component({
    selector: 'app-signup',
    templateUrl: 'signup.component.html',
    styleUrl: './signup.component.scss',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        NgClass,
        NgIf,
        RouterLink
    ],
})
export class SignupComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    showPassword: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        public menuCtrl: MenuController) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            emailId: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            tnc: [false, Validators.required]
        });
    }

    ionViewWillEnter() {
        this.menuCtrl.enable(false);
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.menuCtrl.enable(true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                     //delete below lines after api integration
                     this.menuCtrl.enable(true);
                     this.router.navigate(['/home/leave']);
                });
    }

    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
      }
}
