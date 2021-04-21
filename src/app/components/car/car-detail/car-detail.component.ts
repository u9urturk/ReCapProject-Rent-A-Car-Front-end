import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CustomerAddModel } from 'src/app/models/customerAddModel';
import { FindeksModel } from 'src/app/models/findeksModel';
import { FormatDateModel } from 'src/app/models/formatDateModel';
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
  imagePath:any [] =[]
  rentModel!:RentModel;
  findeks!: FindeksModel;
  items: GalleryItem[] = [];
  userId: number;
  customer!: CustomerAddModel;
  dataLoaded = false;
  createCustomer = false;
  createCustomerFindeks = false;
  findeksOK = true;
  defaultCompany: string = "RentACar"
  carId: number;
  control = false;
  
  

  constructor(private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private toastr: ToastrService,
    private carImageService: CarImageService,
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
      setTimeout(() => this.getCustomerFindeksPoint(this.customer.id), 500)

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
  

  rentCarControl() {
    
    if(this.rentDate != null){
      let formatDate:FormatDateModel = {
        rentDate: this.addDays(this.rentDate,1).toISOString(),
        returnDate :this.addDays(this.returnDate,1).toISOString()
  
      }
      if (formatDate.returnDate!= null) {
        var date1 = new Date(formatDate.returnDate.toString());
        var date2 = new Date(formatDate.rentDate.toString());
        var difference = date1.getTime() - date2.getTime();
  
        var numberOfDays = Math.ceil(difference / (1000 * 3600 * 24));
  
        const payment = numberOfDays * this.carDetail.dailyPrice;
  
        this.rentModel = {
          customerId : this.customer.id,
          carId : this.carId,
          rentDate :formatDate.rentDate,
          returnDate : formatDate.returnDate,
          payment : payment
        }
        // console.log(this.rentModel);
        
      }
    }
    
   
    if (this.rentModel != null) {
      if (this.findeks.findeksPoint < this.carDetail.carFindeksPoint) {
        this.toastr.error("Bu aracı kiralamak için gerekli olan findeks puanınız yetersiz", `Mevcut Findeks Puanınız : ${this.findeks.findeksPoint}`)
      } else {
        this.control = true;
        //console.log(this.imagePath)
        
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

    this.carImages.forEach(image=>{
      this.imagePath.push({
        path:this.carImageService.getCarImageUrl(image.id)
      })
    })

    //console.log(this.imagePath[0])

  }

}
