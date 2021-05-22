
import { MatTableDataSource } from '@angular/material/table';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { DesignationService } from '../../../services/designation.service';
import { EmployeePromotionService } from '../../../services/employee-promotion.service';
import { EmployeeService } from '../../../services/employee.service';
import { EmployeeMasterService } from '../../../services/employee-master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-promotion',
  templateUrl: './employee-promotion.component.html',
  styleUrls: ['./employee-promotion.component.css']
})
export class EmployeePromotionComponent implements OnInit {

  // employeePromotionCreateForm: FormGroup;
  public today = new Date();
  category: any;
  loaded: boolean;
  listdata: MatTableDataSource<any>;
  designation:any=[];
  employee:any=[];
  btnName:string="Submit";
  employee_promotionId:string;
  successMsg:string;
  displayedColumns: string[] = ['emp_name','designation_name','level','effective_promotion_date',  'compensation_percentage','actions'];
  constructor( private fb:FormBuilder, 
    private apiService:ApiService,
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef,
    private employeePromotionService: EmployeePromotionService,
    private actRoute: ActivatedRoute, private ngZone: NgZone,
    private designationService:DesignationService,
    private employeeService: EmployeeService,
    private employeeMasterService: EmployeeMasterService
    ) { }

  EmployeePromotion = this.fb.group({
    employee_id:['',Validators.required],
    designation_id:['',Validators.required],   
    level:['',Validators.required],  
    effective_promotion_date: [''],     
    compensation_percentage: ['', Validators.pattern('^[0-9, ]*$')],

  });
  resetForm(form: FormGroup) {
    form.reset();
    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null);
    });
    this.btnName="Submit";
  }
  ngOnInit(): void {
    this.designationService.getDesignation().subscribe((data) => {
      this.designation = data;
    });
    this.employeeMasterService.getEmployeeMaster().subscribe((data) => {
      //console.log(data+"from employee service")
      this.employee = data;
    });
    // this.employeeService.getEmployees().subscribe((data) => {
    //   this.employee = data;
    // });
    this.readCategory();
  }
  readCategory(){
    this.employeePromotionService.getPromotion().subscribe((data) => {
      this.category = data;
      this.changeDetectorRefs.detectChanges();
      this.listdata= new MatTableDataSource(this.category);       
      this.loaded=false;
      console.log(this.category)
    })    
  }
  onEditBtnClick(promotion_id: string) {
    this.employeePromotionService.getPromotionById(promotion_id).subscribe(data => {
      console.log(data);
      this.EmployeePromotion.patchValue({         
        employee_id:data[0].employee_id,
        designation_id:data[0].designation_id,
        effective_promotion_date:data[0].effective_promotion_date,
        compensation_percentage:data[0].compensation_percentage,
        level:data[0].level,
      
      });
    });
    this.btnName="Update";
    this.employee_promotionId = promotion_id;
 
  }
  onDeleteBtnClick(employee_promotion_id: string) {
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
    if(this.EmployeePromotion.valid){
    if(this.btnName=="Submit")
    {
      console.log("submit pressed") 
      console.log("before apiService")
      console.log(this.EmployeePromotion.value)
      this.employeePromotionService.addPromotion(this.EmployeePromotion.value).subscribe(
        (res) => {
          this.successMsg="Employee Promotion added successful ";
          console.log('Employee Promotion added successfully!');
          this.readCategory();
          this. resetForm(this.EmployeePromotion);
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
    this.employeePromotionService.updatePromotion(this.employee_promotionId, this.EmployeePromotion.value)
    .subscribe(res => {
    
      console.log('Employee Promotion updated successfully!')
      this.successMsg="Employee Promotion updated successfully ";
      this.readCategory();
      this. resetForm(this.EmployeePromotion);
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


