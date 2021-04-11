import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadFilesService } from 'src/app/services/material_services/upload-files.service';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  fileInfos?: Observable<any>;
  constructor(private uploadService:UploadFilesService) { }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
  }

  selectFile(event:any):void{
    this.selectedFiles = event.target.files;
  }

  upload():void{
    this.progress = 0;

    if(this.selectedFiles) {
      const file:File | null = this.selectedFiles.item(0);

      if(file) {
        this.currentFile = file;

        this.uploadService.upload(this.currentFile).subscribe(
          (event:any) => {
            if(event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            }else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              
            }
          },
          (err:any) => {
            console.log(err);
            this.progress = 0;

            if(err.error && err.error.message) {
              this.message = err.error.message;
            }else {
              this.message = 'Could not upload file !';
            }

            this.currentFile = undefined
          });
      }
      this.selectedFiles = undefined;
    }
  }

}
