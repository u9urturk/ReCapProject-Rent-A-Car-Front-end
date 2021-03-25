import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { ImagePath } from 'src/app/models/imagePath';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  carDetails: CarDetail[] = []
  car:CarDetail
  imagePaths:ImagePath[]=[]
  brands: Brand[] = []
  colors: Color[] = []
  carImages:CarImage[]=[]
  currentColor: Color;
  currentBrand: Brand;
  currentCarId: CarDetail;
  dataLoaded = false;
  path:string="https://localhost:44378"
  
  constructor(private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private brandService: BrandService,
    private colorService: ColorService
     ){ }

  ngOnInit(): void {
    
    this.getColors()
    this.getBrands()
    this.activatedRoute.params.subscribe(params => {
      if (params["brandId"]) {
        this.getCarsByBrand(params["brandId"])
      }
      else if (params["colorId"]) {
        this.getCarsByColor(params["colorId"])
      }else if(params["carId"]){
        this.getImageByCarId(params["carId"])
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

  getImageByCarId(carId:number){
    this.carService.getImagePathCarId(carId).subscribe(response=>{
      this.imagePaths = response.data
     

    })  
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

  setCurrentCarId(car:CarDetail){
    this.currentCarId=car
    console.log(car)
    
  }

}
