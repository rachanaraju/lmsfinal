import { Router } from '@angular/router';
import { Component, OnInit, NgZone,ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators ,ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import {FormControl} from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
// import { faRedo, faAddressBook, faMoneyCheck, faInfo, faHashtag } from '@fortawesome/free-solid-svg-icons';
import {ViewEncapsulation } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { DepartmentService } from '../../../services/department.service';
import { DesignationService } from '../../../services/designation.service';
import { EmployeeCategoryService } from '../../../services/employee-category.service';
import { CompanyService } from '../../../services/company.service';
import { RoleService } from '../../../services/role.service';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  Createdata: any;
  listdata: MatTableDataSource<any>;
  loaded: boolean;

  // faRedo = faRedo;
  // faMoneyCheck= faMoneyCheck;
  // faAddressBook = faAddressBook;
  // faInfo = faInfo
  // faHashtag = faHashtag;
  employeeCreateForm: FormGroup;
  submitted = false;
  displayFiled = true;
  marked=false;
  returnUrl: "";
  public today = new Date();
  employeeProfile: string[] = ['Finance', 'BDM', 'HR', 'Sales', 'Admin'];
  Employee: any = [];
  gender: string[] = ['Female', 'Male'];
  managers: string[]=['Yes','No'];
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
  successMsg:string;
  filteredOptions: Observable<string[]>;
  department:any=[];
  designation:any=[];
  role:any=[];
  company:any=[];
  employee_category:any=[];
  panelOpenState = false;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private changeDetectorRefs: ChangeDetectorRef,
    private employeeService:EmployeeService,
    private departmentService:DepartmentService,
    private designationService:DesignationService,
    private employeeCategoryService:EmployeeCategoryService,
    private companyService:CompanyService,
    private roleService:RoleService
  ) {
    this.mainForm();
  }
  create() {
    this.router.navigateByUrl('/create-employee');
  }
  emp_id=localStorage.getItem("emp_id");
  password=localStorage.getItem("password");
  readEmployee() {
    this.employeeService.login(this.emp_id,this.password).subscribe((data) => {
      this.Employee = data;
    });
  }
  ngOnInit() {
    this.displayFiled = true;
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
  }
  toggleVisibility(e){
    this.marked= e.target.checked;
  }
  
  mainForm() {
    this.employeeCreateForm = this.fb.group({
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
    });
  }
  resetForm() {
    Swal.fire({
      text: 'Are you sure you want to reset ?',
      width: 300,
      showCancelButton: true,
      cancelButtonText: 'No',
      cancelButtonColor: '#ff0000',
      confirmButtonText: 'Yes',
      confirmButtonColor: '#008000',
    }).then((result) => {
      if (result.value) {
        window.location.reload();
      }
    });
  }
  redirect() {
    Swal.fire({
      text: 'Are you sure you want to cancel it ?',
      width: 300,
      showCancelButton: true,
      cancelButtonText: 'No',
      cancelButtonColor: '#ff0000',
      confirmButtonText: 'Yes',
      confirmButtonColor: '#008000',
    }).then((result) => {
      if (result.value) {
        this.router.navigateByUrl('/create-employee');
      }
    });
  }
  disableEnterKey(e) {
    if (e.keyCode === 13) {
      return false;
    } else {
      return true;
    }
  }

  // Choose designation with select dropdown
  updateProfile(e) {
    this.employeeCreateForm.get('designation').setValue(e, {
      onlySelf: true,
    });
  }

  // Getter to access form control
  get myForm() {
    return this.employeeCreateForm.controls;
  }

  //my change
  // employeeCreate(){
  //   // let id = this.actRoute.snapshot.paramMap.get('user_id');
  //   this.apiService.getLeave().subscribe((data) => {
  //     this.Createdata = data;
  //     this.changeDetectorRefs.detectChanges();
  //     this.listdata= new MatTableDataSource(this.Createdata);
  //     //console.log(this.Users)
  //     this.loaded=false;
  //     console.log(this.Createdata)
  //   })    
  // }


  onSubmit() {
    this.submitted = true;
    console.log("submit pressed")
    // if (!this.employeeCreateForm.valid) {
    //   console.log("problem!!!!")
    //   return false;
    // } 
      console.log("before apiService")
      console.log(this.employeeCreateForm.value)
      this.employeeService.employeeCreate(this.employeeCreateForm.value).subscribe(
        (res) => {
          this.successMsg="Registration successful ";
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
              // window.location.reload();
            }
          });
          this.ngZone.run(() => this.router.navigateByUrl('/employee/employees-list'))
        },
        (error) => {
          console.log(error);
        }
      );
    
  }


}
