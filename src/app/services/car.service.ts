import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { ImagePath } from '../models/imagePath';
import { ListResponseModel } from '../models/listResponseModel';

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

  getCarByCarId(carId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"cars/getbycarid?carId"+carId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)

  }

  getCarsByFilter(brandId:number,colorId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"cars/getbyfilter?brandId="+brandId+"&colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
  }

  getImagePathCarId(carId:number):Observable<ListResponseModel<ImagePath>>{
    let newPath=this.apiUrl+"cars/getimagepathbycarid?carId="+carId
    return this.httpClient.get<ListResponseModel<ImagePath>>(newPath)
  }



}
