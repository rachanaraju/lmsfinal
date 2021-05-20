import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { DepartmentMasterService } from '../../../services/department-master.service';
import { EmployeeService } from '../../../services/employee.service';
import { DepartmentService } from '../../../services/department.service';
import { CompanyMasterService } from '../../../services/company-master.service';
import {EmployeeMasterService} from '../../../services/employee-master.service'
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { CompanyBranchService } from '../../../services/company-branch.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
 // departmentCreateForm: FormGroup;
  category: any;
  loaded: boolean;
  listdata: MatTableDataSource<any>;
  displayedColumns: string[] = [ 'department_name','department_head','actions'];
  submitted:false; 
  successMsg:string="";
  btnName:string="Submit";
  employee:any=[];
  departmentName:any=[];
  locationName:any=[];
  departmentId:string;
  id: string;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
 
    constructor(
      public fb: FormBuilder,
      private router: Router,
      private ngZone: NgZone,
      private apiService: ApiService,
      private changeDetectorRefs: ChangeDetectorRef,
      private employeeService: EmployeeService,
      private employeeMasterService: EmployeeMasterService,
      private departmentService: DepartmentService,      
      private departmentMasterService: DepartmentMasterService,
      private companyMasterService: CompanyMasterService,
      private companyBranchService: CompanyBranchService
    ) { }

    departmentCreateForm = this.fb.group({
      department_name: ['',[Validators.required,Validators.pattern('^[a-zA-Z, ]*$')]],       
      department_code: ['',],
      department_head: ['',Validators.required],
      department_type: ['' ,Validators.required],
      department_location: ['',Validators.required]
    });

    ngOnInit(): void {
      //this.mainForm();
      this.departmentMasterService.getDepartmentMaster().subscribe((data) => {
        console.log(data+"from employee service")
        this.employee = data;
      });
      this.departmentService.getDepartment().subscribe((data) => {
        console.log(data+"from department service")
        this.departmentName = data;
      });
      // this.companyMasterService.getcityFromCompanyMaster().subscribe((data) => {
      //   console.log(data+"from companymaster service")
      //   this.locationName = data;        
      // });
      this.companyBranchService.getcompanyBranch().subscribe((data) => {
        console.log(data+"from companymaster service")
        this.locationName = data;        
      });
      this.getDepartmentCode();
      this.readCategory();      
    }

    getDepartmentCode() {
      this.departmentMasterService.getDepartmentCode().subscribe(data => {
        console.log(data+"depcode");     
        this.departmentCreateForm.patchValue({
          department_code:data
        });     
      });
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
    readCategory(){
      this.departmentMasterService.getDepartmentMaster().subscribe((data) => {
        this.category = data;
        console.log(data);
        this.changeDetectorRefs.detectChanges();
        this.listdata= new MatTableDataSource(this.category);       
        console.log(this.category)
      })   
    }
    resetForm(form: FormGroup) {
      form.reset();
      Object.keys(form.controls).forEach(key => {
        form.get(key).setErrors(null);
      });
      this.btnName="Submit";
    }
    onEditBtnClick(department_id: string) {
      this.departmentMasterService.getDepartmentMasterById(department_id).subscribe(data => {
        console.log(data);
        this.departmentCreateForm.patchValue({         
          department_name:data[0].department_name,
          department_code:data[0].department_code,
          department_head:data[0].department_head,
          department_type:data[0].department_type,
          department_location:data[0].department_location
        
        });
      });
      this.btnName="Update";
      this.departmentId=department_id;
   
    }
    
    onSubmit() {   
      if(this.departmentCreateForm.valid){
        if(this.btnName=="Submit")
        {
          console.log("submit pressed")
          console.log("before apiService")
          console.log(this.departmentCreateForm.value)
          this.departmentMasterService.addDepartmentMaster(this.departmentCreateForm.value).subscribe(
            (res) => {
              this.successMsg="Department created successful ";
              console.log('Department created successfully');
                        
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Department created successfully',
                showConfirmButton: false,
                timer: 1500
              })
              .then((result) => {
                if (result.value) {
                  
                }
              });
              this.readCategory();
              this.resetForm(this.departmentCreateForm);
            },
            (error) => {
              console.log(error);
            }
          );
        }
    
        else {
          this.departmentMasterService.updateDepartmentMaster(this.departmentId, this.departmentCreateForm.value)
          .subscribe(res => {      
            console.log('Department updated successfully!')
            this.successMsg="Department updated successfully ";
            this.readCategory();
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Department updated successfully',
              showConfirmButton: false,
              timer: 1500
            }).then((result) => {
              if (result.value) {
               
              }
            });
            this.resetForm(this.departmentCreateForm);
           
          }, (error) => {
            console.log(error)
          })
        }    
      }
      else{       
        Swal.fire({
          icon: 'warning',
          title: 'Validation Alert...',
          text: 'Please Enter mandatory fields!'     
        })
      }
    }
    
}
  