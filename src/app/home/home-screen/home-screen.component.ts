import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css'],
})
export class HomeScreenComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  openLoginDialog() {
    this.dialog.open(LoginComponent), {};
  }
  openRegisterDialog() {
    this.dialog.open(RegisterComponent), {};
  }

  ngOnInit(): void {}
}
