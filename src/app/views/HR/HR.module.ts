import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ReactiveFormsModule } from '@angular/forms';
import { DepartmentComponent } from './department/department.component';

import { DesignationCreateComponent } from './designation-create/designation-create.component';
import { ConfigrationRoutingModule } from './HR-routing.module';
import { ConfigrationComponent } from './configration/configration.component';
import { EmployeeCategoryComponent } from './employee-category/employee-category.component';
import { QualificationTypeComponent } from './qualification-type/qualification-type.component';
import { RoleMasterComponent } from './role-master/role-master.component';


import { MaterialModule } from '../../material/material.module';
import { CommonModule } from "@angular/common";

import { QualificationSpecializationComponent } from './qualification-specialization/qualification-specialization.component';
import { EmployeePerformanceComponent } from './employee-performance/employee-performance.component';
import { EmployeePromotionComponent } from './employee-promotion/employee-promotion.component';
import { EmployeeQualificationComponent } from './employee-qualification/employee-qualification.component';
import { EmployeeContactsComponent } from './employee-contacts/employee-contacts.component';
import { EmployeeExperienceComponent } from './employee-experience/employee-experience.component';
import { CompanyBranchComponent } from './company-branch/company-branch.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { EmployeeMasterComponent } from './employee-master/employee-master.component';
import { LeaveMasterComponent } from './leave-master/leave-master.component';
import { HolidayMasterComponent } from './holiday-master/holiday-master.component';
import { EmployeeLeaveComponent } from './employee-leave/employee-leave.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ConfigrationRoutingModule,
    ChartsModule,
    BsDropdownModule,
    MaterialModule,
    ButtonsModule.forRoot() 
  ],
  declarations: [
    DepartmentComponent,
    DesignationCreateComponent,
    ConfigrationComponent, 
    EmployeeCategoryComponent, 
    QualificationTypeComponent, 
    RoleMasterComponent,
    QualificationSpecializationComponent,
    EmployeePerformanceComponent,
    EmployeePromotionComponent, 
    EmployeeQualificationComponent,
    EmployeeContactsComponent,
    EmployeeExperienceComponent,
    CompanyBranchComponent,
    CompanyProfileComponent,
    EmployeeMasterComponent,
    LeaveMasterComponent,
    HolidayMasterComponent,
    EmployeeLeaveComponent

  ]
})
export class ConfigrationModule {
}
