import { Injectable } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { HttpClient } from '@angular/common/http';import { filter, map, Observable } from 'rxjs';
import { Employee } from '../model/employee';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  getAllEmployees():Observable<Employee[]>{
    return this.http.get<Employee[]>('http://localhost:3000/employee');
}

  addEmployee(emp:Employee):Observable<Employee>{

    return this.http.post<Employee>('http://localhost:3000/employee',emp);
  }

  updateEmployee(emp:Employee,id:number):Observable<Employee>{
  
    return this.http.put<Employee>('http://localhost:3000/employee/'+id,emp);
  }


  deleteEmployee(id:number){

    return this.http.delete('http://localhost:3000/employee/'+id);
  }
  filtering(searchItem:string,filterby:string){
    if(filterby =="department")
      return this.getAllEmployees().pipe(
        map(emp=> emp.filter(emp=>emp[filterby].toLowerCase().includes(searchItem.toLowerCase())))
      );
    else if(filterby=="title") 
    return this.getAllEmployees().pipe(
      map(emp=> emp.filter(emp=>emp.title.toLowerCase().includes(searchItem.toLowerCase())))
    );
    else if(filterby=="office")
    return this.getAllEmployees().pipe(
      map(emp=> emp.filter(emp=>emp[filterby].toLowerCase().includes(searchItem.toLowerCase())))
    )
    else if(filterby=="email")
    return this.getAllEmployees().pipe(
      map(emp=> emp.filter(emp=>emp.email.toLowerCase().includes(searchItem.toLowerCase())))
    );
    else
    return this.getAllEmployees().pipe(
      map(emp=> emp.filter(emp=>emp.firstName.toLowerCase().includes(searchItem.toLowerCase())))
    )
  }

  

}

