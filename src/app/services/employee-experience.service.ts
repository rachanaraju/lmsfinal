import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class EmployeeExperienceService {
 // baseUri:string = 'https://whispering-caverns-64340.herokuapp.com';
//baseUri:string = 'http://localhost:3500';
  baseUri:string = 'https://lmsapi1997.herokuapp.com';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor(private http: HttpClient) { }

  addemployeeExperience(data): Observable<any> {
    let url = `${this.baseUri}/employeeExperience`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  getemployeeExperience() {
    return this.http.get(`${this.baseUri}/employeeExperience`);
  }
  getemployeeExperienceById(employee_experience_id): Observable<any> {
    let url = `${this.baseUri}/employeeExperience/${employee_experience_id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  updateemployeeExperienceById(employee_experience_id, data): Observable<any> {
    let url = `${this.baseUri}/employeeExperience/${employee_experience_id}`;
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
