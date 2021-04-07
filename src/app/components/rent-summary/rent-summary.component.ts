import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rent-summary',
  templateUrl: './rent-summary.component.html',
  styleUrls: ['./rent-summary.component.css']
})
export class RentSummaryComponent implements OnInit {

  rentals:Rental[]=[]
  customerId=1004
  constructor(private rentalService:RentalService ) {}

  ngOnInit(): void {
    this.getRentalsByCustomerId(this.customerId);
  }

  

  getRentalsByCustomerId(customerId:number){
    this.rentalService.getRentalsByCustomerId(customerId).subscribe(response=>{
      this.rentals = response.data;

    })
  }
}
