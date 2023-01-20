import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  empDetails!: FormGroup
  searchtext!:any;
  empobj: Employee = new Employee()
  empList: Employee[] = [];
  showUpdate:boolean=false;
  showAdd:boolean=false;
  constructor(private formBuilder: FormBuilder, private empservice: EmployeeService) { }
  ngOnInit(): void {
    this.getAllEmployees();
    this.empDetails = this.formBuilder.group(
      {
        firstName: [''],
        lastName: [''],
        email: [''],
        title: [''],
        office: [''],
        department: [''],
        phoneNumber: [''],
        skypeId: ['']
      }
    );
  }
  addEmployee() {
    console.log(this.empDetails);
    this.empobj.id = this.empDetails.value.id;
    this.empobj.firstName = this.empDetails.value.firstName
    this.empobj.lastName = this.empDetails.value.lastName
    this.empobj.email = this.empDetails.value.email
    this.empobj.title = this.empDetails.value.title
    this.empobj.office = this.empDetails.value.office
    this.empobj.department = this.empDetails.value.department
    this.empobj.phoneNumber = this.empDetails.value.phoneNumber
    this.empobj.skypeId = this.empDetails.value.skypeId
    this.empservice.addEmployee(this.empobj).subscribe(
      res => {
        console.log(res);
        alert("Employee Added successfully!!");
        this.empDetails.reset();
        this.getAllEmployees();
      },
      err => {
        console.log(err);
      }
    )
  }
  showAddoption(){
    this.empDetails.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  getAllEmployees() {
    this.empservice.getAllEmployees().subscribe(
      res => {
        this.empList = res;
      },
      err => {
        console.log("Error while fetching data.")
      }
    );
  }

  delEmployee(id: number) {
    this.empservice.deleteEmployee(id).subscribe(
      res => {
        alert("Employee deleted successfully!!");
        this.getAllEmployees();
      }
    )
  }

  editEmployee(emp: any) {
    this.showUpdate=true;
    this.showAdd=false;
    this.empobj.id=emp.id;
    this.empDetails.controls['firstName'].setValue(emp.firstName);
    this.empDetails.controls['lastName'].setValue(emp.lastName);
    this.empDetails.controls['email'].setValue(emp.email);
    this.empDetails.controls['title'].setValue(emp.title);
    this.empDetails.controls['office'].setValue(emp.office);
    this.empDetails.controls['department'].setValue(emp.department);
    this.empDetails.controls['phoneNumber'].setValue(emp.phoneNumber);
    this.empDetails.controls['skypeId'].setValue(emp.skypeId);
  
  }
  updateEmployee(){
    this.empobj.firstName = this.empDetails.value.firstName
    this.empobj.lastName = this.empDetails.value.lastName
    this.empobj.email = this.empDetails.value.email
    this.empobj.title = this.empDetails.value.title
    this.empobj.office = this.empDetails.value.office
    this.empobj.department = this.empDetails.value.department
    this.empobj.phoneNumber = this.empDetails.value.phoneNumber
    this.empobj.skypeId = this.empDetails.value.skypeId

    this.empservice.updateEmployee(this.empobj,this.empobj.id).subscribe(
      res=>{
        alert("Employee Details Updated!");
        this.empDetails.reset();
        this.getAllEmployees();
      }
    )
  }
}

