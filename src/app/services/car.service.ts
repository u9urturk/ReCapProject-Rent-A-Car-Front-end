import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = "https://localhost:44378/api/cars/";
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl+"getcardetails"
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<CarDetail>> {
    let newPath=this.apiUrl+"getbybrand?brandId="+brandId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarsByColor(colorId:number):Observable<ListResponseModel<CarDetail>> {
    let newPath=this.apiUrl+"getbycolor?colorId="+colorId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
   
  }

  getCarByCarId(carId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"getbycarid?carId="+carId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)

  }

  getCarsByFilter(brandId:number,colorId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"getbyfilter?brandId="+brandId+"&colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
  }

  carAdd(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"addcar",car)
  }

  carDelete(car:any):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"deletecar",car)
  }

  carUpdate(car:any):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"updatecar",car)
  }

 



}
