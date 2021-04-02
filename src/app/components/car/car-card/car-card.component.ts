import { Component, Input, OnInit } from '@angular/core';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.css']
})
export class CarCardComponent implements OnInit {
  @Input() carDetail!:CarDetail;
  carImage!:CarImage;
  carImageUrl:string='';
  constructor(private carImageService:CarImageService) { }

  ngOnInit(): void {
    this.getCarImage();
  }

  getCarImage(){
    this.carImageService.getCarImagesByCarId(this.carDetail.carId)
    .subscribe((response)=>{
      this.carImage=response.data[0];
      this.carImageUrl=this.carImageService.getCarImageUrl(this.carImage.id)
    })
  }

}
