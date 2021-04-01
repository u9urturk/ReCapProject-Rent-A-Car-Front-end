import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { ImagePath } from 'src/app/models/imagePath';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  car:CarDetail[]
  images:ImagePath[]
  path:string="https://localhost:44378/api/images/"
  constructor(private carService:CarService,
    private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
   
    
  }

 

  getCarImagesByCarId(carId:number){
    this.carService.getImagePathCarId(carId).subscribe(response=>{
      this.images=response.data;
      console.log(response)
    })
  }

  getSliderClassName(index:number){
    if (index==0){
      return "carusel-item active"
    }else{
      return "carousel-item"
    }
  }
}
