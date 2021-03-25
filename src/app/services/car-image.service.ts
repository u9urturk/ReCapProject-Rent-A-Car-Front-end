import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetail } from '../models/carDetail';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {
  apiUrl = "https://localhost:44378/api/";
  
  constructor(private httpClient:HttpClient) { }

  getAllCarImage():Observable<ListResponseModel<CarImage>>{
    let newPath = this.apiUrl+"carimages/getall"
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath)

  }

  getCarImagesByCarId(carId:CarDetail):Observable<ListResponseModel<CarImage>>{
    let newPath = this.apiUrl + "carimages/getimagebycarid?id="+carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
}
