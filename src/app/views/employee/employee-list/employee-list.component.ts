import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EmployeeCategoryService } from '../../../services/employee-category.service';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  Employee: any;
  loaded: boolean;
  id: string;
  listdata: MatTableDataSource<any>;
  successMsg:string="";
  displayedColumns: string[] = ['employee_name','role_description', 'department_name','company_name','actions'];
  constructor(
    private actRoute: ActivatedRoute, private changeDetectorRefs: ChangeDetectorRef,
    private router: Router,
    private employeeCategoryService:EmployeeCategoryService,
    private employeeService:EmployeeService,
  ) {
   
   }

  ngOnInit(): void {
    this.loaded=true;
    
    this.readLeaveHistory();
  }
  onSearchClear(){
    this.id="";
    this.applyFilter();
  }
  applyFilter(){
    this.listdata.filter=this.id.trim().toLowerCase();
  }
  
  onSubmit() {
    // // this.submitted = true;
    // console.log("submit pressed")
   
    // if (!this.LeaveApplyForm.valid) {
    //   console.log("problem!!!!")
    //   return false;
    // } else {
    //   console.log("before apiService")
      
    //   this.apiService.addLeave(
    //     {emp_name:this.LeaveApplyForm.get("emp_name").value,
    //   emp_id:this.emp_id,
    //   leave_type:this.LeaveApplyForm.get("leave_type").value,
    //   leave_desc:this.LeaveApplyForm.get("leave_desc").value,
    //   start_date:this.LeaveApplyForm.get("start_date").value,
    //   end_date:this.LeaveApplyForm.get("end_date").value,}
      
    //   ).subscribe(
    //     (res) => {
    //       this.successMsg="Leave Added";
    //       console.log('Employee successfully created!');
    //       Swal.fire({
    //         text: this.successMsg,
    //         width: 300,
    //         showCancelButton: false,
    //         cancelButtonText: 'Cancel',
    //         cancelButtonColor: '#ff0000',
    //         confirmButtonText: 'Ok',
    //         confirmButtonColor: '#008000',
    //       }).then((result) => {
    //         if (result.value) {
    //           this.router.navigateByUrl('/leave-history');
    //           // window.location.reload();
    //         }
    //       });
    //       // this.ngZone.run(() => this.router.navigateByUrl('/employees-list'))
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
    //   // this.apiService.sendMail(this.employeeCreateForm.value).subscribe(
       
    //   //   (res)=>{
          
    //   //     console.log("Email send successfully");
    //   //     this.ngZone.run(() => this.router.navigateByUrl('/employees-list'))
    //   //   },
    //   //   (error)=>{
    //   //     console.log(error)
    //   //   }
    //   // )
    // }
  }

  readLeaveHistory(){
   
    this.employeeService.getEmployees().subscribe((data) => {
      this.Employee = data;
      this.changeDetectorRefs.detectChanges();
      this.listdata= new MatTableDataSource(this.Employee);
      
      this.loaded=false;
      console.log(this.Employee)
    })    
  }
//   onDelete(id){
//     this.apiService.deleteLeave(id).subscribe(
//       (res) => {
//         this.successMsg="Leave deleted";
     
//         Swal.fire({
//           text: this.successMsg,
//           width: 300,
//           showCancelButton: false,
//           cancelButtonText: 'Cancel',
//           cancelButtonColor: '#ff0000',
//           confirmButtonText: 'Ok',
//           confirmButtonColor: '#008000',
//         }).then((result) => {
//           if (result.value) {
//             this.router.navigateByUrl('/leave-history');
//             window.location.reload();
//           }
//         });
//         // this.ngZone.run(() => this.router.navigateByUrl('/employees-list'))
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
// }
}
