import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { ImagePath } from 'src/app/models/imagePath';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-carimage',
  templateUrl: './carimage.component.html',
  styleUrls: ['./carimage.component.css']
})
export class CarimageComponent implements OnInit {
  apiUrl:string="https://localhost:44378"
  imageUrls:ImagePath[]=[]
  cars:CarDetail[]=[]
  carId:number=1057
  

  
  
  constructor(private carImageService:CarImageService,
    private carService:CarService,
    private activatedRoute: ActivatedRoute,
    private sanitizer:DomSanitizer){}


  ngOnInit(): void {
    
    this.getImageByCarId(this.carId)
  }
  

  getImageByCarId(carId:number){
    this.carService.getImagePathCarId(carId).subscribe(response=>{
      this.imageUrls=response.data
      console.log(this.imageUrls)
    })
  }
  
  
   
  
  


}
