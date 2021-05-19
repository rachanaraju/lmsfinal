import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { EmployeeMasterService } from '../../../services/employee-master.service';
import { DepartmentMasterService } from '../../../services/department-master.service';
import { CompanyMasterService } from '../../../services/company-master.service';
import { DesignationService } from '../../../services/designation.service';
import { EmployeeCategoryService } from '../../../services/employee-category.service';
import { RoleService } from '../../../services/role.service';
import { QualificationTypeService } from '../../../services/qualification-type.service';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { CompanyBranchService } from '../../../services/company-branch.service';

@Component({
  selector: 'app-employee-master',
  templateUrl: './employee-master.component.html',
  styleUrls: ['./employee-master.component.css']
})
export class EmployeeMasterComponent implements OnInit {
  favoriteSeason: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
  employeeStatus:any=['Active','In-Active'];
  payrollStatus:any=['Confirmed','Notice-Period','Probationary'];
  genders: any= ['Female', 'Male'];
  bloodGroups: any= [
    'O -ve',
    'O +ve',
    'A -ve',
    'A +ve',
    'B -ve',
    'B +ve',
    'AB -ve',
    'AB +ve',
  ];
  id_proofs: any= ['PAN Card','Driving Licence'];
  address_proofs: any= ['Aadhar Card','Voter ID'];
  maritalStatus: any= ['Single', 'Married', 'Divorced','Widowed'];
  nationalityList: any= ['Afghans','Americans','Austrians','Bahrainis','Belgian','British','Indian','Pakistanis','Tibetans'];
  verification_checks: any=['Yes','No'];
  submitted = false;
  successMsg:string;
  category: any;
  listdata: MatTableDataSource<any>;
  btnName:string="Submit";
  employeeId:string;
  department:any=[];
  employee:any=[];
  reporting_manager_id:any=[];
  designation:any=[];
  role:any=[];
  company:any=[];
  locationName:any=[];
  employee_category:any=[];
  id: string;
  employee_code:any;
  qualification_type:any=[]
  
