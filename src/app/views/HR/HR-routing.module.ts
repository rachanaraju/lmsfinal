import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepartmentComponent } from './department/department.component';
import { DesignationCreateComponent } from './designation-create/designation-create.component';
import { ConfigrationComponent } from './configration/configration.component';
import { EmployeeCategoryComponent } from './employee-category/employee-category.component';
import { QualificationTypeComponent } from './qualification-type/qualification-type.component';
import { RoleMasterComponent } from './role-master/role-master.component';
import { CompanyBranchComponent } from './company-branch/company-branch.component';
import { QualificationSpecializationComponent } from './qualification-specialization/qualification-specialization.component';
import { EmployeePerformanceComponent } from './employee-performance/employee-performance.component';
import { EmployeePromotionComponent } from './employee-promotion/employee-promotion.component';
import { EmployeeQualificationComponent } from './employee-qualification/employee-qualification.component';
import { EmployeeContactsComponent } from './employee-contacts/employee-contacts.component';
import { EmployeeExperienceComponent } from './employee-experience/employee-experience.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { EmployeeMasterComponent } from './employee-master/employee-master.component';
 import { LeaveMasterComponent } from './leave-master/leave-master.component';
 import { HolidayMasterComponent } from './holiday-master/holiday-master.component';
import { EmployeeLeaveComponent } from './employee-leave/employee-leave.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'HR'
    },
    children: [
      {
        path: '',
        redirectTo: 'HR'
      },
      {
        path: 'Department',
        component: DepartmentComponent,
        data: {
          title: 'Department'
        }
      },
      {
        path: 'Designation',
        component: DesignationCreateComponent,
        data: {
          title: 'Designation'
        }
      },
     
      {
        path: 'EmployeeCategory',
        component: EmployeeCategoryComponent,
        data: {
          title: 'Employee Category'
        }
      },
      {
        path: 'QualificationType',
        component: QualificationTypeComponent,
        data: {
          title: 'Qualification Type'
        }
      },
      {
        path: 'RoleMaster',
        component: RoleMasterComponent,
        data: {
          title: 'Role Master'
        }
      },
      {
        path: 'QualificationSpecialization',
        component: QualificationSpecializationComponent,
        data: {
          title: 'Qualification Specialization'
        }
      },
      {
        path: 'CompanyBranch',
        component: CompanyBranchComponent,
        data: {
          title: 'Company Branch'
        }
      },
      {
        path: 'EmployeePerformance',
        component: EmployeePerformanceComponent,
        data: {
          title: 'Employee Performance'
        }
      },
      {
        path: 'EmployeePromotion',
        component: EmployeePromotionComponent,
        data: {
          title: 'Employee Promotion'
        }
      },
      {
        path: 'EmployeeQualification',
        component: EmployeeQualificationComponent,
        data: {
          title: 'Employee Qualification'
        }
      },
      {
        path: 'EmployeeContact',
        component: EmployeeContactsComponent,
        data: {
          title: 'Employee Contact'
        }
      },
      {
        path: 'EmployeeExperience',
        component: EmployeeExperienceComponent,
        data: {
          title: 'Employee Experience'
        }
      },
      {
        path: 'CompanyProfile',
        component: CompanyProfileComponent,
        data: {
          title: 'Company Profile'
        }
      },
      {
        path: 'EmployeeMaster',
        component: EmployeeMasterComponent,
        data: {
          title: 'Employee Master'
        }
      },

      {
        path: 'LeaveMaster',
        component: LeaveMasterComponent,
        data: {
          title: 'Leave Master'
        }
      },

      {
        path: 'HolidayMaster',
        component: HolidayMasterComponent ,
        data: {
          title: 'Holiday Master'
        }
      },
      {
        path: 'EmployeeLeave',
        component: EmployeeLeaveComponent ,
        data: {
          title: 'Employee Leave'
        }
      },
   
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigrationRoutingModule {}
