
import {AfterViewInit, Component,OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table'
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [ 'username', 'email', 'phone','isUser', 'actions'];
  dataSource!: MatTableDataSource<any>;
  titlename = localStorage.getItem('username');
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort
  constructor( private api: ApiService,
    private router: Router,
    private toast: NgToastService,) { }

  ngOnInit(): void {
    this.getAllUsers();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  logOut(){
    localStorage.clear();
    this.router.navigate(['/']);
    this.toast.info({detail: "Success Message", summary:"Issue Deleted Successfully", duration:4000});

}
  back(){
    this.router.navigate(["/adminIssue"])
  }
 
  deleteUser(id: any) {
    console.log(id);
    this.api.deleteUsers(id).subscribe({
      next: (res) => {
        if(window.confirm("are you sure you want to delete this")){
          this.toast.success({detail: "Success Message", summary:"User Deleted Successfully", duration:4000});

          this.getAllUsers();
        }
      
      },
      error: () => {
        this.toast.error({detail: "Error Message", summary:"Error While Deleting User", duration:4000})

      },
    });
  }
  getAllUsers() {
    this.api.getUsers().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },

      error: () => {
        this.toast.error({detail: "Error Message", summary:"Error While Fetching Data", duration:4000})
      },
    });
  }
}
