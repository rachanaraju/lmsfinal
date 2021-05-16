import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import { baseUrl } from '../Helper/base';
@Injectable({
  providedIn: 'root'
})
export class CompanyMasterService {
  //baseUri:string = baseUrl;

 //baseUri:string = 'https://whispering-caverns-64340.herokuapp.com';
  //:string = 'http://localhost:3500';
  baseUri:string = 'https://lmsapi1997.herokuapp.com';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor(private http: HttpClient) {
    //console.log(this.baseUri);
   }
  addCompanyMaster(data): Observable<any> {
    let url = `${this.baseUri}/companyMaster`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  } 
  getcompanyMaster(){
    return this.http.get(`${this.baseUri}/companyMaster`)
  }
  getcompanyNames(){
    return this.http.get(`${this.baseUri}/companyMasterCompany`)
  }
  getcompanyMasterById(company_id): Observable<any> {
    let url = `${this.baseUri}/companyMaster/${company_id}`;
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
  updatecompanyMaster(company_id, data): Observable<any> {
    let url = `${this.baseUri}/companyMaster/${company_id}`;
    return this.http
      .put(url, data, {
        headers: {
         
        },
      })
      .pipe(catchError(this.errorMgmt));
  }
  
  getcityFromCompanyMaster(){
     return this.http.get(`${this.baseUri}/employeeMaster`)
  }

  getCompanyRegistrationNumber(){
    return this.http.get(`${this.baseUri}/getCompanyRegistrationNumber`)
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
