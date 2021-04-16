import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentModel } from '../models/rentModel';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = "https://localhost:44378/api/rentals/"
  constructor(private httpClient:HttpClient) { }

  getAllRentals():Observable<ListResponseModel<Rental>>{
    let newPath = `${this.apiUrl}getrentaldetails`;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  getRentalsByCustomerId(customerId:number):Observable<ListResponseModel<Rental>>{
    let newPath = `${this.apiUrl}getrentalsbycustomerid?customerid=${customerId}`;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  getRentalsByCarId(carId:number):Observable<ListResponseModel<Rental>>{
    let newPath = `${this.apiUrl}getrentalsbycarid?carid=${carId}`;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  rentCar(rentModel:any):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"rentcar",rentModel)
  }

}