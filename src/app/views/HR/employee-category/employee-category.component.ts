import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { EmployeeCategoryService } from '../../../services/employee-category.service';

import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employee-category',
  templateUrl: './employee-category.component.html',
  styleUrls: ['./employee-category.component.css']
})
export class EmployeeCategoryComponent implements OnInit {

  employeeCategoryCreateForm: FormGroup;
  category: any;
  loaded: boolean;
  listdata: MatTableDataSource<any>;
  displayedColumns: string[] = [ 'employee_category_name','actions'];
  submitted:boolean; 
  successMsg:string="";
  btnName:string="Submit";
  employee_categoryId:string;
 
    constructor(
      public fb: FormBuilder,
      private router: Router,
      private ngZone: NgZone,
      private apiService: ApiService,
      private changeDetectorRefs: ChangeDetectorRef,
      private employeeCategoryService: EmployeeCategoryService
    ) { }
   
    ngOnInit(): void {
      this.mainForm();
      this.readCategory();
      
    }
    mainForm(){
      this.employeeCategoryCreateForm = this.fb.group({
        employee_category_name:[''],
      });
    }
    readCategory(){
      this.employeeCategoryService.getEmployeeCategory().subscribe((data) => {
        this.category = data;
        this.changeDetectorRefs.detectChanges();
        this.listdata= new MatTableDataSource(this.category);       
        this.loaded=false;
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
    onEditBtnClick(employee_category_id: string) {
      this.employeeCategoryService.getEmployeeCategoryById(employee_category_id).subscribe(data => {
        console.log(data);
        this.employeeCategoryCreateForm.patchValue({         
          employee_category_name:data[0].employee_category_name,
        
        });
      });
      this.btnName="Update";
      this.employee_categoryId=employee_category_id;
   
    }
    onDeleteBtnClick(employee_category_id: string) {
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
      this.submitted = true;
      if(this.btnName=="Submit")
      {
        console.log("submit pressed")
      if (!this.employeeCategoryCreateForm.valid) {
        console.log("problem!!!!")
        return false;
      } else {
        console.log("before apiService")
        console.log(this.employeeCategoryCreateForm.value)
        this.employeeCategoryService.addEmployeeCategory(
          {employee_category_name:this.employeeCategoryCreateForm.get("employee_category_name").value}
        ).subscribe(
          (res) => {
            this.successMsg="Employee Category added successfully";
            this.readCategory();
            this. resetForm(this.employeeCategoryCreateForm);
            
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
  
  else {
    this.employeeCategoryService.updateEmployeeCategory(this.employee_categoryId, this.employeeCategoryCreateForm.value)
    .subscribe(res => {
    
      console.log('Employee Category updated successfully!')
      this.successMsg="Employee Category updated successfully ";
      this.readCategory();
      this. resetForm(this.employeeCategoryCreateForm);
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
  