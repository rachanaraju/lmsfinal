import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from "@angular/router";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
import {FormControl} from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from '../../../services/employee.service';


@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit {
  employee_id=localStorage.getItem("employee_id");
  Employee:any = [];
  // faEdit = faEdit;
  loaded:boolean;
  constructor(
    private actRoute: ActivatedRoute,
    public dialog: MatDialog,
    private employeeService:EmployeeService,
  ) {
    this.readDetails();
  }
  
  ngOnInit() {
    this.loaded=true;
  }
 
  readDetails(){
    this.employeeService.getEmployee(this.employee_id).subscribe((data=>{
      this.Employee=data;
    }))
  }
}
