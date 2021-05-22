

import { MatTableDataSource } from '@angular/material/table';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';


import Swal from 'sweetalert2';
import { HolidayMasterService } from '../../../services/holiday-master.service';




@Component({
  selector: 'app-holiday-master',
  templateUrl: './holiday-master.component.html',
  styleUrls: ['./holiday-master.component.css']
})

  export class HolidayMasterComponent implements OnInit {
   // Option:any=['Active','In-Active']
  //  holidayMasterCreateForm: FormGroup;
  public today = new Date();
  //  Option:any=['Sick Leave','Maternity Leave','Paternity Leave','Earned Leave','Annual Leave','Marriage Leave']
  submitted = false;

  category: any;
  loaded: boolean;
  listdata: MatTableDataSource<any>;
  designation:any=[];
  holiday:any=[];
  btnName:string="Submit";
  holiday_Id:string;
  holiday_name:string;
  successMsg:string;
  displayedColumns: string[] = ['holiday_name','comments','date','actions'];



 
  constructor( private fb:FormBuilder, 
    private apiService:ApiService,
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef,
    private holidayMasterService: HolidayMasterService,
    private actRoute: ActivatedRoute, 
    private ngZone: NgZone,  
    
    ) { }

    HolidayMaster = this.fb.group({
      holiday_id:[''],
      holiday_name:['',[Validators.required, Validators.pattern('^[a-zA-Z, ]*$')]],
      date:['',Validators.required],
      comments:['', [ Validators.pattern('^[a-zA-Z, ]*$')]]
    
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
    this.holidayMasterService.getholidayMaster().subscribe((data) => {
      //console.log(data+"from employee service")
      this.holiday = data;
    });
    this.readCategory();
  }
  readCategory(){
    this.holidayMasterService.getholidayMaster().subscribe((data) => {
      this.category = data;
      this.changeDetectorRefs.detectChanges();
      this.listdata= new MatTableDataSource(this.category);  
      //console.log('HIIII'+this.listdata);
      this.loaded=false;
      console.log(this.category)
    })    
  }
  onEditBtnClick(holiday_id: string) {
    this.holidayMasterService.getholidayMasterById(holiday_id).subscribe(data => {
      console.log(data);
      this.HolidayMaster.patchValue({         
        holiday_id:data[0].holiday_id,
        
       holiday_name:data[0]. holiday_name,
        comments:data[0].comments,
        date:data[0].date,
     
        
      });
    });
    this.btnName="Update";
    this.holiday_Id = holiday_id;
 
  }
  onDeleteBtnClick(holiday_id: string) {
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
    console.log(this.HolidayMaster.get("holiday_id").value+"holiday_id")
    console.log(this.HolidayMaster.get("holiday_name").value+"holiday_name")
   
    console.log(this.HolidayMaster.get("date").value+"date")
    console.log(this.HolidayMaster.get("comments").value+"comments")
  
    if(this.HolidayMaster.valid){
    if(this.btnName=="Submit")
    {
      console.log("submit pressed") 
      console.log("before apiService")
      console.log(this.HolidayMaster.value)
      this.holidayMasterService.addholidayMaster(this.HolidayMaster.value).subscribe(
        (res) => {
          this.successMsg="holiday added successful ";
          console.log('holiday added successfully!');
          this.readCategory();
          this. resetForm(this.HolidayMaster);
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
    this.holidayMasterService.updateholidayMasterById(this.holiday_Id, this.HolidayMaster.value)
    .subscribe(res => {
    
      console.log('holiday updated successfully!')
      this.successMsg="holiday updated successfully ";
      this.readCategory();
      this. resetForm(this.HolidayMaster);
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

