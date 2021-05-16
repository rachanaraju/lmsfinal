import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  // {
  //   title: true,
  //   name: 'Employee'
  // },
  
  // {
  //   name: 'leave Apply',
  //   url: '/employee/leave-apply',
  //   icon: 'icon-pencil'
  // },
  // {
  //   name: 'Create  Employee',
  //   url: '/employee/create-employee',
  //   icon: 'icon-pencil'
  // },
  // {
  //   name: 'Employees  List',
  //   url: '/employee/employee-list',
  //   icon: 'icon-pencil'
  // },
  /*{
    name: 'Employee  View',
    url: '/employee/employee-view',
    icon: 'icon-pencil'
  },*/
  {
    title: true,
    name: 'HR'
  },
  {
    name: 'Configration',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Company Profile',
        url: '/HR/CompanyProfile',
        icon: 'icon-puzzle'
      },
      {
        name: 'Company Branch',
        url: '/HR/CompanyBranch',
        icon: 'icon-puzzle'
      },
      {
        name: 'Department',
        url: '/HR/Department',
        icon: 'icon-puzzle'
      },
      {
        name: 'Employee Profile',
        url: '/HR/EmployeeMaster',
        icon: 'icon-puzzle'
      },
      // {
      //   name: 'Designation',
      //   url: '/HR/Designation',
      //   icon: 'icon-puzzle'
      // },
     
      // {
      //   name: 'Employee Category',
      //   url: '/HR/EmployeeCategory',
      //   icon: 'icon-puzzle'
      // },
      // {
      //   name: 'Qualification Types',
      //   url: '/HR/QualificationType',
      //   icon: 'icon-puzzle'
      // },
      // {
      //   name: 'Specialization',
      //   url: '/HR/QualificationSpecialization',
      //   icon: 'icon-puzzle'
      // },
      {
        name: 'Role Master',
        url: '/HR/RoleMaster',
        icon: 'icon-puzzle'
      },
    
      // {
      //   name: 'Performance',
      //   url: '/HR/EmployeePerformance',
      //   icon: 'icon-puzzle'
      // },
      {
        name: 'Employee Promotion',
        url: '/HR/EmployeePromotion',
        icon: 'icon-puzzle'
      },
      // {
      //   name: 'Qualification',
      //   url: '/HR/EmployeeQualification',
      //   icon: 'icon-puzzle'
      // },
      // {
      //   name: 'Employee Contact',
      //   url: '/HR/EmployeeContact',
      //   icon: 'icon-puzzle'
      // },
      {
        name: 'Employee Experience',
        url: '/HR/EmployeeExperience',
        icon: 'icon-puzzle'
      }, 
      {
        name: 'Leave Master',
        url: '/HR/LeaveMaster',
        icon: 'icon-puzzle'
      },
      {
        name: 'Holiday Master',
        url: '/HR/HolidayMaster',
        icon: 'icon-puzzle'
      },
      {
        name: 'Employee Leave',
        url: '/HR/EmployeeLeave',
        icon: 'icon-puzzle'
      },
     ]
  },
   
  {
    divider: true
  },
  
  
];
