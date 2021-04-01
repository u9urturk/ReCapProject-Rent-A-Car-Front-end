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

  getCarImagesByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath = `${this.apiUrl}carimages/getimagebycarid?carid=${carId}`;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  getFileById(id:number):Observable<string>{
    return this.httpClient.get<string>(
     `${this.apiUrl}carimages/getfilebyid?id=${id}`
    );
  }

  getCarImageUrl(id:number):string{
    return `${this.apiUrl}carimages/getfilebyid?id=${id}`;
  }
}
