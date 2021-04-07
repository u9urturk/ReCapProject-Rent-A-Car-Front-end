import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { GalleryItem, Gallery, ImageItem, ThumbnailsPosition, ImageSize } from 'ng-gallery'
import { ToastrService } from 'ngx-toastr';







@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
  
})
export class CarComponent implements OnInit {
  carDetails: CarDetail[] = []
  car!: CarDetail;
  brands: Brand[] = []
  colors: Color[] = []
  carImages!: CarImage[];
  currentCar!: CarDetail;
  currentColor: Color;
  currentBrand: Brand;
  dataLoaded = false;
  items: GalleryItem[] = [];
  filterText = "";






  constructor(private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private brandService: BrandService,
    private colorService: ColorService,
    private carImageService: CarImageService,
    private toastrService:ToastrService,
    public gallery: Gallery,
    
    
  ) { }


  ngOnInit(): void {

    this.getColors()
    this.getBrands()
    this.activatedRoute.params.subscribe(params => {
      if (params["brandId"]) {
        this.getCarsByBrand(params["brandId"])
      }
      else if (params["colorId"]) {
        this.getCarsByColor(params["colorId"])
      }
      else {
        this.getCars()


      }
    })




  }

  getCars() {
    this.carService.getCars().subscribe(response => {
      this.carDetails = response.data
      this.dataLoaded = true;


    })
  }



  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe(response => {
      this.carDetails = response.data
      this.dataLoaded = true;
      // console.log(response.data)
    })
  }

  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe(response => {
      this.carDetails = response.data
      this.dataLoaded = true;
      // console.log(response.data)

    })
  }


  getImageByCarId(carId: number) {
    this.carImageService.getCarImagesByCarId(carId).subscribe(response => {
      this.carImages = response.data
      this.getCarImageUrl();

      //this.setNgGallery();
    })
  }

  // setNgGallery(){
  //   const imageUrls =  []
  //   for(let i=0;i<this.carImages.length;i++){
  //     imageUrls.push({
  //       src:this.carImages[i].imagePath,
  //       thumb:this.carImages[i].imagePath
  //     })
  //   }



  //   this.items=imageUrls.map(x=> new ImageItem({src:x.src,thumb:x.thumb}))

  // }



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

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data
      this.dataLoaded = true;
    })
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data
      this.dataLoaded = true
    })
  }

  setCurrentBrand(brand: Brand) {
    this.currentBrand = brand;
    // console.log(brand)

  }

  getCurrentBrandClass(brand: Brand) {
    if (brand == this.currentBrand) {
      return "list-group-item active"
    } else {
      return "list-group-item"
    }

  }

  setCurrentColor(color: Color) {
    this.currentColor = color;
    // console.log(color)

  }

  getCurrentColorClass(color: Color) {
    if (color == this.currentColor) {
      return "list-group-item active"
    } else {
      return "list-group-item"
    }
  }

  setCurrentCarId(car: CarDetail) {
    this.getImageByCarId(car.carId)
    this.currentCar = car;
  }


  rentCar(currentCar:CarDetail){
    this.toastrService.success(currentCar.carName + " Plakalı araç kiralandı")
  }





}
