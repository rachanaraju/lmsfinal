// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-login-master',
//   templateUrl: './login-master.component.html',
//   styleUrls: ['./login-master.component.css']
// })
// export class LoginMasterComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }


import { Component, OnInit } from '@angular/core';    
import { Router } from '@angular/router';    
// import {LoginMasterService } from '../LoginMasterService.service';  
import { LoginService } from '../../services/login.service';  
 import { FormsModule } from '@angular/forms';    
import Swal from 'sweetalert2';
  
@Component({    
  selector: 'app-login',    
  templateUrl: './login.component.html',    
  styleUrls: ['./login.component.css']    
})    
export class LoginComponent implements OnInit { 
    
  model : any={};    
result:any={};
  errorMessage:string;    
  constructor(private router:Router,private LoginService:LoginService) { }    
    
    
  ngOnInit() {    
    // sessionStorage.removeItem('user_name');    
    // sessionStorage.clear();    
  }    
  onLogin(){     
    this.LoginService.Login(this.model).subscribe(    
      data => {    
        // debugger;
        // alert(data)
        console.log(data)  

        if(data.status=="success")    
        {     
          localStorage.setItem("user_id",data.user_id);
          Swal.fire({
            title:'Login successfull',
          })
          this.router.navigate(['/HR']);    
          // debugger;    
        }    
        else{  
            
          this.errorMessage = data.message;    
        }    
      },    
      error => {  
        
          Swal.fire({
            icon:'warning',
            title:' Alert...',
            text:'Please Enter correct Username and Password'
          })
        
         
        this.errorMessage = error.message;    
      });    
  };    
 }  
