import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { EmployeeLeaveService } from '../../../services/employee-leave.service';



import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-employee-leave',
  templateUrl: './employee-leave.component.html',
  styleUrls: ['./employee-leave.component.css']
})
export class EmployeeLeaveComponent implements OnInit {
  employeeLeaveForm: FormGroup;
  category: any;
  category1:any;
  Option:any=['Pending','Approved','Rejected']
  loaded: boolean;
  listdata: MatTableDataSource<any>;
  listdata1: MatTableDataSource<any>;
  displayedColumns: string[] = [ 'employee_id','manager_id','number_of_leaves','status','actions'];
  displayedColumns1: string[] = ['employee_id','manager_id','number_of_leaves','status','actions'];
  submitted:boolean; 
  successMsg:string="";
  user_id:string="";
  btnName:string="Submit";
  employeeId:string;
  isImageChanged:boolean = false;
 
    constructor(
      public fb: FormBuilder,
      private router: Router,
      private ngZone: NgZone,
      private apiService: ApiService,
      private changeDetectorRefs: ChangeDetectorRef,
      private employeeleaveService: EmployeeLeaveService,
      private _sanitizer: DomSanitizer
    ) { }
   

    
    ngOnInit(): void {
      this.mainForm();
      this.readCategory();
      this.readCategory1();
      
    }
    mainForm(){
      this.employeeLeaveForm = this.fb.group({
        
        employee_id:['', [Validators.required, Validators.pattern('^[0-9a-zA-Z, ]*$')]], 
   
        manager_id:['', [Validators.required, Validators.pattern('^[0-9a-zA-Z, ]*$')]], 
       date_of_applied:['',Validators.required],
        number_of_leaves:['', [Validators.required, Validators.pattern('^[0-9a-zA-z, ]*$')]],
        from_date:['',Validators.required],
        to_date:['',Validators.required],
        status:['',Validators.required],
        comments:['', [ Validators.pattern('^[a-zA-Z, ]*$')]]
      
      });
    }
    readCategory(){
      this.user_id= localStorage.getItem("user_id");
      console.log(this.user_id);
        this.employeeleaveService.getemployeeLeaveByManagerId(this.user_id).subscribe((data) => {
        this.category = data;
        this.changeDetectorRefs.detectChanges();
        this.listdata= new MatTableDataSource(this.category);       
        this.loaded=false;
        console.log(this.category)
      })    
    }
    readCategory1(){
      this.user_id= localStorage.getItem("user_id");
      console.log(this.user_id);
        this.employeeleaveService.getemployeeLeaveByEmployeeId(this.user_id).subscribe((data) => {
        this.category1 = data;
        this.changeDetectorRefs.detectChanges();
        this.listdata1= new MatTableDataSource(this.category1);       
        this.loaded=false;
        console.log(this.category1)
      })    
    }

