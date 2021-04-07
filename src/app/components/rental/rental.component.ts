import { Component, Input, OnInit } from '@angular/core';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';


@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  @Input() rentals: Rental[] = []
  
  dataLoaded = false;
  customerId = 1004;
  
  

  constructor(private rentalService: RentalService,
    ) { }

  ngOnInit(): void {
    this.getRentalsByCustomerId(this.customerId)
  }

  getRentalsByCustomerId(customerId: number) {
    this.rentalService.getRentalsByCustomerId(customerId).subscribe(response => {
      this.rentals = response.data;
      
      
    })
  }

  
  

}
