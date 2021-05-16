import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { EmployeeService } from '../../../services/employee.service';
import { QualificationSpecializationService } from '../../../services/qualification-specialization.service';
import { QualificationTypeService } from '../../../services/qualification-type.service';
import {EmployeeQualificationService} from '../../../services/employee-qualification.service'
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employee-qualification',
  templateUrl: './employee-qualification.component.html',
  styleUrls: ['./employee-qualification.component.css']
})
export class EmployeeQualificationComponent implements OnInit {

  employeeQualificationCreateForm: FormGroup;
  public today = new Date();
  category: any;
  loaded: boolean;
  listdata: MatTableDataSource<any>;
  designation:any=[];  
  btnName:string="Submit"; 
  successMsg:string;
  employee_qualificationId:string;
  displayedColumns: string[] = ['employee_name','qualification_type','qualification_specialization_type','year_of_pass','specialization','institute_name','university','grade','actions'];
   
  constructor(
    private fb:FormBuilder, 
    private apiService:ApiService, 
    private employeeService:EmployeeService, 
    private quailificationTypeService:QualificationTypeService,
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef,
    private qualificationSpecializationService:QualificationSpecializationService,
    private employeeQualificationService:EmployeeQualificationService
    ) { }

    employee:any=[];
    qualification_type:any=[];
    qualification_spec:any=[]
    submitted:boolean;   

    EmployeeQualification = this.fb.group({
    employee_id:[''],
    qualification_type_id:[''],    
    qualification_specialization_id: [''],   
    specialization: [''],
    year_of_pass: [''],
    institute_name: [''],
    university:[''],
    grade:['']
  });

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employee = data;
    });
    this.quailificationTypeService.getQualificationType().subscribe((data) => {
      this.qualification_type = data;
    });
    this.qualificationSpecializationService.getQualificationSpecialization().subscribe((data) => {
      this.qualification_spec = data;
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
    this.employeeQualificationService.getEmployeeQualification().subscribe((data) => {
      this.category = data;
      this.changeDetectorRefs.detectChanges();
      this.listdata= new MatTableDataSource(this.category);       
      this.loaded=false;
      console.log(this.category)
    })    
  }
  onEditBtnClick(employee_qualification_id: string) {
    this.employeeQualificationService.getEmployeeQualificationById(employee_qualification_id).subscribe(data => {
      console.log(data);
      this.EmployeeQualification.patchValue({         
        employee_id:data[0].employee_id,
        qualification_type_id:data[0].qualification_type_id,
        qualification_specialization_id:data[0].qualification_specialization_id,
        year_of_pass:data[0].year_of_pass,
        specialization:data[0].specialization,
        institute_name:data[0].institute_name,
        university:data[0].university,
        grade:data[0].grade      
      });
    });
    this.btnName="Update";
    this.employee_qualificationId = employee_qualification_id;
 
  }
  onDeleteBtnClick(employee_qualification_id: string) {
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
  onSubmit() 
  {
    if(this.btnName=="Submit")
    {
    this.submitted = true;
    console.log("submit pressed")
    if (!this.EmployeeQualification.valid) {
      console.log("problem!!!!")
      return false;
    } else {
      console.log("before apiService")
      console.log(this.EmployeeQualification.value)
      this.employeeQualificationService.addEmployeeQualification(
        this.EmployeeQualification.value
      ).subscribe(
        (res) => {
          this.successMsg="Employee Qualification added successful ";
          console.log('Employee Qualification added successfully!');
          this.readCategory();
          this. resetForm(this.EmployeeQualification);
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
    this.employeeQualificationService.updateEmployeeQualification(this.employee_qualificationId, this.EmployeeQualification.value)
    .subscribe(res => {
    
      console.log('Employee Qualification updated successfully!')
      this.successMsg="Employee Qualification updated successfully ";
      this.readCategory();
      this. resetForm(this.EmployeeQualification);
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

