import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private formbuilder: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: ['', Validators.required],
      password: ['',Validators.required]
    });
  }
  show: boolean = false;

  password() {
    this.show = !this.show;
}
  loginUser() {
    
    if (this.loginForm.valid) {
      this.api.postLogin(this.loginForm.value).subscribe(
        (res) => {
         
          if(res.user.isUser === "true"){
            this.router.navigate(['/issue']);
          }else{
            this.router.navigate(['/adminIssue']);

          }
          this.toast.success({detail: "Success Message", summary:res.message, duration:4000})
          localStorage.setItem('id', res.user._id);
          localStorage.setItem('username', res.user.username);

          this.loginForm.reset();
          this.dialogRef.close();
        },
        (error: any) => {
          this.toast.error({detail: "Error Message", summary:error, duration:4000})

        }
      );
    }
  }
}
