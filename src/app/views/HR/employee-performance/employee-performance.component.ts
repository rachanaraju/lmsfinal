import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { EmployeePerformanceService } from '../../../services/employee-performance.service';
import { EmployeeService } from '../../../services/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

import { FormControl, NgForm } from '@angular/forms';



@Component({
  selector: 'app-employee-performance',
  templateUrl: './employee-performance.component.html',
  styleUrls: ['./employee-performance.component.css']
})
export class EmployeePerformanceComponent implements OnInit {

  employeePerformanceCreateForm: FormGroup;
  public today = new Date();
  category: any;
  loaded: boolean;
  listdata: MatTableDataSource<any>;
  designation:any=[];
  employee:any=[];
  btnName:string="Submit";
  employee_performanceId:string;
  submitted:boolean;
  successMsg:string;
  displayedColumns: string[] = ['emp_name','assessment_year','performance_rating', 'increment_percentage','bonus_percentage','actions'];
  

  constructor(private fb:FormBuilder, private apiService:ApiService,
    private employeeService:EmployeeService,
    private employeePerformanceService:EmployeePerformanceService,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router
    ) { }

    EmployeePerformance = this.fb.group({
      employee_id:[''],
      assessment_year:[''],    
      performance_rating: [''],  
      increment_percentage: [''],     
      bonus_percentage: [''],
    });

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employee = data;
    });
    this.readCategory();
  }
  resetForm(form: FormGroup) {
    form.reset();
    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null);
    });
    this.btnName="Submit";
  }
  readCategory(){
    this.employeePerformanceService.getPerformance().subscribe((data) => {
      this.category = data;
      this.changeDetectorRefs.detectChanges();
      this.listdata= new MatTableDataSource(this.category);       
      this.loaded=false;
      console.log(this.category)
    })    
  }
  onEditBtnClick(employee_performance_id: string) {
    this.employeePerformanceService.getPerformanceById(employee_performance_id).subscribe(data => {
      console.log(data);
      this.EmployeePerformance.patchValue({         
        employee_id:data[0].employee_id,
        assessment_year:data[0].assessment_year,
        performance_rating:data[0].performance_rating,
        increment_percentage:data[0].increment_percentage,
        bonus_percentage:data[0].bonus_percentage
      
      });
    });
    this.btnName="Update";
    this.employee_performanceId = employee_performance_id;
 
  }
  onDeleteBtnClick(employee_performance_id: string) {
    this.successMsg="Under Progress";
    Swal.fire({
      text: this.successMsg,
      width: 300,
      showCancelButton: false,
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#ff0000',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#008000',
    })
  
  }
  onSubmit() {
    if(this.btnName=="Submit")
    {
    this.submitted = true;
    console.log("submit pressed")
    if (!this.EmployeePerformance.valid) {
      console.log("problem!!!!")
      return false;
    } else {
      console.log("before apiService")
      console.log(this.EmployeePerformance.value)
      this.employeePerformanceService.addPerformance(
        this.EmployeePerformance.value
      ).subscribe(
        (res) => {
          this.successMsg="Employee Performance added successful ";
          console.log('Employee Performance added successfully!');
          this.readCategory();
            this. resetForm(this.EmployeePerformance);
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
            }
          });          
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  else{
    this.employeePerformanceService.updatePerformance(this.employee_performanceId, this.EmployeePerformance.value)
    .subscribe(res => {
    
      console.log('Employee Promotion updated successfully!')
      this.successMsg="Employee Promotion updated successfully ";
      this.readCategory();
      this. resetForm(this.EmployeePerformance);
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
         
        }
      });
     
    }, (error) => {
      console.log(error)
    })
  }
  }


}
