import { Component, OnInit } from '@angular/core';

import { FormGroup,FormBuilder,FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  empDetails!:FormGroup
  constructor(private formBuilder:FormBuilder){}
  ngOnInit(): void {
    
    this.empDetails=this.formBuilder.group(
      {
        firstname:[''],
        lastname:[''],
        email:[''],
        title:[''],
        office:[''],
        department:[''],
        phoneNumber:[''],
        skypeid:['']
      }
    )
  }
  
}
