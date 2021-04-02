import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = "https://localhost:44378/api/";
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl+"cars/getcardetails"
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<CarDetail>> {
    let newPath=this.apiUrl+"cars/getbybrand?brandId="+brandId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarsByColor(colorId:number):Observable<ListResponseModel<CarDetail>> {
    let newPath=this.apiUrl+"cars/getbycolor?colorId="+colorId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
   
  }

  getCarByCarId(carId:number):Observable<SingleResponseModel<Car>>{
    let newPath=this.apiUrl+"cars/getbycarid?carId"+carId
    return this.httpClient.get<SingleResponseModel<Car>>(newPath)

  }

  getCarsByFilter(brandId:number,colorId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"cars/getbyfilter?brandId="+brandId+"&colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
  }

 



}
