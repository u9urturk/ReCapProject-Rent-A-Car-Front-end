import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreditCardModule } from 'src/app/models/creditCardModule';
import { CustomerAddModel } from 'src/app/models/customerAddModel';
import { FindeksModel } from 'src/app/models/findeksModel';
import { RentModel } from 'src/app/models/rentModel';
import { FindeksService } from 'src/app/services/findeks.service';
import { AlertifyService } from 'src/app/services/material_services/alertify.service';
import { AuthService } from 'src/app/services/material_services/auth.service';
import { PaymentCardService } from 'src/app/services/payment-card.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentForm:FormGroup;
  creditCard:CreditCardModule[]=[]
  @Input() imagePath!:any;
  @Input() rentModel!:RentModel;
  @Input() findeks!:FindeksModel;
  @Input() customer!:CustomerAddModel;
  isChecked =true;
  isCheckedCard=true;
  register?:string=""
  cardSelect?:string =""
  currentCard:CreditCardModule;

  carRented = false;
  constructor(private fb:FormBuilder,
    private rentalService:RentalService,
    private paymentService:PaymentCardService,
    private toastr:ToastrService,
    private findeksService:FindeksService,
    private alertify:AlertifyService,
    private router:Router,
    private auth:AuthService) { }

  ngOnInit(): void {
    this.createPaymentForm();
    this.getCreditCardByCustomerId();
  }
  reloadPage(){
    setTimeout(()=>window.location.reload(),500)
    
  }

  createPaymentForm(){
    this.paymentForm = this.fb.group({
      cardNumber:[null,Validators.required],
      expirationDate:[null,Validators.required],
      name:["",Validators.required],
      securityCode:[null,Validators.required]
    })

    
  }

  setCurrentCard(card:CreditCardModule){
    this.currentCard = card;
    //console.log(this.currentCard);
  }

  cardActive(card:CreditCardModule){
    if(this.currentCard){
      if(this.currentCard.id == card.id){
        return "list-group-item list-group-item-action active"
      }else{
        return "list-group-item list-group-item-action"
      }
    }else{
      return
    }
    
  }
  getCreditCardByCustomerId(){
    this.paymentService.getCreditCardByCusyomerId(this.customer.id).subscribe(response=>{
      this.creditCard = response.data
      //console.log(this.creditCard)
    })
  }

  saveCreditCard(){
    if(this.isChecked == true){
      this.register = "Kredi kartımı kaydet "
    }else{
      this.register = "Kredi kartımı kaydetme !"
    }
  }

  creditCardSelect(){
    if(this.isCheckedCard == true){
      this.cardSelect = "Kayıtlı Kredi Kartlarımla Ödeme Yap"
    }else{
      this.cardSelect ="Yeni Kredi Kartı İle Ödeme Yap"
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
    }else if(this.isChecked == true && this.paymentForm.invalid && this.currentCard==null){
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

  goMyCars(){
    this.router.navigate(["/rentals/mycar"])
  }

  rentCar(){
    if(this.auth.isLogened() == true){
      if(this.paymentForm.valid || this.currentCard){
        this.rentalService.rentCar(this.rentModel).subscribe(response => {
          this.toastr.success(response.message, "OK")
          this.carRented = true;
          if(this.carRented == true){
            setTimeout(()=>this.updateCustomerFindekPoint(),500);
            setTimeout(()=>this.addCreditCard(),1000)
            setTimeout(()=>this.goMyCars(),1500)
          }
         
        }, responseError => {
          this.toastr.info(responseError.error)
        })
      }else if(!this.currentCard){
        this.toastr.info("","Dikkat !")
        this.alertify.paymentError();
        setTimeout(()=>this.reloadPage(),2000)
      }
    }
    
    
    
  }

  // test(){
  //   console.log(this.paymentForm)
  // }
}
