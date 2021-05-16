// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class EmployeeLeaveService {

//   constructor() { }
// }
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class EmployeeLeaveService {
  //baseUri:string = 'https://whispering-caverns-64340.herokuapp.com';
  //baseUri:string = 'https://lmsapi1997.herokuapp.com';
  baseUri:string = 'https://lmsapi1997.herokuapp.com';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor(private http: HttpClient) { }

  addEmployee(data): Observable<any> {
    let url = `${this.baseUri}/EmployeeLeave`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  
  getEmployee() {
    return this.http.get(`${this.baseUri}/EmployeeLeave`);
  }
  getEmployeeById(user_id): Observable<any> {
    let url = `${this.baseUri}/EmployeeLeave/${user_id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  getemployeeLeaveByManagerId(manager_id): Observable<any> {
    let url = `${this.baseUri}/EmployeeLeaveByManager/${manager_id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  getemployeeLeaveByEmployeeId(employee_id): Observable<any> {
    let url = `${this.baseUri}/EmployeeLeaveByEmployee/${employee_id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  updateEmployeeLeaveById(employee_leave_id, data): Observable<any> {
    let url = `${this.baseUri}/EmployeeLeave/${employee_leave_id}`;
    return this.http
      .put(url, data, {
        headers: {
          // "Content-Type": "application/json",
          // "X-auth-header": JSON.parse(
          //   window.localStorage.getItem("currentUser")
          // ),
        },
      })
      .pipe(catchError(this.errorMgmt));
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
