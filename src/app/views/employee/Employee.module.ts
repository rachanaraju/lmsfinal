import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { PersonaldetailComponent } from './personaldetail/personaldetail.component';
import { LeaveApplyComponent } from './leave-apply/leave-apply.component';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { employeeRoutingModule } from './Employee-routing.module';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    employeeRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    MaterialModule
  ],
  declarations: [PersonaldetailComponent,LeaveApplyComponent,CreateEmployeeComponent, EmployeeViewComponent,  EmployeeEditComponent, EmployeeListComponent]
})
export class EmployeeModule {
}
