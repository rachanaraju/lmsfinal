import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { CompanyMasterService } from '../../../services/company-master.service';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import csc from 'country-state-city';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators'
import { CompanyBranchService } from '../../../services/company-branch.service';
@Component({
  selector: 'app-company-branch',
  templateUrl: './company-branch.component.html',
  styleUrls: ['./company-branch.component.scss']
})
export class CompanyBranchComponent implements OnInit {
  countryId:any;
stateId:any;
  Option:any=['Active','In-Active']
  submitted = false;
  successMsg:string;
  category: any;
  listdata: MatTableDataSource<any>;
  btnName:string="Submit";
  branchId:string;
  companyName:any=[];
  country: any;
  countryList:any;
  stateNames:any;
  stateList:any;
  cityNames:any;
  cityList:any;
  id: string;
  branch_code:any;

  mobilePattern = new RegExp(/^\d{10}$/);
  pinCodePattern = new RegExp(/^[1-9][0-9]{5,8}$/);
  emailPattern = new RegExp(/^[a-zA-z][a-zA-Z0-9._-]{2,64}@[a-zA-Z0-9-]{2,240}\.[a-zA-Z]{2,3}(\.[a-zA-Z]{2})?$/);
  displayedColumns: string[] = [ 'company_name','branch_name','status','actions'];
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone, 
    private apiService: ApiService,
    private changeDetectorRefs: ChangeDetectorRef,
    private companyMasterService:CompanyMasterService,
    private companyBranchService:CompanyBranchService
  ) { }
  filteredOptions: Observable<string[]>
  filteredState: Observable<string[]>
  filteredCity: Observable<string[]>

  companyBranchForm = this.fb.group({    
    branch_id:[''],    
    company_id:['',Validators.required],  
   // company_name: ['',Validators.required],  
    branch_name:['', [Validators.required, Validators.pattern('^[a-zA-Z, ]*$')]],   
    branch_code:['', [Validators.pattern('^[a-zA-Z0-9, ]*$')]],   
    branch_address1:['',Validators.required], 
    branch_address2:[''], 
    branch_address3:[''], 
    city:['', [Validators.required]],
    state: ['', [Validators.required]],   
    pincode:['',[Validators.required,Validators.pattern('[0-9]{6}')]],
    country:['', [Validators.required]],
    contact_no:['',[Validators.required,Validators.pattern('[6-9]{1}[0-9]{9}'),Validators.maxLength(10),Validators.minLength(10)]],
    alternative_contact_no:['',[Validators.pattern('[6-9]{1}[0-9]{9}'),Validators.maxLength(10),Validators.minLength(10)]],
    email: ['', [Validators.pattern(this.emailPattern), Validators.required]],
    alternative_email: ['', [Validators.pattern(this.emailPattern)]],
    status:['']
  });
  ngOnInit(): void {
   
    this.readCountry();
    this.companyMasterService.getcompanyNames().subscribe((data) => {
      this.companyName = data;       
      console.log(this.companyName) 
    });  
    this.readCategory();
    this. getBranchCode();
    this.filteredOptions=this.companyBranchForm.controls.country.valueChanges.pipe(
      startWith(''),
      map(value =>(value?this.filterData(value):this.country.slice()))
    )
  }

  // getBranchCode() {
  //   this.companyBranchService.getBranchCode().subscribe(data => {     
  //     this.companyBranchForm.patchValue({
  //       branch_code:data
  //     });     
  //   });
   
  // } 
  private filterData(value: any): any[]{
    return this.country.filter(option =>
      option.name.toString().toLowerCase().includes(value.toString().toLowerCase())
      );
  }
  
    private filterState(value: string): string[]{
     return this.stateNames.filter(option =>
      option.name.toLowerCase().includes(value.toLowerCase())
      );
    }
  
    private filterCity(value: any): any[]{
      return this.cityNames.filter(option =>
        option.name.toString().toLowerCase().includes(value.toString().toLowerCase())
        );
    }

  readCountry(){   
    this.country = csc.getAllCountries();
 }
 countryChangeList(id){   
  this.countryId=id;
  this.stateNames = csc.getStatesOfCountry(this.countryId); 
  this.cityNames=[];
 this.filteredState=this.companyBranchForm.controls.state.valueChanges.pipe(
   startWith(''),
   map(value =>this.filterState(value)
 )) 
}

