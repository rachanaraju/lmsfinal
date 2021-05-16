import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class EmployeeMasterService {
  //baseUri:string = 'https://whispering-caverns-64340.herokuapp.com';
  //baseUri:string = 'http://localhost:3500';
  baseUri:string = 'https://lmsapi1997.herokuapp.com';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  employeeMasterCreate(data): Observable<any>{
    let url = `${this.baseUri}/employeeMaster`;
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
  
  getEmployeeMaster() {
    return this.http.get(`${this.baseUri}/employeeMaster`);
  }
//   getEmployeeCode() {
//   return this.http.get(`${this.baseUri}/employeeMasterCode`);
// }
getEmployeeCode(){
  return this.http.get(`${this.baseUri}/getEmployeeCode`)
}
  getEmployeeMasterById(empid): Observable<any> {
    let url = `${this.baseUri}/employeeMaster/${empid}`;
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
  updateEmployeeMaster(empid, data): Observable<any> {
    let url = `${this.baseUri}/employeeMaster/${empid}`;
    return this.http
      .put(url, data, {
        headers: {        
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
