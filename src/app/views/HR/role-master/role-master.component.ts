` `
  
  
   import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { RoleService } from '../../../services/role.service';



import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-role-master',
  templateUrl: './role-master.component.html',
  styleUrls: ['./role-master.component.css']
})
export class RoleMasterComponent implements OnInit {
  roleMasterForm: FormGroup;
  category: any;
  loaded: boolean;
  listdata: MatTableDataSource<any>;
  displayedColumns: string[] = [ 'role_name','role_description','actions'];
  submitted:boolean; 
  successMsg:string="";
  btnName:string="Submit";
  roleId:string;
  isImageChanged:boolean = false;
 
    constructor(
      public fb: FormBuilder,
      private router: Router,
      private ngZone: NgZone,
      private apiService: ApiService,
      private changeDetectorRefs: ChangeDetectorRef,
      private roleService: RoleService,
      private _sanitizer: DomSanitizer
    ) { }
   

    
    ngOnInit(): void {
      this.mainForm();
      this.readCategory();
      
    }
    mainForm(){
      this.roleMasterForm = this.fb.group({
        role_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z, ]*$')]], 
   
        role_description:['', [Validators.required, Validators.pattern('^[a-zA-Z, ]*$')]] 
       // company_logo:[''],
        // avatar:['']

        
          
           
      });
    }
    readCategory(){
        this.roleService.getRole().subscribe((data) => {
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
    onEditBtnClick(role_id: string) {
      this.roleService.getRoleById(role_id).subscribe(data => {
        console.log(data);
        this.roleMasterForm.patchValue({   
          role_name:data[0].role_name,
          role_description:data[0].role_description
     
        
        });
      });
      this.btnName="Update";
      this.roleId=role_id;
   
    }
    onDeleteBtnClick(roleId: string) {
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
    this.roleMasterForm.patchValue({
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
    console.log(this.roleMasterForm.value)
    if(this.roleMasterForm.valid){
      if(this.btnName=="Submit")
      {
        console.log("submit pressed")
      if (!this.roleMasterForm.valid) {
        console.log("problem!!!!")
        return false;
      } else {
        console.log("before apiService")    
        // console.log(this.roleMasterForm.get("avatar").value);
        console.log(this.roleMasterForm.value)
        this.roleService.addRole(this.roleMasterForm.value).subscribe(
          (res) => {
        // this.roleService.addRole(
        //   {role_description:this.roleMasterForm.get("role_description").value,
        //   avatar:this.roleMasterForm.get("avatar").value
        // }
        // ).subscribe(
        //   (res) => {
            this.successMsg="Role added successfully";
            this.readCategory();
            this. resetForm(this.roleMasterForm);
            
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
    this.roleService.updateRole(this.roleId, this.roleMasterForm.value)
    .subscribe(res => {
    
      console.log('Role updated successfully!')
      this.successMsg="Role updated successfully ";
      this.readCategory();
      this. resetForm(this.roleMasterForm);
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

  