import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leave-apply',
  templateUrl: './leave-apply.component.html',
  styleUrls: ['./leave-apply.component.scss']
})
export class LeaveApplyComponent implements OnInit {

  public today = new Date();
  public userNames:any=['hrishi','neha','hrishikesh'];
  Option:any=['Sick','Casual','Flexi']
  successMsg:string="";

  constructor(private fb:FormBuilder, private apiService:ApiService,
    private router: Router
    ) { }
  LeaveApplyForm = this.fb.group({
    emp_name:[''],    
    leave_type: [''],      
    leave_desc: [''],
    start_date: [''],
    end_date: [''],
  });

  Employee:any=[];
  emp_id=localStorage.getItem("emp_id");
  password=localStorage.getItem("password");
  emp_name=localStorage.getItem("emp_name");
  ngOnInit(): void {
 
    this.LeaveApplyForm.patchValue({
      emp_name: this.emp_name
    });
   
  }
  
  onSubmit() {
    console.log("submit pressed")
   
    if (!this.LeaveApplyForm.valid) {
      console.log("problem!!!!")
      return false;
    } else {
      console.log("before apiService")
      
      this.apiService.addLeave(
        {emp_name:this.LeaveApplyForm.get("emp_name").value,
      emp_id:this.emp_id,
      leave_type:this.LeaveApplyForm.get("leave_type").value,
      leave_desc:this.LeaveApplyForm.get("leave_desc").value,
      start_date:this.LeaveApplyForm.get("start_date").value,
      end_date:this.LeaveApplyForm.get("end_date").value,}
      
      ).subscribe(
        (res) => {
          this.successMsg="Leave Added";
          console.log('Employee successfully created!');
          Swal.fire({
            text: this.successMsg,
            width: 300,
            showCancelButton: false,
            cancelButtonText: 'Cancel',
            cancelButtonColor: '#ff0000',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#008000',
          }).then((result) => {
            if (result.value) {
              this.router.navigateByUrl('/leave-history');
            
            }
          });
          // this.ngZone.run(() => this.router.navigateByUrl('/employees-list'))
        },
        (error) => {
          console.log(error);
        }
      );
    
    }
  }

}


