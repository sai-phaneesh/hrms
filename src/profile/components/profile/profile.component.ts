import { Component, OnInit } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/common/components/header/header.component';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UploadDocComponent } from '../uploadDoc/index';
import { UploadFilesComponent } from 'src/common/components/upload-files/upload-files.component';

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
    ReactiveFormsModule,
    UploadFilesComponent,
  ]
})
export class ProfileComponent implements OnInit {
  public title = 'Profile';
  public imageAvailable: boolean = false;
  segment: any = 'officialLetter';
  userData: any;
  basicInfoEdit: boolean;
  personalInfoEdit: boolean = false;
  contactInfoEdit: boolean = false;
  docUpload: any;
 
  personalInfoForm: FormGroup;
  contactInfoForm: FormGroup;
  basicInfoForm: FormGroup;
  workInfoForm: FormGroup;
  workHistoryInfoForm: FormGroup;
  educationInfoForm: FormGroup;
  documentInfoForm: FormGroup;

  constructor( public dialog: MatDialog ) {
    this.getUserInfo();
    this.personalInfoForm = new FormGroup({
      name: new FormControl({ value: this.userData.name, disabled: !this.personalInfoEdit }, Validators.required,),
      dateOfBirth: new FormControl({ value: this.userData.dateOfBirth, disabled: !this.personalInfoEdit }, Validators.required),
      gender: new FormControl({ value: this.userData.gender, disabled: !this.personalInfoEdit }, Validators.required),
      bloodGroup: new FormControl({ value: this.userData.bloodGroup, disabled: !this.personalInfoEdit }, Validators.required),
      maritalStatus: new FormControl({ value: this.userData.maritalStatus, disabled: !this.personalInfoEdit }, Validators.required)
    });

    this.contactInfoForm = new FormGroup({
      officeMailId: new FormControl({ value: '-', disabled: !this.contactInfoEdit }, Validators.required,),
      contactMailId: new FormControl({ value: '-', disabled: !this.contactInfoEdit }, Validators.required),
      phoneNumber: new FormControl({ value: '-', disabled: !this.contactInfoEdit }, Validators.required),
      altPhoneNum: new FormControl({ value: '-', disabled: !this.contactInfoEdit }, Validators.required)
    });

    this.basicInfoForm = new FormGroup({
      employeeId: new FormControl({ value: '-', disabled: !this.basicInfoEdit }, Validators.required,),
      dateOfJoining: new FormControl({ value: '-', disabled: !this.basicInfoEdit }, Validators.required),
      workExperience: new FormControl({ value: '-', disabled: !this.basicInfoEdit }, Validators.required),
      probationPeriod: new FormControl({ value: '-', disabled: !this.basicInfoEdit }, Validators.required),
      employeeType: new FormControl({ value: '-', disabled: !this.basicInfoEdit }, Validators.required)
    });

    this.workInfoForm = new FormGroup({
      designation: new FormControl({ value: '-', disabled: true }, Validators.required,),
      jobTitle: new FormControl({ value: '-', disabled: true }, Validators.required),
      department: new FormControl({ value: '-', disabled: true }, Validators.required),
    });

    this.workHistoryInfoForm = new FormGroup({
      designation: new FormControl({ value: '-', disabled: true }, Validators.required,),
      from: new FormControl({ value: '-', disabled: true }, Validators.required),
      till: new FormControl({ value: '-', disabled: true }, Validators.required),
    });

    this.educationInfoForm = new FormGroup({
      employeeId: new FormControl({ value: 1233, disabled: true }, Validators.required,),
      courseName: new FormControl({ value: '-', disabled: true }, Validators.required),
      courseType: new FormControl({ value: '-', disabled: true }, Validators.required),
      courseStartDate: new FormControl({ value: '-', disabled: true }, Validators.required),
      courseEndDate: new FormControl({ value: '-', disabled: true }, Validators.required),
      collegeName: new FormControl({ value: '-', disabled: true }, Validators.required),
      universityName: new FormControl({ value: '-', disabled: true }, Validators.required),
    });

    this.documentInfoForm = new FormGroup({
      fullName: new FormControl({ value: '-', disabled: true }, Validators.required,),
      dateOfBirth: new FormControl({ value: '-', disabled: true }, Validators.required),
      age: new FormControl({ value: '-', disabled: true }, Validators.required),
      permanentAddress: new FormControl({ value: '-', disabled: true }, Validators.required),
      uploadedDocument: new FormControl({ value: '-', disabled: true }, Validators.required),
    });
  }

  ngOnInit() {
    // this.addDocs();
  }

  getUserInfo() {
    //get method to get info
    this.userData = {
      name: "Savan",
      dateOfBirth: "25-04-1995",
      gender: "Male",
      bloodGroup: "O+ve",
      maritalStatus: "Married",
      personalEmail: "string",
      phoneNumber: "string",
      alternatePhoneNumber: "string",
      permanentAddress: {
        addressLine1: "string",
        addressLine2: "string",
        landmark: "string",
        city: "string",
        country: "string",
        state: "string",
        pinCode: "string",
      },
      temporaryAddress: {
        addressLine1: "string",
        addressLine2: "string",
        landmark: "string",
        city: "string",
        country: "string",
        state: "string",
        pinCode: "string"
      }
    };
  }
  upload() {
    console.log('upload clicked');
  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }

  updatePersonalInfo() {
    this.personalInfoForm.disable();
    console.log('update personal info');
  }

  personalInfoEnable(value: boolean) {
    this.personalInfoEdit = value;
    if (value) {
      this.personalInfoForm.enable();
    }
    else {
      this.personalInfoForm.disable();
    }
  }

  contactInfoEnable(value: boolean) {
    this.contactInfoEdit = value;
    if (value) {
      this.contactInfoForm.enable();
    }
    else {
      this.contactInfoForm.disable();
    }
  }

  updateContactInfo() {
    this.basicInfoForm.disable();
    // api call
  }

  updateBasicInfo() {
    this.basicInfoForm.disable();
    // api call
  }

  updateWorkInfo() {
    this.workInfoForm.disable();
    // api call
  }

  updateWorkHistoryInfo() {
    this.workHistoryInfoForm.disable();
    // api call
  }

  updateEducationInfo() {
    this.educationInfoForm.disable();
    //api call
  }

  addDocs() {
    this.docUpload = this.dialog.open(UploadDocComponent, {
      data: {
        animal: 'panda',
      },
      width:'460px',
    });
  }

  updatedocumentInfo() {
    // doc api to add
  }

  dismiss(data: any){
    console.log(data)
  }
}

