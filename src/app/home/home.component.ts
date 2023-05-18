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
  filterby:string="Preferred Name";
  alphabets:string[]=[];
  
  constructor(private fb:FormBuilder,private empservice:EmployeeService){
  }
  ngOnInit():void{
    for (let i=65; i<91;i++){
      this.alphabets.push(String.fromCharCode(i));
    }
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
  sidebarFilter(data:Employee[]){
    this.filteredList=data;
    console.log("Sidebar filtered results");
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
  filterEmployee1(searchItem:string,filterby:string){
    this.empservice.filtering(searchItem,filterby)?.subscribe(
      res=>{
        this.filteredList=res;
      },
      err=>{
        console.log(err);
      }
    )
  }
  filterEmployee(search?:string){
    if (search){
      this.searchedItem=search;
    }
    if (this.searchedItem){
      console.log("Filtered Employees:" +this.filteredList.length);
      if(this.filterby=="department")
      this.filteredList=this.empList.filter(emp => emp.department.toLowerCase().includes(this.searchedItem.toLowerCase()));
      
      else if(this.filterby=="title"){
        this.filteredList=this.empList.filter(emp => emp.title.toLowerCase().includes(this.searchedItem.toLowerCase()));
      }
      
      else if(this.filterby=="email"){
        this.filteredList=this.empList.filter(emp => emp.email.toLowerCase().includes(this.searchedItem.toLowerCase()));
      }
      else{
        this.filteredList=this.empList.filter(emp => emp.firstName.toLowerCase().includes(this.searchedItem.toLowerCase()));
      }
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
