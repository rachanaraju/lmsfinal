import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonaldetailComponent } from './personaldetail/personaldetail.component';
import { LeaveApplyComponent } from './leave-apply/leave-apply.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Employee'
    },
    children: [
      {
        path: 'personaldetail',
        component: PersonaldetailComponent,
        data: {
          title: 'Personaldetail'
        }
      },
      {
        path: 'create-employee',
        component: CreateEmployeeComponent,
        data: {
          title: 'create-employee'
        }
      },
      {
        path: 'employee-view',
        component: EmployeeViewComponent,
        data: {
          title: 'employee-view'
        }
      },
      {
        path: 'employee-list',
        component: EmployeeListComponent,
        data: {
          title: 'employee-list'
        }
      },
      {
        path: 'employee-edit/:employee_id',
        component: EmployeeEditComponent,
        data: {
          title: 'employee-edit'
        }
      },
      {
        path: 'leave-apply',
        component: LeaveApplyComponent,
        data: {
          title: 'leave-apply'
        },
        
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class employeeRoutingModule {}
