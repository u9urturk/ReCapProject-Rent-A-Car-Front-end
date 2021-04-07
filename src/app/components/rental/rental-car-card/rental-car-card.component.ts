import { Component, Input, OnInit } from '@angular/core';
import { Gallery, GalleryItem, ImageItem } from 'ng-gallery';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-rental-car-card',
  templateUrl: './rental-car-card.component.html',
  styleUrls: ['./rental-car-card.component.css']
})
export class RentalCarCardComponent implements OnInit {
  @Input() carId!:number;
  carImages: CarImage[] = []
  items: GalleryItem[] = [];
  
  constructor(private carImageService:CarImageService,
    public gallery: Gallery) { }

  ngOnInit(): void {
    this.getImageByCarId();
  }



  getImageByCarId() {
    this.carImageService.getCarImagesByCarId(this.carId).subscribe(response => {
      this.carImages = response.data
      this.getCarImageUrl();
      //console.log(this.carId)


    })
  }

  getCarImageUrl() {
    const imageUrl: any[] = []
    this.carImages.forEach(image => {
      imageUrl.push({
        src: this.carImageService.getCarImageUrl(image.id),
        thumb: this.carImageService.getCarImageUrl(image.id)
      })
    });

    this.items = imageUrl.map(img => new ImageItem({ src: img.src, thumb: img.thumb }))



  }
}
