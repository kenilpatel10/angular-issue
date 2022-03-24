import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../../addIssue dialog/dialog.component';
import { ApiService } from '../../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { inject } from '@angular/core/testing';
@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css'],
})
export class MainScreenComponent implements OnInit {
  titlename = localStorage.getItem('username');
  displayedColumns: string[] = [
    'image',
    'title',
    'description',
    'status',
    'actions',
  ];
  dataSource!: MatTableDataSource<any>;
  allData: any = [];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public dialog: MatDialog,
    private api: ApiService,
    private toast: NgToastService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getAllIssues();
  }
  openDialog() {
    this.dialog
      .open(DialogComponent, {
        width: 'auto',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') this.getAllIssues();
      });
  }

  editIssue(row: any) {
    this.dialog
      .open(DialogComponent, {
        width: 'auto',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') this.getAllIssues();
      
      });
  }

  singleIssue: any =[];
  getSingleIssue(id:any) {
    this.api.getIssue(id).subscribe({
      next: (res) => {
        this.singleIssue= res;
        console.log(this.singleIssue)

      },

      error: () => {
        this.toast.error({
          detail: 'Error Message',
          summary: 'Error While Fecthing Data',
          duration: 4000,
        });
      },
    });
  }
  logOut(){
      localStorage.clear();
      this.toast.success({detail: "Success Message", summary:"User Logged Out", duration:4000})
      this.router.navigate(['/']);
  }
  deleteIssue(id: any) {
    this.api.deleteIssue(id).subscribe({
      next: (res) => {
        if(window.confirm("Are Sure You Want to Delete this ")){
          this.toast.success({detail: "Success Message", summary:"Deleted Successfully", duration:4000})

          this.getAllIssues();
        }
     
      },
      error: () => {
        this.toast.error({
          detail: 'Error Message',
          summary: 'Error While Deleting Issue',
          duration: 4000,
        });
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  Alldata: any = [];
  getAllIssues() {
    this.api.getIssues().subscribe({
      next: (res) => {
        this.Alldata = res.filter((i: any) => {
          return i.userId == localStorage.getItem('id');
        });
        this.dataSource = new MatTableDataSource(this.Alldata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },

      error: () => {
        this.toast.error({
          detail: 'Error Message',
          summary: 'Error While Fecthing Data',
          duration: 4000,
        });
      },
    });
  }
 
}
