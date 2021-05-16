import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { DesignationService } from '../../../services/designation.service';

import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-designation-create',
  templateUrl: './designation-create.component.html',
  styleUrls: ['./designation-create.component.css']
})

export class DesignationCreateComponent implements OnInit {
  category: any;
  loaded: boolean;
  listdata: MatTableDataSource<any>;
  displayedColumns: string[] = [ 'designation_name','level','actions'];
  submitted:boolean;
  designationCreateForm: FormGroup;
  successMsg:string="";
  btnName:string="Submit";
  designationId:string;
 
    constructor(
      public fb: FormBuilder,
      private router: Router,
      private ngZone: NgZone,
      private apiService: ApiService,
      private changeDetectorRefs: ChangeDetectorRef,
      private designationService: DesignationService
    ) { }
   
    ngOnInit(): void {
      this.mainForm();
      this.readCategory();
      
    }
    mainForm(){
      this.designationCreateForm = this.fb.group({
        designation_name:[''],
      });
    }
    readCategory(){
      this.designationService.getDesignation().subscribe((data) => {
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
    onEditBtnClick(designation_id: string) {
      this.designationService.getDesignationById(designation_id).subscribe(data => {
        console.log(designation_id);
        this.designationCreateForm.patchValue({         
          designation_name:data[0].designation_name,
          level:data[0].level,
        });
      });
      this.btnName="Update";
      this.designationId=designation_id;
   
    }
    onDeleteBtnClick(designation_id: string) {
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
      if (!this.designationCreateForm.valid) {
        console.log("problem!!!!")
        return false;
      } else {
        console.log("before apiService")
        console.log(this.designationCreateForm.value)
        this.designationService.addDesignation(
          {designation_name:this.designationCreateForm.get("designation_name").value}
        ).subscribe(
          (res) => {
            this.successMsg="Designation added successfully";
            this.readCategory();
            this. resetForm(this.designationCreateForm);
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
    this.designationService.updateDesignation(this.designationId, this.designationCreateForm.value)
    .subscribe(res => {     
      console.log('Designation updated successfully!')
      this.successMsg="Designation updated successfully ";
      this.readCategory();
      this. resetForm(this.designationCreateForm);
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
  