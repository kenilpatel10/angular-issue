import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../../addIssue dialog/dialog.component';
import { ApiService } from '../../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-screen',
  templateUrl: './admin-screen.component.html',
  styleUrls: ['./admin-screen.component.css']
})
export class AdminScreenComponent implements OnInit {

  titlename = localStorage.getItem('username');
  displayedColumns: string[] = [
    'image',
    'title',
    'description',
    'status',
    'actions',
  ];
  dataSource!: MatTableDataSource<any>;
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
showUsers(){
  this.router.navigate(['/users']);
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
  logOut(){
      localStorage.clear();
      this.router.navigate(['/']);
      this.toast.success({detail: "Success Message", summary:"Admin Logged Out Successfully", duration:4000});

  }
 
  deleteIssue(id: any) {
    console.log(id);
    this.api.deleteIssue(id).subscribe({
      next: (res) => {
        if(window.confirm("Are you Sure, you want to delete this??")){
          this.toast.success({detail: "Success Message", summary:"Issue Deleted Successfully", duration:4000});
          this.getAllIssues();
        }
  
      },
      error: () => {
        this.toast.error({detail: "Error Message", summary:"Error While Deleting Issue", duration:4000})
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
        this.Alldata = res;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: () => {
        this.toast.error({detail: "Error Message", summary:"Error While Fetching Data", duration:4000})

      },
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
}

