import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  heading: string = ' Add Your Issues';
  actionBtn: string = 'Add Issue';
  imageData: string = 'image';
  constructor(
    private formbuilder: FormBuilder,
    private api: ApiService,
    private toast: NgToastService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}
  issueForm!: FormGroup;
  ngOnInit(): void {
    this.issueForm = this.formbuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      image: [''],
      userId: [localStorage.getItem('id')],
      userName: [localStorage.getItem('username')],
    });
    if (this.editData) {
      this.heading = ' Update Your Isuues';
      this.actionBtn = 'Update Issue';
      this.issueForm.controls['title'].setValue(this.editData.title);
      this.issueForm.controls['description'].setValue(this.editData.description);
      this.issueForm.controls['status'].setValue(this.editData.status);
      this.issueForm.controls['image'].setValue(this.editData.image);
    }
    console.log(this.editData)
  }
  file1: any;
  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.file1 =(event.target as HTMLInputElement).files![0];
    this.issueForm.patchValue({ image: file });
    const allowFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (file && allowFileTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  addIssue(form: any) {
    let formdata = new FormData();
    formdata.append('image', this.file1, this.file1.name);
    formdata.append('title', this.issueForm.value.title);
    formdata.append('description', this.issueForm.value.description);
    formdata.append('status', this.issueForm.value.status);
    formdata.append('userId', this.issueForm.value.userId);
    formdata.append('userName', this.issueForm.value.userName);

    if (!this.editData) {
      if (this.issueForm.valid) {
        this.api.postIssue(formdata).subscribe({
          next: (res) => {
            this.toast.success({
              detail: 'Success Message',
              summary: 'Issue Added Successfully',
              duration: 4000,
            });

            this.issueForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            this.toast.error({
              detail: 'Error Message',
              summary: 'Error While Adding Issue',
              duration: 4000,
            });
          },
        });
      }
    } else {
      this.updateIssue();
    }
  }

  updateIssue() {
    let formdata = new FormData();
    formdata.append('image', this.file1, this.file1.name);
    formdata.append('title', this.issueForm.value.title);
    formdata.append('description', this.issueForm.value.description);
    formdata.append('status', this.issueForm.value.status);
    formdata.append('userId', this.issueForm.value.userId);
    formdata.append('userName', this.issueForm.value.userName);
    this.api.putIssue(this.editData._id, formdata).subscribe({
      next: (res) => {
        this.toast.success({
          detail: 'Success Message',
          summary: 'Issue Updated Successfully',
          duration: 4000,
        });

        this.issueForm.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        this.toast.error({
          detail: 'Error Message',
          summary: 'Error While Updating Issue',
          duration: 4000,
        });
      },
    });
  }
}