  displayedColumns: string[] = [ 'employee_fname','designation_name','department_name','role_description','actions'];
  emailPattern = new RegExp(/^[a-zA-z][a-zA-Z0-9._-]{2,64}@[a-zA-Z0-9-]{2,240}\.[a-zA-Z]{2,3}(\.[a-zA-Z]{2})?$/);
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private changeDetectorRefs: ChangeDetectorRef,
    private apiService: ApiService,
   //private employeeCodeService:EmployeeCodeService,
    private employeeMasterService:EmployeeMasterService,
    private departmentMasterService:DepartmentMasterService,
    private designationService:DesignationService,
    private employeeCategoryService:EmployeeCategoryService,
    private companyMasterService:CompanyMasterService,
    private companyBranchService:CompanyBranchService,
    private roleService:RoleService,
    private qualificationTypeService: QualificationTypeService
  )  { }
  
  employeeMasterForm = this.fb.group({
     
      employee_id:[''],    
      employee_fname: ['', [Validators.required, Validators.pattern('^[a-zA-Z, ]*$')]],    
      employee_mname: ['', [, Validators.pattern('^[a-zA-Z, ]*$')]],  
      employee_lname: ['', [Validators.required, Validators.pattern('^[a-zA-Z, ]*$')]],  
      employee_code:['',Validators.required],
      role_id: ['',Validators.required],     
      department_id:['',Validators.required],
      designation_id:['',Validators.required], 
      reporting_manager_id: ['',Validators.required],
      date_of_birth: ['',Validators.required],
      gender:['',Validators.required],     
      joining_date: ['',Validators.required],
      nationality:['',Validators.required],
      emp_photo:[''],
      marital_status:['',Validators.required],
      blood_group: [''], 
      employee_status:[''],
      payroll_status:['',Validators.required],
      base_location: ['',Validators.required],
      background_verification_check:['',Validators.required],
      id_proof:['',Validators.required],
      address_proof:['',Validators.required],
      employee_category_id:[''],
      aadhar_card_number: ['',[Validators.pattern('[0-9]{12}')]],
      pan_card_number: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9, ]*$')]], 
      passport_number:[''],
      email_id: ['', [Validators.pattern(this.emailPattern), Validators.required]],
      passport_issued_date:[''],
      passport_expiry_date:[''],
      background_verification_date:['',Validators.required],
      background_verification_done_by:['', [Validators.required, Validators.pattern('^[a-zA-Z, ]*$')]],  
      qualification_id:['',Validators.required] ,
      year_of_pass: ['',[Validators.required, Validators.pattern("^[0-9]+$")]],
      specialization:['', Validators.required],  
      institute_name:['', [Validators.required, Validators.pattern('^[a-zA-Z, ]*$')]],  
      university:['',[Validators.required, Validators.pattern('^[a-zA-Z, ]*$')]],
      grade:['']
           
    });
    
    nationality=new FormControl();
  filteredOptions: Observable<string[]>;
  ngOnInit(): void {
    // let data = require('npm-nationality-list');
    // console.log(data.getList());
    this.filteredOptions=this.employeeMasterForm.controls.nationality.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    )

    // this.filteredOptions=this.nationality.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value))
    // );

    this.departmentMasterService.getDepartmentMaster().subscribe((data) => {
      this.department = data;
    });
    this.designationService.getDesignation().subscribe((data) => {
      this.designation = data;
    });
    this.roleService.getRole().subscribe((data) => {
      this.role = data;
    });
    this.companyBranchService.getcompanyBranch().subscribe((data) => {
      console.log(data+"from companymaster service")
      this.locationName = data;        
    });
    this.employeeCategoryService.getEmployeeCategory().subscribe((data) => {
      this.employee_category = data;
    });
    this.employeeMasterService.getEmployeeMaster().subscribe((data) => {
      this.employee = data;
      console.log(this.employee);
    });
    this.qualificationTypeService.getAllQualifications().subscribe((data) => {
      this.qualification_type = data;
    });


    this.readCategory(); 
    this.getEmployeeCode();
  }

  // private _filter(value: any): any[]{
  //   return this.nationalityList.filter(option =>
  //     option.name.toLowerCase().includes(value.toLowerCase())
  //     );
  // }

 private _filter(value: any): any[]{
    const filterValue=value.toLowerCase();
    return this.nationalityList.filter(option =>
      option.toLowerCase().includes(filterValue));
  }
  displayFn(subject){
    return subject ? subject : undefined;
    }
  getEmployeeCode() {
    this.employeeMasterService.getEmployeeCode().subscribe(data => {     
      this.employeeMasterForm.patchValue({
        employee_code:data
      });     
    });   
  }

  

  qualificationValidation(){
   
    let yearpassValue = this.employeeMasterForm.get("year_of_pass").value;
    console.log(yearpassValue+"yearpassValue")
    let specializationValue = this.employeeMasterForm.get("specialization").value;
    console.log(specializationValue+"specializationValue")
    let instituteValue = this.employeeMasterForm.get("institute_name").value;
    console.log(instituteValue+"instituteValue")
    let universityValue = this.employeeMasterForm.get("university").value;
    console.log(universityValue+"universityValue")
    let gardeValue = this.employeeMasterForm.get("grade").value;
    console.log(gardeValue+"gardeValue")
    let qualificationValue = this.employeeMasterForm.get("qualification_id").value;
    console.log(qualificationValue+"qualificationValue")
     
    if((yearpassValue != "" || null) || (specializationValue != "" || null) || (instituteValue != "" || null) || (universityValue != "" || null) || (gardeValue != "" || null))
    {
  
      if(qualificationValue == null || ""){              
        Swal.fire({
          icon: 'warning',
          title: 'Validation Alert...',
          text: 'Select Qualification Type!'     
        })
        return false;
      }
    }
  }
  onSubmit() {
    
    console.log(this.employeeMasterForm.get("nationality").value+"nationality")
   if(this.employeeMasterForm.valid){
      let result = this.qualificationValidation();     
     if(result != false){     
          if(this.btnName=="Submit")
          {   
            console.log(this.employeeMasterForm.value)
            this.employeeMasterService.employeeMasterCreate(this.employeeMasterForm.value).subscribe(
              (res) => {
                this.successMsg="Employee successfully created ";
                console.log('Employee successfully created!');
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Employee added successfully',
                  showConfirmButton: false,
                  timer: 1500
                })
                .then((result) => {
                  if (result.value) {              
                  }
                });
                this.readCategory();
                this.resetForm(this.employeeMasterForm);
                this.getEmployeeCode();
              },
              (error) => {
                console.log(error);
              }
            );    
          }
          else {
            let result1 = this.qualificationValidation();  
            //alert(result1)   
            if(result1 != false){  
                this.employeeMasterService.updateEmployeeMaster(this.employeeId, this.employeeMasterForm.value)
                .subscribe(res => {      
                  console.log('Employee updated successfully!')
                  this.successMsg="Employee updated successfully ";
                  this.readCategory();
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Employee updated successfully',
                    showConfirmButton: false,
                    timer: 1500
                  }).then((result) => {
                    if (result.value) {
                    
                    }
                  });
                  this.resetForm(this.employeeMasterForm);
                  this.readCategory();     
                  this.getEmployeeCode();
                }, (error) => {
                  console.log(error)
                })
              }//if stmt end
              else{
                Swal.fire({
                  icon: 'warning',
                  title: 'Validation Alert...',
                  text: 'Select Qualification Type!'     
                })
              }
         
          }    
      }//qualification validation end
      else{
        Swal.fire({
          icon: 'warning',
          title: 'Validation Alert...',
          text: 'Select Qualification Type!'     
        })
      }
    }//employeeMasterForm validation end
