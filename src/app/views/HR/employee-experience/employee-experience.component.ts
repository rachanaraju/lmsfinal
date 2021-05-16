import { MatTableDataSource } from '@angular/material/table';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { EmployeeExperienceService } from '../../../services/employee-experience.service';
import { EmployeeService } from '../../../services/employee.service';
import { EmployeeMasterService } from '../../../services/employee-master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-experience',
  templateUrl: './employee-experience.component.html',
  styleUrls: ['./employee-experience.component.css']
})
export class EmployeeExperienceComponent implements OnInit {

  // employeeExperienceCreateForm: FormGroup;
  public today = new Date();
  category: any;
  loaded: boolean;
  listdata: MatTableDataSource<any>;
  designation:any=[];
  employee:any=[];
  btnName:string="Submit";
  employee_experienceId:string;
  successMsg:string;
  displayedColumns: string[] = ['emp_name','previous_company_name','previous_company_designation',  'prevoius_experience_start_date','prevoius_experience_end_date','employee_remarks','actions'];
 
  constructor( private fb:FormBuilder, 
    private apiService:ApiService,
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef,
    private employeeExperienceService: EmployeeExperienceService,
    private actRoute: ActivatedRoute, 
    private ngZone: NgZone,  
    private employeeService: EmployeeService,
    private employeeMasterService: EmployeeMasterService
    ) { }

  EmployeeExperience = this.fb.group({
    employee_id:['',Validators.required],
    previous_company_name:['', [, Validators.pattern('^[a-zA-Z, ]*$')]],  
    previous_company_designation: ['', [, Validators.pattern('^[a-zA-Z, ]*$')]],  
    previous_experience_start_date: [''],
    previous_experience_end_date: [''],
    remarks:['']

  });
  resetForm(form: FormGroup) {
    form.reset();
    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null);
    });
    this.btnName="Submit";
  }
  ngOnInit(): void {    
    // this.employeeService.getEmployees().subscribe((data) => {
    //   this.employee = data;
    // });
    this.employeeMasterService.getEmployeeMaster().subscribe((data) => {
      //console.log(data+"from employee service")
      this.employee = data;
    });
    this.readCategory();
  }
  readCategory(){
    this.employeeExperienceService.getemployeeExperience().subscribe((data) => {
      this.category = data;
      this.changeDetectorRefs.detectChanges();
      this.listdata= new MatTableDataSource(this.category);  
      //console.log('HIIII'+this.listdata);
      this.loaded=false;
      console.log(this.category)
    })    
  }
  onEditBtnClick(employee_experience_id: string) {
    this.employeeExperienceService.getemployeeExperienceById(employee_experience_id).subscribe(data => {
      console.log(data);
      this.EmployeeExperience.patchValue({         
        employee_id:data[0].employee_id,
        previous_company_name:data[0].previous_company_name,
        previous_company_designation:data[0].previous_company_designation,
        previous_experience_start_date:data[0].previous_experience_start_date,
        previous_experience_end_date:data[0].previous_experience_end_date,  
        remarks:data[0].remarks
      });
    });
    this.btnName="Update";
    this.employee_experienceId = employee_experience_id;
 
  }
  onDeleteBtnClick(employee_experience_id: string) {
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
    //let yearpassValue = ;
    console.log(this.EmployeeExperience.get("employee_id").value+"employee_id")
    console.log(this.EmployeeExperience.get("previous_company_name").value+"previous_company_name")
    console.log(this.EmployeeExperience.get("previous_company_designation").value+"previous_company_designation")
    console.log(this.EmployeeExperience.get("previous_experience_start_date").value+"prevoius_experience_start_date")
    console.log(this.EmployeeExperience.get("previous_experience_end_date").value+"prevoius_experience_end_date")
    console.log(this.EmployeeExperience.get("remarks").value+"remarks")
    if(this.EmployeeExperience.valid){
    if(this.btnName=="Submit")
    {
      console.log("submit pressed") 
      console.log("before apiService")
      console.log(this.EmployeeExperience.value)
      this.employeeExperienceService.addemployeeExperience(this.EmployeeExperience.value).subscribe(
        (res) => {
          this.successMsg="Employee Experience added successful ";
          console.log('Employee Experience added successfully!');
          this.readCategory();
          this. resetForm(this.EmployeeExperience);
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

  

  else{
    this.employeeExperienceService.updateemployeeExperienceById(this.employee_experienceId, this.EmployeeExperience.value)
    .subscribe(res => {
    
      console.log('Employee Experience updated successfully!')
      this.successMsg="Employee Experience updated successfully ";
      this.readCategory();
      this. resetForm(this.EmployeeExperience);
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

else{
  Swal.fire({
    icon:'warning',
    title:'Validation Alert...',
    text:'Please Enter mandatory fields!'
  })

}
  }
}

