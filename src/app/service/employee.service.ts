import { Injectable } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { HttpClient } from '@angular/common/http';import { Observable } from 'rxjs';
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
}

