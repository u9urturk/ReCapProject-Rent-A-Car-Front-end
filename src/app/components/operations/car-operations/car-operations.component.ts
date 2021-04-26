import { Component, Input, OnInit } from '@angular/core';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-operations',
  templateUrl: './car-operations.component.html',
  styleUrls: ['./car-operations.component.css']
})
export class CarOperationsComponent implements OnInit {
  cars:CarDetail[]=[];
  
  constructor(private carService:CarService) { }

  ngOnInit(): void {
    this.getCars()
  }

  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars = response.data;
    })
  }

}