stateChangeList(id){  
this.stateList=id;
  this.cityNames = csc.getCitiesOfState(this.stateList);
  this.filteredCity=this.companyBranchForm.controls.city.valueChanges.pipe(
    startWith(''),
    map(value =>this.filterCity(value)
  )) 
}
  readCategory(){
    this.companyBranchService.getcompanyBranch().subscribe((data) => {
      this.category = data;
      console.log(data);
      this.changeDetectorRefs.detectChanges();
      this.listdata= new MatTableDataSource(this.category);       
      console.log(this.category)
    })    
  }

  getBranchCode() {
    // this.companyBranchService.getBranchCode().subscribe(data => {
    //   console.log(data);     
    //   this.companyBranchForm.patchValue({
    //     branch_code:data
    //   });     
    // });
  }
  resetForm(form: FormGroup) {
    form.reset();    
    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null);
    });
    this.btnName="Submit";
  } 
  applyFilter(filterValue: string) {
    this.listdata.filter = filterValue.trim().toLowerCase();
    if (this.listdata.paginator) {
      this.listdata.paginator.firstPage();
    }
  }
  onSearchClear(){     
    this.id="" ;
    this.applyFilter("");
  }
  onSubmit() {
    if(this.companyBranchForm.valid){
      if(this.btnName=="Submit")
      {
       
        this.companyBranchService.addcompanyBranch(this.companyBranchForm.value).subscribe(
          (res) => {
            this.successMsg="Branch created successful ";
            console.log('Branch created successfully');                      
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Branch created successfully',
              showConfirmButton: false,
              timer: 1500
            })
            .then((result) => {
              if (result.value) {
                
              }
            });
            this.readCategory();
              this.resetForm(this.companyBranchForm);
          },
          (error) => {
            console.log(error);
          }
        );
      }  
      else {
        this.companyBranchService.updatecompanyBranch(this.branchId, this.companyBranchForm.value)
        .subscribe(res => {      
          console.log('Branch updated successfully!')
          this.successMsg="Branch updated successfully ";
          this.readCategory();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Branch updated successfully',
            showConfirmButton: false,
            timer: 1500
          }).then((result) => {
            if (result.value) {             
            }
          });    
          this.resetForm(this.companyBranchForm);
        }, (error) => {
          console.log(error)
        })
      }    
    }
    else{
     
      Swal.fire({
        icon: 'warning',
        title: 'Validation Alert...',
        text: 'Please Enter mandatory fields!'     
      })
    }
  }
  onEditBtnClick(branch_id: string) {
    this.companyBranchService.getcompanyBranchById(branch_id).subscribe(data => {        
      this.companyBranchForm.patchValue({    
      company_id:data[0].company_id,   
      branch_id:data[0].branch_id,   
      company_name:data[0].company_name, 
      branch_name:data[0].branch_name, 
      branch_code:data[0].branch_code,
      branch_address1:data[0].branch_address1,
      branch_address2:data[0].branch_address2,
      branch_address3:data[0].branch_address3,        
      city:data[0].city,
      state:data[0].state,
      pincode:data[0].pincode,
      country:data[0].country,
      contact_no:data[0].contact_no,
      alternative_contact_no:data[0].alternative_contact_no,   
      email:data[0].email, 
      alternative_email:data[0].alternative_email,    
      status:data[0].status,     
      updated_by:data[0].updated_by     
  
  });   
 // this.stateChangeList();
    });   
    this.btnName="Update";
    this.branchId=branch_id;
  } 
}
