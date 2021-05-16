import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  //baseUri:string = 'https://whispering-caverns-64340.herokuapp.com';
 // baseUri:string = 'http://localhost:3500';
  baseUri:string = 'https://lmsapi1997.herokuapp.com';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor(private http: HttpClient) { }

  companyProfile(data):Observable<any>{
    let url = `${this.baseUri}/companyProfile`;
    console.log(url);
    return this.http.post(url, data).pipe(
      catchError(this.errorMgmt)
    )
  }
  getcompanyProfile(){
    return this.http.get(`${this.baseUri}/companyProfile`)
  }
  
  
  companyEdit(companyid): Observable<any> {
    let url = `${this.baseUri}/companyProfile/${companyid}`;
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
  updatecompanyProfile(department_id, data): Observable<any> {
    let url = `${this.baseUri}/companyProfile/${department_id}`;
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
