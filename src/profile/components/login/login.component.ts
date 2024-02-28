import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from 'src/common/services';
import { MenuController } from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrl: 'login.component.scss',
    encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    showPassword: boolean = false;
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        public menuCtrl: MenuController) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            emailId : ['', Validators.required],
            password: ['', Validators.required]
        });

        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    ionViewWillEnter() {
        this.menuCtrl.enable(false);
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f['emailId'].value, this.f['password'].value)
            .pipe(first())
            .subscribe(
                data => {
                    alert(this.returnUrl);
                    this.menuCtrl.enable(true);
                    this.router.navigate(['/home/leave']);
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
