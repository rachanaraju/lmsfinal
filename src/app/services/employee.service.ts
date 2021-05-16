import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  //baseUri:string = 'https://whispering-caverns-64340.herokuapp.com';
 // baseUri:string = 'http://localhost:3500';
  baseUri:string = 'https://lmsapi1997.herokuapp.com';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor(private http: HttpClient) { }

  employeeCreate(data): Observable<any>{
    let url = `${this.baseUri}/employeeProfile`;
    console.log(url);
    return this.http.post(url, data).pipe(
      catchError(this.errorMgmt)
    )
  }
  login(emp_id,password) {
    let url = `${this.baseUri}/login`;
    console.log(emp_id,password)
    return this.http
      .post(url, {emp_id,password})
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      ) 
  }
  
  getEmployees() {
    return this.http.get(`${this.baseUri}/employeeProfile`);
  }
  getEmployee(empid): Observable<any> {
    let url = `${this.baseUri}/employeeProfile/${empid}`;
    console.log("url value is:::" + url);
    return this.http
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          // "X-auth-header": JSON.parse(
          //   window.localStorage.getItem("currentUser")
          // ),
        },
      })
      .pipe(
        map((res: Response) => {
          console.log("response from get by id:::" + JSON.stringify(res));
          return res;
        }),
        catchError(this.errorMgmt)
      );
  }
  updateEmployee(empid, data): Observable<any> {
    let url = `${this.baseUri}/employeeProfile/${empid}`;
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
