import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { QualificationTypeService } from '../../../services/qualification-type.service';

import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-qualification-type',
  templateUrl: './qualification-type.component.html',
  styleUrls: ['./qualification-type.component.css']
})
export class QualificationTypeComponent implements OnInit {

  qualificationTypeCreateForm: FormGroup;
  category: any;
  loaded: boolean;
  listdata: MatTableDataSource<any>;
  displayedColumns: string[] = [ 'qualification_type','actions'];
  submitted:boolean; 
  successMsg:string="";
  btnName:string="Submit";
  qualification_typeId:string;
 
    constructor(
      public fb: FormBuilder,
      private router: Router,
      private ngZone: NgZone,
      private apiService: ApiService,
      private changeDetectorRefs: ChangeDetectorRef,
      private qualificationTypeService: QualificationTypeService
    ) { }
   
    ngOnInit(): void {
      this.mainForm();
      this.readCategory();
      
    }
    mainForm(){
      this.qualificationTypeCreateForm = this.fb.group({
        qualification_type:[''],
      });
    }
    readCategory(){
      this.qualificationTypeService.getQualificationType().subscribe((data) => {
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
    onEditBtnClick(qualification_type_id: string) {
      this.qualificationTypeService.getQualificationTypeById(qualification_type_id).subscribe(data => {
        console.log(data);
        this.qualificationTypeCreateForm.patchValue({         
          qualification_type:data[0].qualification_type,
        
        });
      });
      this.btnName="Update";
      this.qualification_typeId=qualification_type_id;
   
    }
    onDeleteBtnClick(qualification_typeId: string) {
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
      if (!this.qualificationTypeCreateForm.valid) {
        console.log("problem!!!!")
        return false;
      } else {
        console.log("before apiService")
        console.log(this.qualificationTypeCreateForm.value)
        this.qualificationTypeService.addQualificationType(
          {qualification_type:this.qualificationTypeCreateForm.get("qualification_type").value}
        ).subscribe(
          (res) => {
            this.successMsg="Qualification Type added successfully";
            this.readCategory();
            this. resetForm(this.qualificationTypeCreateForm);
            
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
    this.qualificationTypeService.updateQualificationType(this.qualification_typeId, this.qualificationTypeCreateForm.value)
    .subscribe(res => {
    
      console.log('Qualification Type updated successfully!')
      this.successMsg="Qualification Type updated successfully ";
      this.readCategory();
      this. resetForm(this.qualificationTypeCreateForm);
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
  