import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {UploadService} from '../upload.service';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  @ViewChild('file', {static: false}) file

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              public uploadService: UploadService) {}
  progress
  canBeClosed = true
  primaryButtonText = 'Ladda upp'
  showCancelButton = true
  uploading = false
  uploadSuccessful = false

  public files: Set<File> = new Set();
  addFiles() {
    this.file.nativeElement.click();
  }
  onFilesAdded() {
    const files: {[key: string]: File } =
      this.file.nativeElement.files;
    for (const key in files ) {
      if (!isNaN(Number(key))) {
        this.files.add(files[key]);
      }
    }
  }
  closeDialog() {
    if (this.uploadSuccessful) {
      return this.dialogRef.close();
    }
    this.uploading = true;
    this.progress = this.uploadService.upload(this.files);
    const allProgressObservables = [];
    for (let key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
    }
    this.primaryButtonText = 'Stäng';
    this.canBeClosed = false;
    this.dialogRef.disableClose = true;
    this.showCancelButton = false;
    forkJoin(allProgressObservables).subscribe(() => {
      this.canBeClosed = true;
      this.dialogRef.disableClose = false;
      this.uploadSuccessful = true;
      this.uploading = false;
    });
  }
}