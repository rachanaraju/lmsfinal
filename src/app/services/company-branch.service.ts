import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})

  export class CompanyBranchService {
    //baseUri:string = 'https://whispering-caverns-64340.herokuapp.com';
    //baseUri:string = 'http://localhost:3500';
    baseUri:string = 'https://lmsapi1997.herokuapp.com';
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    constructor(private http: HttpClient) { }

  addcompanyBranch(data): Observable<any> {
    let url = `${this.baseUri}/companyBranch`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  } 
  getcompanyBranch(){
    return this.http.get(`${this.baseUri}/companyBranch`)
  }
  getBranchCode(){
    return this.http.get(`${this.baseUri}/companyBranchCode`)
  }

  getcompanyBranchById(branch_id): Observable<any> {
    let url = `${this.baseUri}/companyBranch/${branch_id}`;
    console.log("url value is:::" + url);
    return this.http
      .get(url, {
        headers: {
          "Content-Type": "application/json",          
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
  updatecompanyBranch(branch_id, data): Observable<any> {
    let url = `${this.baseUri}/companyBranch/${branch_id}`;
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
