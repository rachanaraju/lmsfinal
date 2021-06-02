import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { CompanyMasterService } from '../../../services/company-master.service';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import csc from 'country-state-city'
import { DomSanitizer } from '@angular/platform-browser';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators'

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {
  countryId:any;
stateId:any;
  @ViewChild('fileUploader', { static: false }) fileUploader: ElementRef;
  public today = new Date();
  countryArray:any[];
  abcd:any[]=['Angular','React','Vue'];
  Option:any=['Active','In-Active'];
  objectOptions:{ id: number, name: string }[]=[
    { "id": 0, "name": "Available" },
    { "id": 1, "name": "Ready" },
    { "id": 2, "name": "Started" }
  ]
  submitted = false;
  successMsg:string;
  category: any;
  listdata: MatTableDataSource<any>;
  btnName:string="Submit";
  companyId:string;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  imageData:string;
  id: string;
  country: any;
  countryList:any;
  stateNames:any;
  stateList:any;
  cityNames:any;
  cityList:any;
  url = '';
  flag:boolean=false;

  mobilePattern = new RegExp(/^\d{10}$/);
  //phonePattern = new RegExp(/^\d{1,15}$/);
  pinCodePattern = new RegExp(/^[1-9][0-9]{5,8}$/);
  emailPattern = new RegExp(
    /^[a-zA-z][a-zA-Z0-9._-]{2,64}@[a-zA-Z0-9-]{2,240}\.[a-zA-Z]{2,3}(\.[a-zA-Z]{2})?$/
  );
  displayedColumns: string[] = [ 'company_name','company_registration_number','company_type','actions'];
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService,
    private changeDetectorRefs: ChangeDetectorRef,
    private companyMasterService:CompanyMasterService,
   // public CscService: Csc
  ) { }
 
  filteredOptions: Observable<string[]>
  filteredState: Observable<string[]>
  filteredCity: Observable<string[]>
  
  companyProfileForm = this.fb.group({
        
    company_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z, ]*$')]],  
    company_registration_number:['', [Validators.required, Validators.pattern('^[a-zA-Z0-9, ]*$')]], 
    company_logo:[''],  
    company_registered_address1:['',Validators.required],
    company_registered_address2:[''], 
    company_registered_address3:[''],   
    city:['', [Validators.required]],
    state: ['', [Validators.required]],   
    pincode:['',[Validators.required,Validators.pattern('[0-9]{6}')]],
    country:['', [Validators.required]],
    gst_no:['', [ Validators.pattern('^[0-9A-Z, ]*$')]],
    website:[''], 
    contact_no:['',[Validators.required,Validators.pattern('[6-9]{1}[0-9]{9}'),Validators.maxLength(10),Validators.minLength(10)]],
    alternative_contact_no:['',[,Validators.pattern('[6-9]{1}[0-9]{9}'),Validators.maxLength(10),Validators.minLength(10)]],
    contact_person:['', [ Validators.pattern('^[a-zA-Z, ]*$')]],
    tan:['', [ Validators.pattern('^[a-zA-Z0-9, ]*$')]], 
    pan:['',[Validators.required,Validators.pattern('[A-Z0-9]{10}')]],
    email: ['', [Validators.pattern(this.emailPattern), Validators.required]],
    alternative_email: ['', [Validators.pattern(this.emailPattern)]],
    company_type:['', [Validators.required, Validators.pattern('^[a-zA-Z, ]*$')]],
    industry:['', [Validators.required, Validators.pattern('^[a-zA-Z, ]*$')]],
    status:[''], 
    remarks:['', [ Validators.pattern('^[a-zA-Z, ]*$')]],
    created_by:['']     
    });



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
   // src\assets\img\avatars\6.jpg
   // url="./assets/img/avatars/6.jpg"
  
  
     fileChangeEvent(event) {
       if (event.target.files && event.target.files[0]) {
         var reader = new FileReader();
         reader.readAsDataURL(event.target.files[0]); // read file as data url
         reader.onload = (event) => { // called once readAsDataURL is completed
         //  this.url = event.target.result;
           console.log(this.url);
         }
       }
     }
    
  ngOnInit(): void {
    this.readCategory();
    this.readCountry();
    this.filteredOptions=this.companyProfileForm.controls.country.valueChanges.pipe(
      startWith(''),
      map(value =>(value?this.filterData(value):this.country.slice()))
    )
  }


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

  countryChangeList(id){   
    this.countryId=id;
    this.stateNames = csc.getStatesOfCountry(this.countryId); 
    this.cityNames=[];
   this.filteredState=this.companyProfileForm.controls.state.valueChanges.pipe(
     startWith(''),
     map(value =>this.filterState(value)
   )) 
  }

  stateChangeList(id){  
this.stateList=id;
    this.cityNames = csc.getCitiesOfState(this.stateList);
    this.filteredCity=this.companyProfileForm.controls.city.valueChanges.pipe(
      startWith(''),
      map(value =>this.filterCity(value)
    )) 
  }

  onSubmit() {
  //  this.submitted = true;
  if(this.companyProfileForm.valid){
    if(this.btnName=="Submit")
    {
      console.log("submit pressed")
      console.log("before apiService")
      console.log(this.companyProfileForm.value)
      this.companyMasterService.addCompanyMaster(this.companyProfileForm.value).subscribe(
        (res) => {
          this.successMsg="Company created successful ";
          console.log('Company created successfully');
                    
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Company created successfully',
            showConfirmButton: false,
            timer: 1500
          })
          .then((result) => {
            if (result.value) {
              
            }
          });
          this.readCategory();
              this.resetForm(this.companyProfileForm);
        },
        (error) => {
          console.log(error);
        }
      );
    }

    else {
      this.companyMasterService.updatecompanyMaster(this.companyId, this.companyProfileForm.value)
      .subscribe(res => {      
        console.log('Company updated successfully!')
        this.successMsg="Company updated successfully ";
        this.readCategory();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Company updated successfully',
          showConfirmButton: false,
          timer: 1500
        }).then((result) => {
          if (result.value) {
           
          }
        });
       this.resetForm(this.companyProfileForm);
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
  readCategory(){
    this.companyMasterService.getcompanyMaster().subscribe((data) => {
      this.category = data;
      console.log(data);
      this.changeDetectorRefs.detectChanges();
      this.listdata= new MatTableDataSource(this.category);       
      console.log(this.category)
    })    
  }
  readCountry(){   
     this.country = csc.getAllCountries();
  }



  onEditBtnClick(company_id: string) {
    this.companyMasterService.getcompanyMasterById(company_id).subscribe(data => {
        
      this.companyProfileForm.patchValue({         
      company_name:data[0].company_name, 
      company_registration_number:data[0].company_registration_number,
      company_registered_address1:data[0].company_registered_address1,
      company_registered_address2:data[0].company_registered_address2,
      company_registered_address3:data[0].company_registered_address3,        
      city:data[0].city,
    state:data[0].state,
    pincode:data[0].pincode,
    country:data[0].country,
    gst_no:data[0].gst_no,
    website:data[0].website, 
    contact_no:data[0].contact_no,
    alternative_contact_no:data[0].alternative_contact_no,
    contact_person:data[0].contact_person, 
    tan:data[0].tan,
    pan:data[0].pan,
    email:data[0].email, 
    alternative_email:data[0].alternative_email,
    company_type:data[0].company_type, 
    industry:data[0].industry, 
    status:data[0].status, 
    remarks:data[0].remarks, 
    updated_by:data[0].updated_by     
  
  });   
  //this.stateChangeList();
    });   
    this.btnName="Update";
    this.companyId=company_id;
  } 
  
}
