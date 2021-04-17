import { Component, OnInit } from '@angular/core';
import { CustomerAddModel } from 'src/app/models/customerAddModel';
import { Rental } from 'src/app/models/rental';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rent-summary',
  templateUrl: './rent-summary.component.html',
  styleUrls: ['./rent-summary.component.css']
})
export class RentSummaryComponent implements OnInit {

  rentals:Rental[]=[]
  customer:CustomerAddModel;
  customerId:number;
  userId:number
  constructor(private rentalService:RentalService,
    private customerService:CustomerService) {}

  ngOnInit(): void {
   
    this.getUserIdByToken();
  }

  getUserIdByToken(){
    let stringConvert = localStorage.getItem("userId")
    this.userId = Number(stringConvert);
    //console.log(this.userId);
    this.getCustomerByUserId(this.userId);
  }

  getCustomerByUserId(userId:number){
    this.customerService.getCustomerByUserId(userId).subscribe(response=>{
      this.customer = response.data
      //console.log(this.customer.id)
      if(this.customer){
        this.getRentalsByCustomerId(this.customer.id)
      }
    })
  }

  getRentalsByCustomerId(customerId:any){
    this.rentalService.getRentalsByCustomerId(customerId).subscribe(response=>{
      this.rentals = response.data;

    })
  } 
}
