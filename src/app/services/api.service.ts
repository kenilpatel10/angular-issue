import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {

   }
   postIssue(data : any){

    return this.http.post<any>("https://angular-issue.herokuapp.com/data",data);
  }
  getIssues(){
    return this.http.get<any>("https://angular-issue.herokuapp.com/data");
  }
  getIssue(id : any){
    return this.http.get<any>(`https://angular-issue.herokuapp.com/data/${id}`);
  }
  putIssue( id : any,data: any ){
    return this.http.put<any>(`https://angular-issue.herokuapp.com/data/${id}`, data);
  }
  deleteIssue(id: any){

    return this.http.delete<any>(`https://angular-issue.herokuapp.com/data/${id}`);
  }
  postUser(data: any){
    return this.http.post<any>('https://angular-issue.herokuapp.com/register', data).pipe(catchError(this.errorHandler));
  }
  postLogin(data: any){
    return this.http.post<any>('https://angular-issue.herokuapp.com/login', data).pipe(catchError(this.errorHandler));

  }
  getUsers(){
    return this.http.get<any>(`https://angular-issue.herokuapp.com/users`);
  }
  deleteUsers(id:any){
    return this.http.delete<any>(`https://angular-issue.herokuapp.com/users/${id}`);
  }
  errorHandler(error: HttpErrorResponse): Observable<any>{
    return throwError(error.error.message || "SERVER ERROR")
  }
}