    resetForm(form: FormGroup) {
      form.reset();
      Object.keys(form.controls).forEach(key => {
        form.get(key).setErrors(null);
      });
      this.btnName="Submit";
      this.Option = ['Pending','Approved','Rejected']
    }
    onEditBtnClick(employee_leave_id: string) {
     
      this.employeeleaveService.getEmployeeById(employee_leave_id).subscribe(data => {
        console.log(data);
        this.Option = ['Pending','Approved','Rejected'];
        this.employeeLeaveForm.patchValue({         
          employee_id:data[0].employee_id,
         manager_id:data[0].manager_id,
         date_of_applied:data[0].date_of_applied,
         number_of_leaves:data[0].number_of_leaves,
         from_date:data[0].from_date,
         to_date:data[0].to_date,
         status:data[0].status,
         comments:data[0].comments,
        //  employee_id1:data[0].employee_id1,
        //  manager_id1:data[0].manager_id1,

        //  number_of_leaves1:data[0].number_of_leaves1,
        //  status1:data[0].status1
        });
      });
      this.btnName="Update";
      this.employeeId=employee_leave_id;
    }
    onEmpEditBtnClick(employeeId:string,managerId:string,status:string){
     
     
        this.employeeleaveService.getEmployeeById(employeeId).subscribe(data => {
          console.log(data);
          this.employeeLeaveForm.patchValue({         
            employee_id:data[0].employee_id,
           manager_id:data[0].manager_id,
           date_of_applied:data[0].date_of_applied,
           number_of_leaves:data[0].number_of_leaves,
           from_date:data[0].from_date,
           to_date:data[0].to_date,
           status:data[0].status,
           comments:data[0].comments,
          //  employee_id1:data[0].employee_id1,
          //  manager_id1:data[0].manager_id1,
  
          //  number_of_leaves1:data[0].number_of_leaves1,
          //  status1:data[0].status1
          });
        });
        this.btnName="Update";
        this.employeeId=employeeId;
        this.Option =  [status];

    }
    onDeleteBtnClick(employeeId: string) {
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
    url
    imageName
    fileChangeEvent(event) {    

      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();  
        reader.readAsDataURL(event.target.files[0]); // read file as data url  
        reader.onload = (event) => { // called once readAsDataURL is completed
          //this.url = event.target.result;
         // console.log(this.url);          
          //alert(this.url);
          this.url = this._sanitizer.bypassSecurityTrustResourceUrl(' ' + event.target.result);
          this.imageName= event.target.result;
                
           console.log(this.url);
        }
      }
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@ViewChild('image') image: ElementRef<HTMLElement>;
profileURL:any = '../../../../assets/img/avatars/1.jpg'
//profileURL:any = '/lms-ui/src/assets/img/avatars/1.jpg'

triggerFalseClick() {
  let el: HTMLElement = this.image.nativeElement;
  el.click();
}
images:any;

imageChanged(event){
  if (event.target.files && event.target.files[0]) {
    this.isImageChanged = true;
    var reader = new FileReader();
    this.images = event.target.files[0]
   // console.log(this.images);
    reader.readAsDataURL(event.target.files[0]); // read file as data url
    // console.log(reader)
    // console.log(event.target.files[0])
    reader.onload = (event) => { // called once readAsDataURL is completed
      this.profileURL = event.target.result;
      // console.log(this.profileURL)
    }
    // this.onsubmit();

    const file = (event.target as HTMLInputElement).files[0];
   console.log(file);
    this.employeeLeaveForm.patchValue({
      avatar: file
    });
  //  console.log(this.roleMasterForm.get('avatar').value)

  }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    onSubmit() {
      //this.submitted = true;
     // let imageName;
    // console.log(this.roleMasterForm.get("avatar").value);
    this.Option = ['Pending','Approved','Rejected']
    console.log(this.employeeLeaveForm.value)
    if(this.employeeLeaveForm.valid){
      if(this.btnName=="Submit")
      {
        console.log("submit pressed")
      if (!this.employeeLeaveForm.valid) {
        console.log("problem!!!!")
        return false;
      } else {
        console.log("before apiService")    
        // console.log(this.roleMasterForm.get("avatar").value);
        console.log(this.employeeLeaveForm.value)
        this.employeeleaveService.addEmployee(this.employeeLeaveForm.value).subscribe(
          (res) => {
        // this.roleService.addRole(
        //   {role_description:this.roleMasterForm.get("role_description").value,
        //   avatar:this.roleMasterForm.get("avatar").value
        // }
        // ).subscribe(
        //   (res) => {
            this.successMsg="Employee added successfully";
            this.readCategory();
            this. resetForm(this.employeeLeaveForm);
            
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
    this.employeeleaveService.updateEmployeeLeaveById(this.employeeId, this.employeeLeaveForm.value)
    .subscribe(res => {
    
      console.log('Employee Leave updated successfully!')
      this.successMsg="Employee Leave successfully ";
      this.readCategory();
      this. resetForm(this.employeeLeaveForm);
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


function employee_id(employee_id: any) {
  throw new Error('Function not implemented.');
}
  
