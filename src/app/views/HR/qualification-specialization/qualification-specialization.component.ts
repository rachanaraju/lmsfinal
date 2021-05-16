import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { QualificationTypeService } from '../../../services/qualification-type.service';
import { QualificationSpecializationService } from '../../../services/qualification-specialization.service';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-qualification-specialization',
  templateUrl: './qualification-specialization.component.html',
  styleUrls: ['./qualification-specialization.component.css']
})
export class QualificationSpecializationComponent implements OnInit {

  qualificationSpecializationCreateForm: FormGroup;
  category: any;
  loaded: boolean;
  listdata: MatTableDataSource<any>;
  designation:any=[];
  employee:any=[];
  btnName:string="Submit";
  employee_promotionId:string;
  successMsg:string;
  displayedColumns: string[] = ['qualification_specialization_type','qualification_type','actions'];

  submitted:boolean; 
  
  qualification_specializationId:string;
  qualificationType:any=[];
 
    constructor(
      public fb: FormBuilder,
      private router: Router,
      private ngZone: NgZone,
      private apiService: ApiService,
      private changeDetectorRefs: ChangeDetectorRef,
      private quailificationTypeService:QualificationTypeService,
      private qualificationSpecializationService:QualificationSpecializationService
    ) { }
   
    ngOnInit(): void {
      this.mainForm();
      this.quailificationTypeService.getQualificationType().subscribe((data) => {
        this.qualificationType = data;
      });
      this.readCategory();
    }
    mainForm(){
      this.qualificationSpecializationCreateForm = this.fb.group({
        qualification_specialization_type:[''],
        qualification_type_id:['']
      });
    }
    resetForm(form: FormGroup) {
      form.reset();
      Object.keys(form.controls).forEach(key => {
        form.get(key).setErrors(null);
      });
      this.btnName="Submit";
    }   
    readCategory(){
      this.qualificationSpecializationService.getQualificationSpecialization().subscribe((data) => {
        this.category = data;
        this.changeDetectorRefs.detectChanges();
        this.listdata= new MatTableDataSource(this.category);       
        this.loaded=false;
        console.log(this.category)
      })    
    }
    onEditBtnClick(qualification_specialization_id: string) {
      this.qualificationSpecializationService.getQualificationSpecializationById(qualification_specialization_id).subscribe(data => {
        console.log(data);
        this.qualificationSpecializationCreateForm.patchValue({         
          qualification_specialization_type:data[0].qualification_specialization_type,
          qualification_type_id:data[0].qualification_type_id
        
        });
      });
      this.btnName="Update";
      this.qualification_specializationId = qualification_specialization_id;
   
    }
    onDeleteBtnClick(qualification_specialization_id: string) {
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
      if (!this.qualificationSpecializationCreateForm.valid) {
        console.log("problem!!!!")
        return false;
      } else {
        console.log("before apiService")
        console.log(this.qualificationSpecializationCreateForm.value)
        this.qualificationSpecializationService.addQualificationSpecialization(
          {qualification_specialization_type:this.qualificationSpecializationCreateForm.get("qualification_specialization_type").value,
          qualification_type_id:this.qualificationSpecializationCreateForm.get("qualification_type_id").value}
        ).subscribe(
          (res) => {
            this.successMsg="Qualification Specialization added successful ";
            console.log('Qualification Specialization added successfully!');
            this.readCategory();
            this. resetForm(this.qualificationSpecializationCreateForm);
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
    
      this.qualificationSpecializationService.updateQualificationSpecialization(this.qualification_specializationId, this.qualificationSpecializationCreateForm.value)
      .subscribe(res => {
      
        console.log('Qualification Specialization updated successfully!')
        this.successMsg="Qualification Specialization updated successfully ";
        this.readCategory();
        this. resetForm(this.qualificationSpecializationCreateForm);
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
  
  