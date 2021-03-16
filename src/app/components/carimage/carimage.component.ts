import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';

@Component({
  selector: 'app-carimage',
  templateUrl: './carimage.component.html',
  styleUrls: ['./carimage.component.css']
})
export class CarimageComponent implements OnInit {
  carImages:CarImage[]=[]
  cars:Car[]=[]



  ngOnInit(): void {
  }

  

}
