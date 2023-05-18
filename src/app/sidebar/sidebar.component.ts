import { Component, OnInit, Output,EventEmitter} from '@angular/core';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  filteredresult:Employee[]=[];
  filterby!:string;
  @Output() sidebar:EventEmitter<Employee[]>=new EventEmitter<Employee[]>();
  constructor(private empservice:EmployeeService){}
    ngOnInit(): void {
        
    }
    filterEmp(searchItem:string,filterby:string){
        this.empservice.filtering(searchItem,filterby).subscribe(
          res=>{
            this.filteredresult=res;
            this.sidebar.emit(this.filteredresult);
            console.log(this.filteredresult);
          },
          err=>{
            console.log(err);
          }
        )
    }
}
