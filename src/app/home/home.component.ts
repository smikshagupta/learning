import { Component, OnInit } from '@angular/core';
import { FormBuilder ,FormGroup,FormControl} from '@angular/forms';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  empDetails!:FormGroup;
  empobj: Employee = new Employee();
  empList:Employee[]=[];
  filteredList:Employee[]=[];
  showAdd:boolean=false;
  showUpdate:boolean=false;
  searchedItem!:string;
  constructor(private fb:FormBuilder,private empservice:EmployeeService){
  }
  ngOnInit():void{
      this.getEmployees();
      this.empDetails=this.fb.group(
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
      )
      
  }
  getEmployees(){
    this.empservice.getAllEmployees().subscribe(
      res=>{
        this.empList=res;
        this.filteredList=this.empList;
      },
      err=>{
        console.log(err);
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
  filterEmployee(){
    if (this.searchedItem){
      this.filteredList=this.empList.filter(emp => emp.firstName.toLowerCase().includes(this.searchedItem.toLowerCase()));
      console.log("Filtered Employees:" +this.filteredList.length);
    }
    else{
      this.filteredList=this.empList;
    }
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
        
      }
    )
  }
}
