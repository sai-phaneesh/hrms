import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UploadFilesService } from 'src/common/services/upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-upload-files',
    templateUrl: 'upload-files.component.html',
    styleUrl: 'upload-files.component.scss',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        IonicModule,
        NgFor,
        NgIf,
        CommonModule
    ],
    providers: [UploadFilesService]
})
export class UploadFilesComponent implements OnInit {

    selectedFiles: FileList;
    progressInfos: { value: Number, fileName: String }[] = [];
    message = '';

    fileInfos: Observable<any>;

    constructor(private uploadService: UploadFilesService) { }

    ngOnInit() {
        this.fileInfos = this.uploadService.getFiles();
    }

    selectFiles(event: any) {
        this.progressInfos = [];
        this.selectedFiles = event.target.files;
    }

    uploadFiles() {
        this.message = '';

        for (let i = 0; i < this.selectedFiles.length; i++) {
            this.upload(i, this.selectedFiles[i]);
        }
    }

    upload(idx: any, file: any) {
        let fileObj = { value: 0, fileName: file.name };
        this.progressInfos[idx] = fileObj;

        this.uploadService.upload(file).subscribe(
            event => {
                if (event.type === HttpEventType.UploadProgress) {
                    this.progressInfos[idx].value = Math.round(100 * event.loaded / (event.total || 1));
                } else if (event instanceof HttpResponse) {
                    this.fileInfos = this.uploadService.getFiles();
                }
            },
            err => { 
                this.progressInfos[idx].value = 0;
                this.message = 'Could not upload the file:' + file.name;
            });
    }




}