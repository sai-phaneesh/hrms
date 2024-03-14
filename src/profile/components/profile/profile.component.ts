import { Component, OnInit, Sanitizer } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/common/components/header/header.component';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UploadDocComponent } from '../uploadDoc/index';
import { UploadFilesComponent } from 'src/common/components/upload-files/upload-files.component';
import { ProfileService } from 'src/profile/services/profile.service';
import { HttpEventType } from '@angular/common/http';
import { finalize, of } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { UploadFilesService } from 'src/common/services/upload.service';

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
  providers: [ProfileService, UploadFilesService]
})
export class ProfileComponent implements OnInit {
  public title = 'Profile';
  public imageUrl: any;
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
  educationalInfoForm: FormGroup;
  documentInfoForm: FormGroup;
  fileName: string;
  http: any;
  uploadSub: any;
  uploadProgress: number;
  aaa: any;

  constructor(public dialog: MatDialog, public profileService: ProfileService, public sanitizer: DomSanitizer, private uploadService: UploadFilesService) {
    this.getUserInfo();

  }

  ngOnInit() {
    // this.addDocs();
    this.personalInfoForm = new FormGroup({
      name: new FormControl({ value: '-', disabled: !this.personalInfoEdit }),
      dateOfBirth: new FormControl({ value: '', disabled: !this.personalInfoEdit }),
      gender: new FormControl({ value: '-', disabled: !this.personalInfoEdit }),
      bloodGroup: new FormControl({ value: '', disabled: !this.personalInfoEdit }),
      maritalStatus: new FormControl({ value: '-', disabled: !this.personalInfoEdit })
    });

    this.workHistoryInfoForm = new FormGroup({
      companyName: new FormControl({ value: '-', disabled: true }, Validators.required),
      designation: new FormControl({ value: '-', disabled: true }, Validators.required,),
      fromDate: new FormControl({ value: '-', disabled: true }, Validators.required),
      toDate: new FormControl({ value: '-', disabled: true }, Validators.required),
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
      designation: new FormControl({ value: '-', disabled: true }, Validators.required),
      jobTitle: new FormControl({ value: '-', disabled: true }, Validators.required),
      department: new FormControl({ value: '-', disabled: true }, Validators.required),
    });


    //make it as array
    this.educationalInfoForm = new FormGroup({
      degree: new FormControl({ value: this.userData?.educationalInfo[0]?.degree, disabled: true }, Validators.required),
      courseName: new FormControl({ value: this.userData?.educationalInfo[0]?.courseName, disabled: true }, Validators.required),
      courseType: new FormControl({ value: this.userData?.educationalInfo[0]?.courseType, disabled: true }, Validators.required),
      fromDate: new FormControl({ value: this.userData?.educationalInfo[0]?.fromDate, disabled: true }, Validators.required),
      toDate: new FormControl({ value: this.userData?.educationalInfo[0]?.toDate, disabled: true }, Validators.required),
      collegeName: new FormControl({ value: this.userData?.educationalInfo[0]?.collegeName, disabled: true }, Validators.required),
      universityName: new FormControl({ value: this.userData?.educationalInfo[0]?.universityName, disabled: true }, Validators.required),
    });

    //yet to update
    this.documentInfoForm = new FormGroup({
      fullName: new FormControl({ value: '-', disabled: true }, Validators.required),
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
          this.imageUrl = localStorage.getItem('profilePic');
          if (!this.imageUrl) {
            this.loadProfilePic(data.personalDocuments[1]);
          }

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
            companyName: this.userData?.workHistory[0]?.companyName || null,
            designation: this.userData?.workHistory[0]?.designation || null,
            fromDate: this.userData?.workHistory[0]?.fromDate || null,
            toDate: this.userData?.workHistory[0]?.toDate || null,
          });

          //edducational history
          this.educationalInfoForm.setValue({
            universityName: this.userData?.educationalInfo[0]?.universityName || null,
            degree: this.userData?.educationalInfo[0]?.degree,
            courseName: this.userData?.educationalInfo[0]?.courseName,
            courseType: this.userData?.educationalInfo[0]?.courseType,
            fromDate: this.userData?.educationalInfo[0]?.fromDate,
            toDate: this.userData?.educationalInfo[0]?.toDate,
            collegeName: this.userData?.educationalInfo[0]?.collegeName,
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
          // alert(error)
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

  }

  updateWorkHistoryInfo() {
    this.workHistoryInfoForm.disable();
    // api call
    let body: any = {}
    body.experienceDetails = [];
    body.experienceDetails.push(this.workHistoryInfoForm.value);

    // api call
    this.profileService.updateWorkInfo(JSON.stringify(body))
      .subscribe(data => {
        console.log(data);
        this.workHistoryInfoForm.disable();
      },
        error => console.error(error)
      )
  }

  updateEducationalInfo() {
    //api call
    this.profileService.updateEducationalInfo(JSON.stringify(this.educationalInfoForm.value))
      .subscribe((data => {
        this.educationalInfoForm.disable();
      }),
        error => console.log(error)
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

  downloadDoc(path: string) {
    let thefile = {};

    this.profileService.get('/hrms/employee/download-file/' + path)
      // this.profileService.get('/hrms/employee/download-file/' + 'PERSONAL_DOCUMENTS/superadmin_2024_03_13T22_17_43_710513768_WIN_20240311_19_08_28_Pro.jpg')
      .subscribe((data: any) => this.downloadFile(data), //console.log(data),
        error => this.downloadFile(error),
        // () => console.log('Completed file download.'));
      );
    // let url = window.URL.createObjectURL(thefile);
    // window.open(url);


    // .subscribe((data) => {
    //   console.log(data);
    //   this.downloadFile(data);
    //   // this.basicInfoForm.disable();
    // },
    //   error => { console.log(error); }
    // )
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("thumbnail", file);

      const upload$ = this.http.post("/api/thumbnail-upload", formData, {
        reportProgress: true,
        observe: 'events'
      })
        .pipe(
          finalize(() => this.reset())
        );

      this.uploadSub = upload$.subscribe((event: any) => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
        }
      })
    }
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = 0;
    this.uploadSub = null;
  }

  downloadFile(data: any) {
    const blob = new Blob([data]);
    let url = window.URL.createObjectURL(blob);
    url = url.replace('192.168.0.190:8100', '13.235.98.232:9000');
    window.open(url);
  }

  loadProfilePic(obj: { filePath: string; }) {
    this.profileService.get('/hrms/employee/download-file/' + obj.filePath)
      // this.profileService.get('/hrms/employee/download-file/' + 'PERSONAL_DOCUMENTS/superadmin_2024_03_13T22_17_43_710513768_WIN_20240311_19_08_28_Pro.jpg')
      .subscribe((data: any) => {
        // this.downloadFile(data)
        const blob = new Blob([data], { type: 'image/png' });
        let url = URL.createObjectURL(blob);
        this.imageUrl = url;
        localStorage.setItem('profilePic', this.imageUrl);
        // this.imageUrl =this.sanitizer.bypassSecurityTrustUrl(url);
        console.log(this.imageUrl);
      }, //console.log(data),
        error => this.downloadFile(error),
        // () => console.log('Completed file download.'));
      );
  }

  uploadProfilePic(event: any) {
    let file = event?.target?.files[0];
    this.uploadService.upload('PERSONAL_DOCUMENTS', file).subscribe(
      event => {
        console.log(event);
        this.loadProfilePic({ filePath: "PERSONAL_DOCUMENTS/superadmin_2024_03_15T00_54_35_575181529_profilePic.png" })
      },
      err => {
        // this.progressInfos[idx].value = 0;
        // this.message = 'Could not upload the file:' + file.name;
      });
  }
}

