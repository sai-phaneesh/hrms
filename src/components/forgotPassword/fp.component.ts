import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '../services';
import { MenuController } from '@ionic/angular';

@Component({
    selector: 'app-fp',
    templateUrl: 'fp.component.html',
    styleUrl: 'fp.component.scss',
    encapsulation: ViewEncapsulation.None,
})
export class ForgotPasswordComponent implements OnInit {
    fpForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    showPassword: boolean = false;
    
    forgotPasswordLabel = "Forgot Password";
    primaryContent = "Enter the email you used to create your account so we can send you instruction on how to reset your password."
    checkEmailLabel = "Check your Email";
    sentTitle = "We have sent an email with password information to ";
    checkSpamLabel = "Didn't recceive the email? Check spam or promotion folder"
    sendTitle = "Send";
    
    title: string=this.forgotPasswordLabel;
    content: string = this.primaryContent;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        public menuCtrl: MenuController) {}

    ngOnInit() {
        this.fpForm = this.formBuilder.group({
            emailId : ['', Validators.required],
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
    get f() { return this.fpForm.controls; }

    onSubmit() {
        // stop here if form is invalid
        if (this.fpForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.forgotPassword(this.f['emailId'].value)
            .pipe(first())
            .subscribe(
                data => {
                    this.title = this.checkEmailLabel;
                    this.content = this.sentTitle;
                    this.submitted = true;
                    this.sendTitle = "Resend";
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;

                    this.title = this.checkEmailLabel;
                    this.content = this.sentTitle;
                    this.submitted = true;
                    this.sendTitle = "Resend";

                    //delete below lines after api integration
                });
    }


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
