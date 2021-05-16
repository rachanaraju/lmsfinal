import { ChangeDetectorRef, Component,NgZone, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { EmployeeService } from '../../../services/employee.service';
import {EmployeeContactService} from '../../../services/employee-contact.service'
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employee-contacts',
  templateUrl: './employee-contacts.component.html',
  styleUrls: ['./employee-contacts.component.css']
})
export class EmployeeContactsComponent implements OnInit {

  EmployeeContactCreateForm: FormGroup;
  public today = new Date();
  category: any;
  loaded: boolean;
  listdata: MatTableDataSource<any>;
  designation:any=[];
  employee:any=[];
  btnName:string="Submit";
  employee_contactId:string;
  successMsg:string;
  //displayedColumns: string[] = ['employee_name','mobile_phone','home_phone', 'alternative_contact_number','personal_email','official_email','contact_type','contact_relationship','contact_relation_name','actions'];
  displayedColumns: string[] = ['employee_name','mobile_phone','home_phone', 'alternative_contact_number','personal_email','official_email','contact_relationship','contact_relation_name','actions'];
  
  constructor(private fb:FormBuilder, 
    private apiService:ApiService,
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef,
    private employeeContactService: EmployeeContactService,
    private actRoute: ActivatedRoute, 
    private ngZone: NgZone,    
    private employeeService: EmployeeService) { }

    EmployeeContact = this.fb.group({
      employee_id:[''],
      mobile_phone:[''],    
      home_phone: [''],     
      alternative_contact_number: [''],
      personal_email:[''],
      official_email:[''],    
      contact_type: [''],     
      contact_relationship: [''],
      contact_relation_name: [''],
     
    });

    resetForm(form: FormGroup) {
      form.reset();
      Object.keys(form.controls).forEach(key => {
        form.get(key).setErrors(null);
      });
      this.btnName="Submit";
    }
    ngOnInit(): void {
      this.employeeContactService.getemployeeContacts().subscribe((data) => {
        this.designation = data;
      });
      this.employeeService.getEmployees().subscribe((data) => {
        this.employee = data;
      });
      this.readCategory();
    }
    readCategory(){
      this.employeeContactService.getemployeeContacts().subscribe((data) => {
        this.category = data;
        this.changeDetectorRefs.detectChanges();
        this.listdata= new MatTableDataSource(this.category);       
        this.loaded=false;
        console.log(this.category)
      })    
    }
    onEditBtnClick(employee_contact_id: string) {
      this.employeeContactService.getemployeeContactsById(employee_contact_id).subscribe(data => {
        console.log(data);
        this.EmployeeContact.patchValue({         
          employee_id:data[0].employee_id,
          mobile_phone:data[0].mobile_phone,
          home_phone:data[0].home_phone,
          alternative_contact_number:data[0].alternative_contact_number,
          personal_email:data[0].personal_email,
          official_email:data[0].official_email,
         // contact_type:data[0].contact_type,
          contact_relationship:data[0].contact_relationship,
          contact_relation_name:data[0].contact_relation_name
        
        });
      });
      this.btnName="Update";
      this.employee_contactId = employee_contact_id;
   
    }
    onDeleteBtnClick(employee_contact_id: string) {
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
        console.log("submit pressed") 
        console.log("before apiService")
        console.log(this.EmployeeContact.value)
        this.employeeContactService.addemployeeContacts(this.EmployeeContact.value).subscribe(
          (res) => {
            this.successMsg="Employee Contact added successful ";
            console.log('Employee Contact added successfully!');
            this.readCategory();
            this. resetForm(this.EmployeeContact);
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
      this.employeeContactService.updateemployeeContacts(this.employee, this.EmployeeContact.value)
      .subscribe(res => {
      
        console.log('Employee Contact updated successfully!')
        this.successMsg="Employee Contact updated successfully ";
        this.readCategory();
        this. resetForm(this.EmployeeContact);
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
  
  
 