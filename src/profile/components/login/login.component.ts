import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService, UserService } from 'src/common/services';
import { MenuController, IonicModule } from '@ionic/angular';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrl: 'login.component.scss',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        NgIf,
        RouterLink
    ],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    showPassword: boolean = false;
    userInfo: any;
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService : UserService,
        private alertService: AlertService,
        public menuCtrl: MenuController) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            userName : ['', Validators.required],
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
        this.authenticationService.login(this.f['userName'].value, this.f['password'].value)
            .pipe(first())
            .subscribe(
                data => {
                    this.userService.getUserInfo().subscribe((data: any) => {
                        this.userInfo = data;
                        localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
                        localStorage.setItem('userRole', this.userInfo.companyRole);

                        this.router.navigate(['/home/profile']);
                        this.menuCtrl.enable(true);
                    });
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  
}
