import { MatTableDataSource } from '@angular/material/table';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';


import Swal from 'sweetalert2';
import { RoleService } from '../../../services/role.service';




@Component({
  selector: 'app-role-master',
  templateUrl: './role-master.component.html',
  styleUrls: ['./role-master.component.css']
})

  export class RoleMasterComponent implements OnInit {
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
  role_Id:string;
  role_name:string;
  successMsg:string;
  displayedColumns: string[] = ['role_name','role_description','actions'];



 
  constructor( private fb:FormBuilder, 
    private apiService:ApiService,
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef,
    private roleService: RoleService,
    private actRoute: ActivatedRoute, 
    private ngZone: NgZone,  
    
    ) { }

    roleMaster = this.fb.group({
      role_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z, ]*$')]], 
   
      role_description:['', [Validators.required, Validators.pattern('^[a-zA-Z, ]*$')]] 
    
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
    this.roleService.getRole().subscribe((data) => {
      //console.log(data+"from employee service")
      this.holiday = data;
    });
    this.readCategory();
  }
  readCategory(){
    this.roleService.getRole().subscribe((data) => {
      this.category = data;
      this.changeDetectorRefs.detectChanges();
      this.listdata= new MatTableDataSource(this.category);  
      //console.log('HIIII'+this.listdata);
      this.loaded=false;
      console.log(this.category)
    })    
  }
  onEditBtnClick(role_id: string) {
    this.roleService.getRoleById(role_id).subscribe(data => {
      console.log(data);
      this.roleMaster.patchValue({         
        role_name:data[0].role_name,
        role_description:data[0].role_description
        
      });
    });
    this.btnName="Update";
    this.role_Id = role_id;
 
  }
  onDeleteBtnClick(role_id: string) {
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
    console.log(this.roleMaster.get("role_name").value+"role_name")
    console.log(this.roleMaster.get("role_description").value+"role_description")
  
    if(this.roleMaster.valid){
    if(this.btnName=="Submit")
    {
      console.log("submit pressed") 
      console.log("before apiService")
      console.log(this.roleMaster.value)
      this.roleService.addRole(this.roleMaster.value).subscribe(
        (res) => {
          this.successMsg="holiday added successful ";
          console.log('holiday added successfully!');
          this.readCategory();
          this. resetForm(this.roleMaster);
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
    this.roleService.updateRole(this.role_Id, this.roleMaster.value)
    .subscribe(res => {
    
      console.log('holiday updated successfully!')
      this.successMsg="holiday updated successfully ";
      this.readCategory();
      this. resetForm(this.roleMaster);
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
