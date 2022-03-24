import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(
    private formbuilder: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<RegisterComponent>,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formbuilder.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      phone: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
          ),
        ],
      ],
    });
  }
  show: boolean = false;

  password() {
    this.show = !this.show;
  }
  registerUser() { 
    if (this.registerForm.valid) {
      this.api.postUser(this.registerForm.value).subscribe({
        next: () => {
          this.toast.success({
            detail: 'Success Message',
            summary: 'User Registered successfully',
            duration: 4000,
          });
          this.registerForm.reset();
          this.dialogRef.close();
        },
        error: (error: any) => {
          this.toast.error({
            detail: 'Error Message',
            summary: error,
            duration: 4000,
          });
        },
      });
    }
  }
}
