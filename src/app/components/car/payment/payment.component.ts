import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarImage } from 'src/app/models/carImage';
import { RentModel } from 'src/app/models/rentModel';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentForm:FormGroup;
  @Input() imagePath!:any;
  @Input() rentModel!:RentModel;
  constructor(private fb:FormBuilder) { }

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

  test(){
    console.log(this.paymentForm)
  }
}
