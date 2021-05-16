import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators'
import { baseUrl } from '../Helper/base';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //baseUri:string = baseUrl;
  //baseUri:string = 'https://whispering-caverns-64340.herokuapp.com';
 // baseUri:string = 'http://localhost:3500';
  baseUri:string = 'https://lmsapi1997.herokuapp.com';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor(private http: HttpClient) { }

  addLeave(data): Observable<any> {
    let url = `${this.baseUri}/leave`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  getLeave() {
    return this.http.get(`${this.baseUri}/getLeave`);
  }
  getEmployees() {
    return this.http.get(`${this.baseUri}/getAll`);
  }
  getLeaveList(id): Observable<any> {
    let url = `${this.baseUri}/leaveList/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  updateLeave(leave_id, data): Observable<any> {
    let url = `${this.baseUri}/update/${leave_id}`;
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
  updateStatus(leave_id, data): Observable<any> {
    let url = `${this.baseUri}/updateStatus/${leave_id}`;
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
  deleteLeave(id): Observable<any> {
    let url = `${this.baseUri}/delete/${id}`;
    console.log(url);
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }
  
 
  getEmployeeLeaveList(id): Observable<any> {
    let url = `${this.baseUri}/leaveByManagerId/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  getLeaveById(emp_id): Observable<any> {
    let url = `${this.baseUri}/getLeave/${emp_id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
 
  getRole() {
    return this.http.get(`${this.baseUri}/role`);
  }
  
  sendCred(cred){
    return this.http.post(`${this.baseUri}/otp-generate`,cred)
  }
  sendOtp(otp,secret){
    return this.http.post(`${this.baseUri}/otp-validate/${secret}`,otp)
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