else{ 
  Swal.fire({
    icon: 'warning',
    title: 'Validation Alert...',
    text: 'Please Enter mandatory fields!'     
  })
 }
}
readCategory(){
  this.employeeMasterService.getEmployeeMaster().subscribe((data) => {
    this.category = data;
    console.log(data);
    this.changeDetectorRefs.detectChanges();
    this.listdata= new MatTableDataSource(this.category);       
    console.log(this.category);

  })    
}
onEditBtnClick(employee_id: string) {
  this.employeeMasterService.getEmployeeMasterById(employee_id).subscribe(data => {   
    console.log(data[0].employee_education_id);   
    this.employeeMasterForm.patchValue({  
      
      employee_fname:data[0].employee_fname,
      employee_mname:data[0].employee_mname,
      employee_lname:data[0].employee_lname,
      employee_code:data[0].employee_code, 
      role_id: data[0].role_id,
      department_id: data[0].department_id,  
      designation_id: data[0].designation_id,
      reporting_manager_id: data[0].reporting_manager_id,
      date_of_birth:data[0].date_of_birth,
      gender: data[0].gender,
      joining_date:data[0].joining_date,
      nationality:data[0].nationality,
      emp_photo:data[0].emp_photo,
      marital_status:data[0].marital_status,
      blood_group: data[0].blood_group,
      employee_status: data[0].employee_status,
      payroll_status:data[0].payroll_status,
      base_location: data[0].base_location,
      background_verification_check:data[0].background_verification_check,
      id_proof:data[0].id_proof,
      address_proof:data[0].address_proof,
      employee_category_id:data[0].employee_category_id,
      aadhar_card_number: data[0].aadhar_card_number,  
      email_id:data[0].email_id,   
      pan_card_number: data[0].pan_card_number,
      passport_number:data[0].passport_number ,
      background_verification_date:data[0].background_verification_date,
      background_verification_done_by:data[0].background_verification_done_by,
      employee_education_id:data[0].employee_education_id,
      qualification_id:data[0].qualification_id,
      year_of_pass:data[0].year_of_pass,
      specialization:data[0].specialization,
      institute_name:data[0].institute_name,
      university:data[0].university,
      grade:data[0].grade   

    });  
   
  });
  this.btnName="Update";
    this.employeeId=employee_id;
    
}
resetForm(form: FormGroup) {
  form.reset();    
  Object.keys(form.controls).forEach(key => {
    form.get(key).setErrors(null);
  });
  this.btnName="Submit";
  this.getEmployeeCode();
} 
applyFilter(filterValue: string) {
  this.listdata.filter = filterValue.trim().toLowerCase();
  if (this.listdata.paginator) {
    this.listdata.paginator.firstPage();
  }
}
onSearchClear(){     
  this.id="" ;
  this.applyFilter("");
}

}
