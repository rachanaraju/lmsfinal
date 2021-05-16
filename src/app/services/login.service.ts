// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class LoginMasterService {

//   constructor() { }
// }




import { Injectable } from '@angular/core';  
import {HttpClient} from '@angular/common/http';  
import {HttpHeaders} from '@angular/common/http';  
import { from, Observable ,throwError } from 'rxjs';  
import {  HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
// import { Register } from "../app/register";  
@Injectable({  
  providedIn: 'root'  
})  
export class LoginService  {  
  //baseUri:string = 'http://localhost:3500';
  baseUri:string = 'https://lmsapi1997.herokuapp.com';
  token : string;  
  header : any;  
  // constructor(private http : HttpClient) {   
  
  //   // this.Url = 'http://localhost:14812/api/Login/';  
  //   // this.Url ='http://localhost:3500';
    
  //   const headerSettings: {[name: string]: string | string[]; } = {};  
  //   this.header = new HttpHeaders(headerSettings);  
  // }  
  // Login(model : any){  
  //   debugger;  
  //    var a =this.Url+'UserLogin';  
  //  return this.http.post<any>(this.Url+'UserLogin',model,{ headers: this.header});  
  // }  


  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor(private http: HttpClient) { }
  Login(data): Observable<any> {
    let url = `${this.baseUri}/login`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
//    CreateUser(register:Register)  
//    {  
//     const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };  
//     return this.http.post<Register[]>(this.Url + '/createcontact/', register, httpOptions)  
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
