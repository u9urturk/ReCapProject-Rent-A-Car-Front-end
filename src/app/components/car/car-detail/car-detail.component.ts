import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CustomerAddModel } from 'src/app/models/customerAddModel';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';
import {Moment} from 'moment'
import * as moment from 'moment';


@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carDetail: CarDetail[] = [];
  carImages: CarImage[] = [];
  items: GalleryItem[] = [];
  userId: number;
  customer: CustomerAddModel;
  dataLoaded=false;
  createCustomer=false;
  defaultCompany: string = "RentACar"
  carId: number;
  rentForm: FormGroup;
  // range = new FormGroup({
  //   start: new FormControl(),
  //   end: new FormControl()
  // });
  constructor(private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private toastr: ToastrService,
    private carImageService: CarImageService,
    private fb: FormBuilder,
    private customerService: CustomerService,
    private rentalService:RentalService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.getCar(params["carId"])
        this.getImageByCarId(params["carId"])
        this.setCarId(params["carId"])
      }
      this.getUserId();
      this.getCustomerByUserId(this.userId);
      // if(this.getCustomerByUserId(this.userId)!=null){
      //   console.log("OK")
      //   this.createNewCustomer(this.userId);
      // }
    })
    this.createRentForm();
  }
  createRentForm() {
    this.rentForm = this.fb.group({
      rentDate: [null, Validators.required],
      returnDate: [null, Validators.required]
      
    })

    //console.log(this.rentForm)

  }


  baseGetCustomerByUserId(userId:number){
    this.customerService.getCustomerByUserId(userId).subscribe(response=>{
      console.log(response.data)
      this.customer = response.data
    })
  }
  getCustomerByUserId(userId: number) {

    this.customerService.getCustomerByUserId(userId).subscribe(response => {
      //console.log(response.data)
      if(response.data != null){
        this.customer = response.data
      }else{
        this.dataLoaded = true
        if(this.dataLoaded == true){
          this.createNewCustomer(userId)
          this.createCustomer = true;
          if(this.createCustomer == true){
            setTimeout(()=>this.baseGetCustomerByUserId(userId),1000)
            
          }
        }
      }
      
      

    })
    
  }

  createNewCustomer(userId:number){
    let customerModel = Object.assign({ userId: userId, companyName: this.defaultCompany })
        console.log(customerModel)
        //this.toastr.success("Yeni Müşteri Kaydı")
        this.customerService.customerAdd(customerModel).subscribe(response=>{
          this.toastr.success(response.message,"Yeni Müşteri Kaydı")
        })
  }

  getUserId() {
    var stringToConvert = localStorage.getItem("userId")
    this.userId = Number(stringToConvert); // tokendan gelen string tipteki userId'yi number tibine dönüştürdük. 
    //console.log(this.userId)
    
  }

  rentCar() {
    let rentModel = Object.assign({ carId: this.carId, customerId: this.customer.id }, this.rentForm.value )
    console.log(rentModel)
    // this.rentalService.rentCar(JSON.stringify(rentModel)).subscribe(response=>{
    //   this.toastr.success(response.message,"OK")
    // },responseError=>{
    //   console.log(responseError);
    // })
  }

  getCar(carId: number) {
    this.carService.getCarByCarId(carId).subscribe(response => {
      //console.log(response.data)
      this.carDetail = response.data
      // if(this.carDetail){
      //   //console.log(this.carDetail)
      //   //this.toastr.info("OK")
      // } 
    })
  }

  getImageByCarId(carId: number) {
    this.carImageService.getCarImagesByCarId(carId).subscribe(response => {
      this.carImages = response.data
      this.getCarImageUrl();
      //console.log(this.carId)


    })
  }
  setCarId(carId: number) {
    this.carId = carId;
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
