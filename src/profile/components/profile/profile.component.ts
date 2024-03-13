import { Component, OnInit } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/common/components/header/header.component';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UploadDocComponent } from '../uploadDoc/index';
import { UploadFilesComponent } from 'src/common/components/upload-files/upload-files.component';
import { ProfileService } from 'src/profile/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  standalone: true,
  imports: [
    IonicModule,
    RouterLinkActive,
    RouterLink,
    HeaderComponent,
    NgIf,
    NgFor,
    ReactiveFormsModule,
    UploadFilesComponent,
  ],
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {
  public title = 'Profile';
  public imageAvailable: boolean = false;
  segment: any = 'personal';
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

  constructor(public dialog: MatDialog, public profileService: ProfileService) {
    this.getUserInfo();

  }

  ngOnInit() {
    // this.addDocs();
    this.personalInfoForm = new FormGroup({
      name: new FormControl({ value: '-', disabled: !this.personalInfoEdit }),
      dateOfBirth: new FormControl({ value:'',disabled: !this.personalInfoEdit }),
      gender: new FormControl({ value: '-', disabled: !this.personalInfoEdit }),
      bloodGroup: new FormControl({ value: '', disabled: !this.personalInfoEdit }),
      maritalStatus: new FormControl({ value: '-', disabled: !this.personalInfoEdit })
    });

    this.workHistoryInfoForm = new FormGroup({
      companyName: new FormControl({ value: '-', disabled: true }, Validators.required),
      designation: new FormControl({ value: '-', disabled: true }, Validators.required,),
      from: new FormControl({ value: '-', disabled: true }, Validators.required),
      till: new FormControl({ value: '-', disabled: true }, Validators.required),
    });

    //yet to update
    this.contactInfoForm = new FormGroup({
      officeMailId: new FormControl({ value: '-', disabled: !this.contactInfoEdit }, Validators.required,),
      contactMailId: new FormControl({ value: '-', disabled: !this.contactInfoEdit }, Validators.required),
      phoneNumber: new FormControl({ value: '-', disabled: !this.contactInfoEdit }, Validators.required),
      altPhoneNum: new FormControl({ value: '-', disabled: !this.contactInfoEdit }, Validators.required)
    });

    //yet to update
    this.basicInfoForm = new FormGroup({
      employeeId: new FormControl({ value: '-', disabled: !this.basicInfoEdit }, Validators.required,),
      dateOfJoining: new FormControl({ value: '-', disabled: !this.basicInfoEdit }, Validators.required),
      workExperience: new FormControl({ value: '-', disabled: !this.basicInfoEdit }, Validators.required),
      probationPeriod: new FormControl({ value: '-', disabled: !this.basicInfoEdit }, Validators.required),
      employeeType: new FormControl({ value: '-', disabled: !this.basicInfoEdit }, Validators.required)
    });

    //yet to update
    this.workInfoForm = new FormGroup({
      designation: new FormControl({ value: '-', disabled: true }, Validators.required,),
      jobTitle: new FormControl({ value: '-', disabled: true }, Validators.required),
      department: new FormControl({ value: '-', disabled: true }, Validators.required),
    });


    //make it as array
    this.educationInfoForm = new FormGroup({
      // employeeId: new FormControl({ value: '', disabled: true }, Validators.required,),
      // id: new FormControl({ value: 0, disabled: true }, Validators.required,),
      courseName: new FormControl({ value: this.userData?.educationalInfo[0]?.courseName, disabled: true }, Validators.required),
      courseType: new FormControl({ value: this.userData?.educationalInfo[0]?.courseType, disabled: true }, Validators.required),
      courseStartDate: new FormControl({ value: this.userData?.educationalInfo[0]?.courseStartDate, disabled: true }, Validators.required),
      courseEndDate: new FormControl({ value: this.userData?.educationalInfo[0]?.courseEndDate, disabled: true }, Validators.required),
      collegeName: new FormControl({ value: this.userData?.educationalInfo[0]?.collegeName, disabled: true }, Validators.required),
      universityName: new FormControl({ value: this.userData?.educationalInfo[0]?.universityName, disabled: true }, Validators.required),
    });

    //yet to update
    this.documentInfoForm = new FormGroup({
      fullName: new FormControl({ value: '-', disabled: true }, Validators.required,),
      dateOfBirth: new FormControl({ value: '-', disabled: true }, Validators.required),
      age: new FormControl({ value: '-', disabled: true }, Validators.required),
      permanentAddress: new FormControl({ value: '-', disabled: true }, Validators.required),
      uploadedDocument: new FormControl({ value: '-', disabled: true }, Validators.required),
    });
  }

  getUserInfo() {
    this.profileService.getUserInfo()
      .pipe()
      .subscribe(
        data => {
          this.userData = data;

          // Update personal info
          this.personalInfoForm.setValue({
            name: this.userData?.personalInfo?.name,
            dateOfBirth: this.userData?.personalInfo?.dateOfBirth,
            gender: this.userData?.personalInfo?.gender,
            bloodGroup: this.userData?.personalInfo?.bloodGroup,
            maritalStatus: this.userData?.personalInfo?.maritalStatus
          });

          // update work info
          this.workHistoryInfoForm.setValue({
            companyName: this.userData?.workHistory[0]?.companyName,
            designation: this.userData?.workHistory[0]?.designation,
            from: this.userData?.workHistory[0]?.fromDate,
            till: this.userData?.workHistory[0]?.toDate,
          });

          //update contact history
          this.contactInfoForm.setValue({
            officeMailId: '-',
            contactMailId: '-',
            phoneNumber: '-',
            altPhoneNum: '-',
          });

        },
        error => {
        });
    //get method to get info
    //   this.userData = {
    //     name: "Savan",
    //     dateOfBirth: "25-04-1995",
    //     gender: "Male",
    //     bloodGroup: "O+ve",
    //     maritalStatus: "Married",
    //     personalEmail: "string",
    //     phoneNumber: "string",
    //     alternatePhoneNumber: "string",
    //     permanentAddress: {
    //       addressLine1: "string",
    //       addressLine2: "string",
    //       landmark: "string",
    //       city: "string",
    //       country: "string",
    //       state: "string",
    //       pinCode: "string",
    //     },
    //     temporaryAddress: {
    //       addressLine1: "string",
    //       addressLine2: "string",
    //       landmark: "string",
    //       city: "string",
    //       country: "string",
    //       state: "string",
    //       pinCode: "string"
    //     }
    //   };
  }
  upload() {
    console.log('upload clicked');
  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }

  updatePersonalInfo(form: any) {
    this.profileService.updatePersonalInfo(JSON.stringify(form.value))
      .subscribe(data => {
        console.log(data);
        this.personalInfoForm.disable();
      })
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
    this.profileService.updateContactInfo(JSON.stringify(this.contactInfoForm.value))
      .subscribe(data => {
        console.log(data);
        this.basicInfoForm.disable();
      },
        error => console.error(error)
      )
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
    this.profileService.updateEducationInfo(JSON.stringify(this.educationInfoForm.value))
      .subscribe(data => {
        console.log(data);
        // this.basicInfoForm.disable();
      },
        error => console.error(error)
      )
  }

  addDocs() {
    this.docUpload = this.dialog.open(UploadDocComponent, {
      data: {
        animal: 'panda',
      },
      width: '460px',
    });
  }

  updatedocumentInfo() {
    // doc api to add
  }

  dismiss(data: any) {
    console.log(data)
  }

  downloadDoc(path:string) {
    this.profileService.get('/hrms/employee/download-file/'+ path)
      .subscribe(data => {
        console.log(data);
        // this.basicInfoForm.disable();
      },
        error => console.error(error)
      )
  }
}

