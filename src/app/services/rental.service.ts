import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';


@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = "https://localhost:44378/api/"
  constructor(private httpClient:HttpClient) { }

  getAllRentals():Observable<ListResponseModel<Rental>>{
    let newPath = `${this.apiUrl}rentals/getrentaldetails`;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  getRentalsByCustomerId(customerId:number):Observable<ListResponseModel<Rental>>{
    let newPath = `${this.apiUrl}rentals/getrentalsbycustomerid?customerid=${customerId}`;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  getRentalsByCarId(carId:number):Observable<ListResponseModel<Rental>>{
    let newPath = `${this.apiUrl}rentals/getrentalsbycarid?carid=${carId}`;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

}