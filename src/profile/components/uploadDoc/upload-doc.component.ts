import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NgIf } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HeaderComponent } from 'src/common/components/header/header.component';

@Component({
    selector: 'app-upload-doc',
    templateUrl: 'upload-doc.component.html',
    styleUrl: 'upload-doc.component.scss',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        NgIf,
        IonicModule,
        HeaderComponent,

    ],
})
export class UploadDocComponent implements OnInit {
    public documentType: string;
    public filePath: string;
    public photoId: boolean = false;
    public dob: boolean = false;
    public permanentAddress: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<UploadDocComponent>
       ) {}

    ngOnInit() {
        
    }

    onFileChange(ev :any){
        console.log(ev);
    }
    closeDialog(){
        this.dialogRef.close();
    }
}
