import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-operations',
  templateUrl: './car-operations.component.html',
  styleUrls: ['./car-operations.component.css']
})
export class CarOperationsComponent implements OnInit {
  admin = false;
  constructor() { }

  ngOnInit(): void {
    this.adminOperation();
  }

  adminOperation(){
    this.admin = true
  }
}
