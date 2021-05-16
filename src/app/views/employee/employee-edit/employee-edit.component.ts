import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
import {FormControl} from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { EmployeeService } from '../../../services/employee.service';
import { DepartmentService } from '../../../services/department.service';
import { DesignationService } from '../../../services/designation.service';
import { CompanyService } from '../../../services/company.service';
import { EmployeeCategoryService } from '../../../services/employee-category.service';
import { RoleService } from '../../../services/role.service';
// import { faRedo, faAddressBook, faMoneyCheck, faInfo,faHashtag } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  // faRedo = faRedo;
  // faHashtag=faHashtag;
  // faMoneyCheck= faMoneyCheck;
  // faAddressBook = faAddressBook;
  // faInfo = faInfo
  submitted = false;
  editForm: FormGroup;
  employeeProfile: string[] = ['Finance', 'BDM', 'HR', 'Sales', 'Admin'];
  Employee: any = [];
  gender: string[] = ['Female', 'Male'];
  Option: string[] = [
    'O -ve',
    'O +ve',
    'A -ve',
    'A +ve',
    'B -ve',
    'B +ve',
    'AB -ve',
    'AB +ve',
  ];
  public today = new Date();
  filteredOptions: Observable<string[]>;
  panelOpenState = false;
  successMsg:string;
  loaded:boolean;
  department:any=[];
  designation:any=[];
  role:any=[];
  company:any=[];
  employee_category:any=[];
  constructor(
    public fb: FormBuilder,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private router: Router,
    private employeeService:EmployeeService,
    private departmentService:DepartmentService,
    private designationService:DesignationService,
    private companyService:CompanyService,
    private employeeCategoryService:EmployeeCategoryService,
    private roleService:RoleService
  ) {}

  ngOnInit() { 
    this.departmentService.getDepartment().subscribe((data) => {
      this.department = data;
    });
    this.designationService.getDesignation().subscribe((data) => {
      this.designation = data;
    });
    this.roleService.getRole().subscribe((data) => {
      this.role = data;
    });
    this.companyService.getcompanyProfile().subscribe((data) => {
      this.company = data;
    });
    this.employeeCategoryService.getEmployeeCategory().subscribe((data) => {
      this.employee_category = data;
    });
    let id = this.actRoute.snapshot.paramMap.get('employee_id');
    this.loaded=true;
    this.getEmployee(id);
   
    this.editForm = this.fb.group({
      employee_name:["", [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      role_id: [""],     
      department_id:[""],
      designation_id:[""], 
      reporting_manager_id:[""],
      gender:[""],
      company_id:[""],
      nationality:[""],
      marital_status:[""],
      employee_status:[""],
      employee_category_id:[""],
      passport_number:[""],
      designation: ["",[ Validators.pattern("[a-zA-Z ]*")]],
      has_manager:[],
      role:[''],
      base_location: [''],
      hr_point_of_contact_id: [''],
      date_of_birth: [''],
      joining_date: [''],
      aadhar_card_number: [, [Validators.pattern("^[0-9]+$")]],
      pan_card_number: [''],
      blood_group: [''],
      status: ['']
    })
  }

  // Choose options with select-dropdown
  updateProfile(e) {
    this.editForm.get('designation').setValue(e, {
      onlySelf: true
    })
  }

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }

  getEmployee(empid) {
    this.employeeService.getEmployee(empid).subscribe(data => {
      this.editForm.patchValue({
        employee_name:data[0].employee_name,
        role_description: data[0].role_description,
        department_name: data[0].department_name,
        designation_name: data[0].designation_name,
        reporting_manager_id: data[0].reporting_manager_id,
        gender: data[0].gender,
        company_name:data[0].company_name,
        nationality:data[0].nationality,
        marital_status:data[0].marital_status,
        employee_status: data[0].employee_status,
        employee_category:data[0].employee_category,
        passport_number:data[0].passport_number,
        role:data[0].role,
        base_location: data[0].base_location,
        hr_point_of_contact_id: data[0].hr_point_of_contact_id,
        date_of_birth:data[0].date_of_birth,
        joining_date:data[0].joining_date,
        aadhar_card_number: data[0].aadhar_card_number,
        pan_card_number: data[0].pan_card_number,
        blood_group: data[0].blood_group,
        status: data[0].status,
        
      });
     
    });
   
  }


  onSubmit() {
    this.submitted = true;
    // if (!this.editForm.valid) {
    //   console.log("problem!!")
    //   return false;
    // } else {
        let id = this.actRoute.snapshot.paramMap.get('employee_id');
        this.employeeService.updateEmployee(id, this.editForm.value)
          .subscribe(res => {
            //  this.router.navigateByUrl('/employees-list');
            console.log('Content updated successfully!')
            this.successMsg="Content updated successfully ";
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
                // window.location.reload();
              }
            });
            this.ngZone.run(() => this.router.navigateByUrl('/employees-list'))
          }, (error) => {
            console.log(error)
          })
    
  }
 
 

}