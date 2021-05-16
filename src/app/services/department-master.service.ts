import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DepartmentMasterService {
  //baseUri:string = 'https://whispering-caverns-64340.herokuapp.com';
 //baseUri:string = 'http://localhost:3500';
  baseUri:string = 'https://lmsapi1997.herokuapp.com';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor(private http: HttpClient) { }

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  addDepartmentMaster(data): Observable<any> {
    let url = `${this.baseUri}/departmentMaster`;
    return this.http.post(url, data)
    .pipe(
      tap(() =>  {
        this._refreshNeeded$.next();
      })
    );
  }
  getDepartmentMaster() {
    return this.http.get(`${this.baseUri}/departmentMaster`);
  }
  getDepartmentCode(){
    return this.http.get(`${this.baseUri}/departmentCode`)
  }
  getDepartmentMasterById(department_id): Observable<any> {
    let url = `${this.baseUri}/departmentMaster/${department_id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  updateDepartmentMaster(department_id, data): Observable<any> {
    let url = `${this.baseUri}/departmentMaster/${department_id}`;
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
