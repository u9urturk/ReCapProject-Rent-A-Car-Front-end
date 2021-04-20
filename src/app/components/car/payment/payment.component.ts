import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerAddModel } from 'src/app/models/customerAddModel';
import { FindeksModel } from 'src/app/models/findeksModel';
import { RentModel } from 'src/app/models/rentModel';
import { FindeksService } from 'src/app/services/findeks.service';
import { PaymentCardService } from 'src/app/services/payment-card.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentForm:FormGroup;
  @Input() imagePath!:any;
  @Input() rentModel!:RentModel;
  @Input() findeks!:FindeksModel;
  @Input() customer!:CustomerAddModel;
  isChecked =true;
  register?:string=""

  carRented = false;
  constructor(private fb:FormBuilder,
    private rentalService:RentalService,
    private paymentService:PaymentCardService,
    private toastr:ToastrService,
    private findeksService:FindeksService,) { }

  ngOnInit(): void {
    this.createPaymentForm();
  }

  createPaymentForm(){
    this.paymentForm = this.fb.group({
      cardNumber:[null,Validators.required],
      expirationDate:[null,Validators.required],
      name:["",Validators.required],
      securityCode:[null,Validators.required]
    })

    
  }

  saveCreditCard(){
    if(this.isChecked == true){
      this.register = "Kredi kartımı kaydet "
    }else{
      this.register = "Kredi kartımı kaydetme !"
    }
  }

  addCreditCard(){
    let creditCardModel = Object.assign({customerId:this.customer.id},this.paymentForm.value)
    if(this.isChecked == true && this.paymentForm.valid){
      this.paymentService.creditCardAdd(creditCardModel).subscribe(repsonse=>{
        this.toastr.info(repsonse.message,"OK")
      },responseError=>{
        console.log(responseError.error.errors);
      })
    }else{
      this.toastr.error("Geçersiz Kullanım")
    }
    
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

  rentCar(){
    this.rentalService.rentCar(this.rentModel).subscribe(response => {
          this.toastr.success(response.message, "OK")
          this.carRented = true;
          if(this.carRented == true){
            setTimeout(()=>this.updateCustomerFindekPoint(),500);
            setTimeout(()=>this.addCreditCard(),1000)
          }
         
        }, responseError => {
          this.toastr.info(responseError.error)
        })
    
  }

  test(){
    console.log(this.paymentForm)
  }
}
