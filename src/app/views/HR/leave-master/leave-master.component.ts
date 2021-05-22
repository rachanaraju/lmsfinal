













import { MatTableDataSource } from '@angular/material/table';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { LeaveMasterService } from '../../../services/leave-master.service';

import Swal from 'sweetalert2';

// interface Car {
//   value: string;
//   viewValue: string;
// }


@Component({
  selector: 'app-leave-master',
  templateUrl: './leave-master.component.html',
  styleUrls: ['./leave-master.component.css']
})

  export class LeaveMasterComponent implements OnInit {
   // Option:any=['Active','In-Active']
  // leaveMasterCreateForm: FormGroup;
  public today = new Date();
   Option:any=['Sick Leave','Maternity Leave','Paternity Leave','Earned Leave','Annual Leave','Marriage Leave']
  submitted = false;

  category: any;
  loaded: boolean;
  listdata: MatTableDataSource<any>;
  // designation:any=[];
   leave:any=[];
  btnName:string="Submit";
  leave_Id:string;
  leave_type:string;
  successMsg:string;
  displayedColumns: string[] = ['leave_type','number_of_leaves','comments','date','actions'];



 
  constructor( private fb:FormBuilder, 
    private apiService:ApiService,
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef,
    private leaveMasterService: LeaveMasterService,
    private actRoute: ActivatedRoute, 
    private ngZone: NgZone,  
    
    ) { }

  LeaveMaster = this.fb.group({
    leave_id:[''],
    number_of_leaves:['', [Validators.required, Validators.pattern('^[0-9a-zA-z, ]*$')]],
    leave_type:['',Validators.required],  
    date:[''],
    comments:['', [Validators.pattern('^[a-zA-Z0-9, ]*$')]]
  
    
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
    this.leaveMasterService.getleaveMaster().subscribe((data) => {
      //console.log(data+"from employee service")
      this.leave = data;
    });
    this.readCategory();
  }
  readCategory(){
    this.leaveMasterService.getleaveMaster().subscribe((data) => {
      this.category = data;
      this.changeDetectorRefs.detectChanges();
      this.listdata= new MatTableDataSource(this.category);  
      //console.log('HIIII'+this.listdata);
      this.loaded=false;
      console.log(this.category)
    })    
  }
  onEditBtnClick(leave_id: string) {
    this.leaveMasterService.getleaveMasterById(leave_id).subscribe(data => {
      console.log(data);
      this.LeaveMaster.patchValue({         
        leave_id:data[0].leave_id,
        number_of_leaves:data[0].number_of_leaves,
        leave_type:data[0].leave_type,
        comments:data[0].comments,
        date:data[0].date,
        // status:data[0].status, 
        
      });
    });
    this.btnName="Update";
    this.leave_Id = leave_id;
 
  }
  onDeleteBtnClick(leave_id: string) {
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
    console.log(this.LeaveMaster.get("leave_id").value+"leave_id")
    console.log(this.LeaveMaster.get("leave_type").value+"leave_type")
    console.log(this.LeaveMaster.get("number_of_leaves").value+"number_of_leaves")
    console.log(this.LeaveMaster.get("date").value+"date")
    console.log(this.LeaveMaster.get("comments").value+"comments")
  
    if(this.LeaveMaster.valid){
    if(this.btnName=="Submit")
    {
      console.log("submit pressed") 
      console.log("before apiService")
      console.log(this.LeaveMaster.value)
      this.leaveMasterService.addleaveMaster(this.LeaveMaster.value).subscribe(
        (res) => {
          this.successMsg="Leave added successful ";
          console.log('Leave added successfully!');
          this.readCategory();
          this. resetForm(this.LeaveMaster);
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
    this.leaveMasterService.updateleaveMasterById(this.leave_Id, this.LeaveMaster.value)
    .subscribe(res => {
    
      console.log('Leave updated successfully!')
      this.successMsg="Leave updated successfully ";
      this.readCategory();
      this. resetForm(this.LeaveMaster);
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

