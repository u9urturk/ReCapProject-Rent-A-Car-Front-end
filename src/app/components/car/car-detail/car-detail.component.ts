import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CustomerAddModel } from 'src/app/models/customerAddModel';
import { FindeksModel } from 'src/app/models/findeksModel';
import { Rental } from 'src/app/models/rental';
import { RentModel } from 'src/app/models/rentModel';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { FindeksService } from 'src/app/services/findeks.service';
import { RentalService } from 'src/app/services/rental.service';


@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  rentDate:Date;
  returnDate:Date;
  carDetail: CarDetail;
  carImages: CarImage[] = [];
  findeks: FindeksModel;
  items: GalleryItem[] = [];
  userId: number;
  customer: CustomerAddModel;
  customerId: number;
  dataLoaded = false;
  createCustomer = false;
  createCustomerFindeks = false;
  findeksOK = true;
  defaultCompany: string = "RentACar"
  carId: number;
  sonuc:number;

  constructor(private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private toastr: ToastrService,
    private carImageService: CarImageService,
    private fb: FormBuilder,
    private customerService: CustomerService,
    private rentalService: RentalService,
    private findeksService: FindeksService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.getCar(params["carId"])
        this.getImageByCarId(params["carId"])
        this.setCarId(params["carId"])
      }
      this.getUserId();
      this.getCustomerByUserId(this.userId);
      setTimeout(() => this.getCustomerFindeksPoint(this.customerId), 500)

    })

    


  }
 

  baseGetCustomerByUserId(userId: number) {
    this.customerService.getCustomerByUserId(userId).subscribe(response => {
      console.log(response.data)
      this.customer = response.data
    })
  }
  getCustomerByUserId(userId: number) {

    this.customerService.getCustomerByUserId(userId).subscribe(response => {
      //console.log(response.data)
      if (response.data != null) {
        this.customer = response.data;
        this.customerId = response.data.id;
        //console.log(this.customerId)
      } else {
        this.dataLoaded = true
        if (this.dataLoaded == true && this.userId != 0 && this.userId != null) {
          this.createNewCustomer(userId)
          this.createCustomer = true;
          if (this.createCustomer == true) {
            setTimeout(() => this.baseGetCustomerByUserId(userId), 1000)

          }
        }
      }

    })

  }

  createNewCustomer(userId: number) {
    let customerModel = Object.assign({ userId: userId, companyName: this.defaultCompany })
    //console.log(customerModel)
    //this.toastr.success("Yeni Müşteri Kaydı")
    this.customerService.customerAdd(customerModel).subscribe(response => {
      this.toastr.success(response.message, "Yeni Müşteri Kaydı")
    })
  }

  getUserId() {
    var stringToConvert = localStorage.getItem("userId")
    this.userId = Number(stringToConvert); // tokendan gelen string tipteki userId'yi number tibine dönüştürdük. 
    //console.log(this.userId)

  }

   addDays(date:Date, days:number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  

  rentCar() {
    
    let Test:RentModel = {
      carId : this.carId,
      customerId: this.customer.id,
      rentDate : this.addDays(this.rentDate,1).toISOString(),
      returnDate :this.addDays(this.returnDate,1).toISOString()

    }

    if (Test.rentDate!= null) {
      var date1 = new Date(Test.returnDate.toString());
      var date2 = new Date(Test.rentDate.toString());
      var difference = date1.getTime() - date2.getTime();

      var numberOfDays = Math.ceil(difference / (1000 * 3600 * 24));

      this.sonuc = numberOfDays * this.carDetail.dailyPrice;
    }

    
    console.log(this.sonuc)
    if (Test.rentDate) {
      if (this.findeks.findeksPoint < this.carDetail.carFindeksPoint) {
        this.toastr.error("Bu aracı kiralamak için gerekli olan findeks puanınız yetersiz", `Mevcut Findeks Puanınız : ${this.findeks.findeksPoint}`)
      } else {
        
        //let rentModel = Object.assign({ carId: this.carId, customerId: this.customer.id }, revertedRentForm)
        //console.log(rentModel)
        this.rentalService.rentCar(Test).subscribe(response => {
          this.toastr.success(response.message, "OK")
          setTimeout(()=>this.updateCustomerFindekPoint(),500);
        }, responseError => {
          this.toastr.info(responseError.error)
        })
      }

    } else {
      this.toastr.error("Geçersiz Kullanım ", "Dikkat  !")
    }
  } 
  getCustomerFindeksPoint(customerId: number) {
    this.findeksService.getCustomerFindeksPointByCustomerId(customerId).subscribe(response => {
      if (response.data != null) {
        this.findeks = response.data
        //console.log(this.findeks,"OK")

      } else {
        this.findeksOK = false;
        if (this.findeksOK == false) {
          this.createCustomerFindeksPoint(customerId);
          this.createCustomerFindeks = true;
          if (this.createCustomerFindeks == true) {
            setTimeout(() => this.baseGetCustomerFindeksPoint(customerId), 1000)
          }
        }

      }

    })
  }

  updateCustomerFindekPoint() {
    let findeksModel = Object.assign({ id: this.findeks.id, customerId: this.customer.id })
    this.findeksService.updateCustomerFindeksPoint(findeksModel).subscribe(response => {
      this.toastr.info(response.message)
      let updateOK = true
      if (updateOK == true) {
        setTimeout(()=>this.baseGetCustomerFindeksPoint(this.customer.id),500) 
        setTimeout(() => this.toastr.info(`Yeni findeks puanınız ${this.findeks.findeksPoint}`),1000)
      }
    },responseError=>{
      this.toastr.warning(responseError.error.message)
    })
  }

  baseGetCustomerFindeksPoint(customerId: number) {
    this.findeksService.getCustomerFindeksPointByCustomerId(customerId).subscribe(response => {
      this.findeks = response.data;
      //console.log("OK")

    })
  }

  createCustomerFindeksPoint(customerId: number) {
    let findeksModel = Object.assign({ customerId: customerId })
    this.findeksService.newCustomerFindeksPoint(findeksModel).subscribe(response => {
      this.toastr.info(response.message)

    })

  }

  getCar(carId: number) {
    this.carService.getCarByCarId(carId).subscribe(response => {
      //console.log(response.data)
      this.carDetail = response.data[0]
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
    var stringToConvert = carId
    this.carId = Number(stringToConvert)
    //console.log(this.carId)
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
